import Note from "../models/Note.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find({ userId: req.user.id });
    res.json(notes);
  } catch {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
}

export async function createNote(req, res) {
  const { title, content } = req.body;
  try {
    const note = await Note.create({ title, content, userId: req.user.id });
    res.status(201).json(note);
  } catch {
    res.status(400).json({ message: "Failed to create note" });
  }
}

export async function deleteNote(req, res) {
  try {
    await Note.deleteOne({ _id: req.params.id, userId: req.user.id });
    res.json({ message: "Note deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete note" });
  }
}
