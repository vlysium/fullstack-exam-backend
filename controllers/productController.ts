import Product, { IProduct } from "../models/product";

interface Response {
  count: number;
  totalCount: number;
  items: IProduct[];
  previous?: Pagination;
  next?: Pagination;
  page: number;
  totalPages: number;
}

interface Pagination {
  page: number;
  limit: number;
}

const getProducts = async (req, res) => {
  // pagination
  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 12;

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
  if (endIndex < (await Product.countDocuments().exec())) {
    next = {
      page: page + 1,
      limit: limit,
    };
  }

  // filters
  const query = {};
  if (req.query.cuisine) {
    query["category.cuisine"] = req.query.cuisine;
  }
  if (req.query.menu) {
    query["category.menu"] = req.query.menu;
  }

  try {
    const totalItems = await Product.countDocuments(query).exec(); // total number of items in the collection
    const products: IProduct[] = await Product.find(query).limit(limit).skip(startIndex).exec(); // products for the current page

    const totalPages = Math.ceil(totalItems / limit);

    const response: Response = {
      count: products.length,
      totalCount: totalItems,
      items: [...products],
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

const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const product: IProduct | null = await Product.findOne({ slug: slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

export default { getProducts, getProductBySlug };