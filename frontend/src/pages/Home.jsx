import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import NoteModal from "../components/NoteModel";

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null); // note để edit
  const [query, setQuery] = useState(""); // tìm kiếm

  // Fetch notes từ backend
  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setNotes(data.notes);
      }
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter notes theo query
  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [query, notes]);

  // Thêm hoặc sửa note
  const saveNote = async (title, description) => {
    try {
      const token = localStorage.getItem("token");

      if (currentNote) {
        // Edit note
        const { data } = await axios.put(
          `http://localhost:5000/api/note/${currentNote._id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (data.success) {
          setNotes((prevNotes) =>
            prevNotes.map((note) =>
              note._id === currentNote._id ? data.note : note
            )
          );
        }
      } else {
        // Add new note
        const { data } = await axios.post(
          "http://localhost:5000/api/note/add",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (data.success) {
          setNotes((prevNotes) => [...prevNotes, data.note]);
        }
      }

      setCurrentNote(null);
      setModalOpen(false);
    } catch (error) {
      console.log("Error saving note:", error);
    }
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/note/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  // Mở modal để edit
  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              onDelete={deleteNote}
            />
          ))
        ) : (
          <p className="text-gray-500 font-semibold">No notes found</p>
        )}
      </div>

      <button
        onClick={() => {
          setCurrentNote(null); // thêm note mới
          setModalOpen(true);
        }}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full shadow-lg hover:bg-teal-600 transition"
      >
        +
      </button>

      {isModalOpen && (
        <NoteModal
          closeModal={() => setModalOpen(false)}
          saveNote={saveNote}
          note={currentNote}
        />
      )}
    </div>
  );
};

export default Home;
