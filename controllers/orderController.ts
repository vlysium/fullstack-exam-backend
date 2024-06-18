import Order, { IOrder } from "../models/order";

const createOrder = async (req, res) => {
  const { items, total } = req.body;

  const order: IOrder = new Order({
    user_id: req.user._id,
    items,
    total,
  });

  try {
    await order.save();
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export default { createOrder };