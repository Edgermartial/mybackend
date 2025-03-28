const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 }, // Ensures price is not negative
    description: { type: String, required: true, trim: true },
    image: {
      type: String,
      required: true,
      default: "https://via.placeholder.com/150", // Placeholder if image is missing
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model("items", itemSchema);
