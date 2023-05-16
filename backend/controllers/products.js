import Product from "../models/product.js";

// Fetch all Products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// Fetch a Product
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }

    res.json(product);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
      error.message = "Could not find product";
    }
    next(error);
  }
};
