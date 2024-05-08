import Product, { IProduct } from "../models/product";

interface Response {
  count: number;
  data: IProduct[];
}

const getProducts = async (req, res) => {
  try {
    const products: IProduct[] = await Product.find();

    const response: Response = {
      count: products.length,
      data: [...products],
    };
    res.status(200).json(response);

  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

const getProductBySlug = async (req, res) => {
  try {
    const product: IProduct | null = await Product.findOne({ slug: req.params.slug });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: "Unexpected server error" });
  }
}

export default { getProducts, getProductBySlug };