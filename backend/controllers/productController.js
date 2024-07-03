import Product from "../models/productModel.js";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";

import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createProduct = async (req, res) => {
  try {
    let imageURL = "";
    if (req.file) {
      const uploadResult = await cloudinary.v2.uploader.upload(req.file.path);
      imageURL = uploadResult.secure_url;
    }

    const newProduct = new Product({
      ...req.body,
      image: imageURL,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating product" });
  }
};

export const getProductsCustomer = async (req, res) => {
  let filterKeyword = [{}];

  if (req.query.minPriceQuery && req.query.minPriceQuery !== "null") {
    filterKeyword.push({
      price: { $gt: parseInt(req.query.minPriceQuery) },
    });
  }
  if (req.query.maxPriceQuery && req.query.maxPriceQuery !== "null") {
    filterKeyword.push({
      price: { $lt: parseInt(req.query.maxPriceQuery) },
    });
  }

  const keyword =
    req.query.search && req.query.search !== "null"
      ? [
          {
            name: {
              $regex: req.query.search,
              $options: "i",
            },
          },
          {
            description: {
              $regex: req.query.search,
              $options: "i",
            },
          },
        ]
      : [{}];

  const categoryFilter =
    req.query.categories && req.query.categories !== "null"
      ? { category: { $in: req.query.categories.split(",") } }
      : {};

  const sortOptions = {
    bestmatch: {}, // Default sort option
    ascprice: { price: 1 }, // Sort by price low to high
    descprice: { price: -1 }, // Sort by price high to low
    rating: { rating: -1 }, // Sort by customer rating
  };

  const sortOption = sortOptions[req.query.sortBy] || {}; // Get the sort option based on the requested sortBy parameter

  try {
    const products = await Product.find({
      $and: [{ $or: keyword }, { $and: filterKeyword }, categoryFilter],
    }).sort(sortOption);

    res.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    console.log("in product", req.params);
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    for (const field in req.body) {
      product[field] = req.body[field];
    }

    if (req.file) {
      const uploadResult = await cloudinary.v2.uploader.upload(req.file.path);
      product.image = uploadResult.secure_url;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating product" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching products" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.image) {
      const public_id = product.image.split("/").pop().split(".")[0]; // Extract public_id
      await cloudinary.v2.uploader.destroy(public_id);
    }
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting product" });
  }
};
export const getProductsByProductNos = async (req, res) => {
  try {
    console.log("inhere");
    console.log(req.body);
    const productNos = req.body.results;
    console.log(productNos);
    const products = await Product.find({ productno: { $in: productNos } })
      .populate("category")
      .exec();
    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
