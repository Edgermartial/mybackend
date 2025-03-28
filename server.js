const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const itemRoutes = require('./routes/items');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 1000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1); // Exit the process if no MongoDB URI is found
}

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Default Route to Prevent "Cannot GET /" Error
app.get("/", (req, res) => {
    res.send("✅ Welcome to the API! Server is running. 🚀");
});

// ✅ API Routes
app.use('/api/items', itemRoutes);

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if DB connection fails
  });

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
