import React, { useState, useEffect } from "react";

const NoteModal = ({ closeModal, saveNote, note }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Điền dữ liệu nếu edit note
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    saveNote(title, description); // gọi saveNote từ Home.jsx
    closeModal(); // đóng modal sau khi submit
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {note ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 border rounded"
              onClick={() => {
                closeModal();
                setTitle("");
                setDescription("");
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {note ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
