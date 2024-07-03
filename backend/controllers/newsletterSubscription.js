import mongoose from "mongoose";
import Product from "../models/productModel.js"; // Import your Product model
import User from "../models/userModel.js"; // Import your User model
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// *2. User Retrieval*
const fetchUsers = async () => {
  try {
    return await User.find({ newsletterSubscribed: true });
  } catch (err) {
    console.error("Error fetching subscribed users:", err);
  }
};

// *3. Product Information*
const fetchProducts = async () => {
  try {
    return await Product.find({});
  } catch (err) {
    console.error("Error fetching products:", err);
  }
};

const generateEmailContent = (user, products) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Exciting News Products</title>
        </head>
        <body>
            <h2>Hello ${user.name},</h2>
            <p>Check out these great products:</p>
            <ul>
                ${products
                  .map(
                    (product) => `
                    <li>
                        <strong>${product.name}</strong> - ${product.description}
                        <br>
                        Price: ${product.price}
                        <br>
                        <img src="${product.image}" alt="${product.name}" width="150">
                    </li>
                `
                  )
                  .join("")}
            </ul>
        </body>
        </html>
    `;
};

const sendNewsletters = async () => {
  const users = await fetchUsers();
  const products = await fetchProducts();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  users.forEach((user) => {
    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: user.email,
      subject: "Discover the Latest Products!",
      html: generateEmailContent(user, products),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  });
};

const sendNewsletterToUser = async (req, res) => {
  try {
    console.log(req.body);
    const userEmail = req.body.user_email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const products = await fetchProducts();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USERNAME,
      to: userEmail,
      subject: "Discover the Latest Products!",
      html: generateEmailContent(user, products),
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent:", info.response);
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

export { sendNewsletters, sendNewsletterToUser };
