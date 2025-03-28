const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Ensure 'Item' matches the actual filename

// Add Item
router.post("/", async (req, res) => {
  try {
    const { name, price, image, description } = req.body;

    // Validate request body
    if (!name || !price || !image || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newItem = new Item({ name, price, image, description });
    const savedItem = await newItem.save();
    res.status(201).json({ message: "Item added successfully", item: savedItem });
  } catch (err) {
    console.error("Error adding item:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get All Items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Single Item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(item);
  } catch (err) {
    console.error("Error fetching item:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update Item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (err) {
    console.error("Error updating item:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete Item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error("Error deleting item:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
