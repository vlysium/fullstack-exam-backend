import Order, { IOrder } from "../models/order";

interface Pagination {
  page: number;
  limit: number;
}

const createOrder = async (req, res) => {
  const { items, total, items_count } = req.body;

  const order: IOrder = new Order({
    user_id: req.user._id,
    items,
    total,
    items_count,
  });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

const getOrders = async (req, res) => {
  const byUserId = { user_id: req.user._id };

  // pagination
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // previous
  let previous: Pagination | undefined;
  if (startIndex > 0) {
    previous = {
      page: page - 1,
      limit: limit,
    };
  }

  // next
  let next: Pagination | undefined;
  if (endIndex < (await Order.find(byUserId).countDocuments().exec())) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  try {
    const orders: IOrder[] = await Order.find(byUserId).sort({ created_at: -1 }).limit(limit).skip(startIndex).exec(); // orders for the current page
    
    const totalItems = await Order.countDocuments(byUserId).exec(); // total number of items in the collection
    const totalPages = Math.ceil(totalItems / limit);

    const response = {
      count: orders.length,
      totalCount: totalItems,
      items: [...orders],
      previous: previous,
      next: next,
      page: page,
      totalPages: totalPages,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

export default { createOrder, getOrders };