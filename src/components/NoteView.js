import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import NoteEdit from "./NoteEdit";
import { IoIosArrowBack } from "react-icons/io";

const NoteView = () => {
  const location = useLocation();
  const [editNoteId, setEditNoteId] = useState(null);
  const id = location.pathname.split("/").pop();
  const note = useSelector((state) =>
    state.notes.notes.find((note) => note.id === parseInt(id, 10))
  );

  if (!note) {
    return <div className="text-red-500">Note not found</div>;
  }

  const handleEdit = (noteId) => {
    setEditNoteId(noteId);
  };

  const handleEditCancel = () => {
    setEditNoteId(null);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-screen-md mx-auto p-5 bg-white shadow-md rounded-md">
      <IoIosArrowBack className="text-4xl mb-5" onClick={handleGoBack} />
      <div className="mb-4 flex">
        <h2 className="text-4xl font-bold mb-2 text-blue-900 mx-4">Title: </h2>
        <h4 className="text-4xl font-bold">{note.title}</h4>
      </div>
      <div className="mb-5">
        <h2 className="text-4xl font-bold mb-2 text-blue-900 mx-4">Body:</h2>
        <div
          className="text-xl mx-4"
          contentEditable="true"
          dangerouslySetInnerHTML={{ __html: note.body }}
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => handleEdit(note.id)}
          className="bg-blue-500 mx-4 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Edit
        </button>
      </div>
      {editNoteId === note.id && (
        <NoteEdit note={note} onEditCancel={handleEditCancel} />
      )}
    </div>
  );
};

export default NoteView;
