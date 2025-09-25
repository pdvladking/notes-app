import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import Navbar from '../components/Navbar';
import NoteForm from '../components/NoteForm.jsx';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('/notes');
      setNotes(res.data);
    } catch {
      setError('Failed to fetch notes');
    }
  };

  const handleCreateNote = async (note) => {
    try {
      const res = await axios.post('/notes', note);
      setNotes((prev) => [...prev, res.data]);
    } catch {
      setError('Failed to create note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch {
      setError('Failed to delete note');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-2xl mx-auto p-4">
        <NoteForm onSubmit={handleCreateNote} />
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold">{note.title}</h3>
              <p className="text-gray-700">{note.content}</p>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="mt-2 text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
