import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userInteractionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  interactions: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const UserInteraction = model("UserInteraction", userInteractionSchema);

export default UserInteraction;
