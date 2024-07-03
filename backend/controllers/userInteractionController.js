// controllers/userInteractionController.js

import UserInteraction from "../models/userInteractionModel.js";

// Controller function to update user interactions
export const updateUserInteractions = async (req, res) => {
  console.log("in the udpdate user interactions", req.body, req.user);
  const { productId } = req.body;
  const userId = req.user._id; // Extract user ID from the token payload

  try {
    let userInteraction = await UserInteraction.findOne({ userId });

    if (!userInteraction) {
      userInteraction = new UserInteraction({
        userId,
        interactions: [],
      });
      console.log("in here");
      userInteraction.interactions.push(productId);
    } else {
      userInteraction.interactions.push(productId);
    }

    await userInteraction.save();
    res.status(200).json({ message: "User interactions updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user interactions",
      error: error.message,
    });
  }
};

export const updateUserSearch = async (req, res) => {
  console.log("in the update user Search", req.body, req.user);
  const { searchProduct } = req.body;
  const userId = req.user._id; // Extract user ID from the token payload

  try {
    let userInteraction = await UserInteraction.findOne({ userId });

    if (!userInteraction) {
      userInteraction = new UserInteraction({
        userId,
        interactions: [],
        searches: [],
      });
      console.log("in here");
      userInteraction.searches.push(searchProduct);
    } else {
      userInteraction.searchess.push(searchProduct);
    }

    await userInteraction.save();
    res.status(200).json({ message: "User interactions updated successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user interactions",
      error: error.message,
    });
  }
};
