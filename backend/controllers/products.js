import fs from "fs";

import Product from "../models/product.js";

// Fetch all Products
export const getProducts = async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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

// Delete a Product
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }

    await Product.findByIdAndRemove(product._id);

    fs.unlink(product.image, (err) => {
      console.log(err);
    });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Create a Product
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      name: "Sample name",
      price: 0,
      user: req.user._id,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// Update a Product
export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    price,
    brand,
    category,
    countInStock,
    numReviews,
    description,
  } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }

    if (req.file) {
      fs.unlink(product.image, (err) => {
        console.log(err);
      });
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.image = req.file.path.replace(/\\/g, "/") || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;
    product.numReviews = numReviews || product.numReviews;
    product.description = description || product.description;

    const updateProduct = await product.save();

    res
      .status(201)
      .json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    next(error);
  }
};

export const createProductReview = async (req, res, next) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      const error = new Error("Could not find product");
      error.statusCode = 404;
      throw error;
    }

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      const error = new Error("Product already reviewed");
      error.statusCode = 400;
      throw error;
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    next(error);
  }
};

// Get top rated products
export const getTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ rating: "-1" }).limit(3);

    res.json(products);
  } catch (error) {
    next(error);
  }
};
