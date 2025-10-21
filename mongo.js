// mongo.js
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

// Connect using Mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define the schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// Export the model
module.exports = mongoose.model("Note", noteSchema, "demo");
