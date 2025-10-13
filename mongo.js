// const mongoose = require("mongoose");

// // Your full connection string (replace password if needed)
// const url =
//   "mongodb+srv://laura:6lGSibBw7MkRoXuT@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority";

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(url)
//   .then(() => {
//     console.log("✅ Connected to MongoDB successfully!");
//     return mongoose.connection.db.listCollections().toArray(); // list collections
//   })
//   .then((collections) => {
//     console.log(
//       "Collections in database:",
//       collections.map((c) => c.name)
//     );
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//   });
const mongoose = require("mongoose");

const url =
  "mongodb+srv://laura:6lGSibBw7MkRoXuT@cluster0.3y7serw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => {
    console.log("✅ Connected to MongoDB!");
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((cols) => {
    console.log(
      "Collections:",
      cols.map((c) => c.name)
    );
    return mongoose.connection.close();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
