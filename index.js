require("dotenv").config();
const express = require("express");
const app = express();
const Note = require("./models/note"); // Your Mongoose model

// Middleware
app.use(express.json());
app.use(express.static("dist"));

// Logger (optional but helpful)
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!</h1>");
});

// ✅ Get all notes from MongoDB
app.get("/api/notes", async (req, res) => {
  const notes = await Note.find({});
  res.json(
    notes.map((note) => ({
      id: note._id,
      content: note.content,
      important: note.important,
    }))
  );
});

// ✅ Get one note by MongoDB ID
app.get("/api/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note) {
      res.json({
        id: savedNote._id,
        content: savedNote.content,
        important: savedNote.important,
      });
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(400).json({ error: "malformatted id" });
  }
});

// ✅ Create a new note in MongoDB
app.post("/api/notes", async (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  const savedNote = await note.save();
  res.json(savedNote);
});

// ✅ Delete a note by MongoDB ID
app.delete("/api/notes/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: "malformatted id" });
  }
});

// Unknown endpoint middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
