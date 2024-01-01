import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editNote } from "../actions/noteActions";

const NoteEdit = ({ note, onEditCancel, onUpdateImage }) => {
  const dispatch = useDispatch();
  const [editedNote, setEditedNote] = useState({ ...note });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setEditedNote((prevNote) => ({
      ...prevNote,
      body: value,
    }));
  };

  const handleSave = () => {
    dispatch(editNote(editedNote));
    setEditedNote({ ...note });
    onEditCancel();
  };
  const modules = {
    toolbar: ['bold', 'italic', 'underline']
  };
  return (
    <div className="max-w-screen-md mx-auto p-5">
      <h3 className="text-2xl font-bold mb-4">Edit Note</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={editedNote.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Body:</label>
          <ReactQuill
            value={editedNote.body}
            onChange={handleQuillChange}
            modules={modules}
            className="quill-editor"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            style={{
              backgroundColor: "black",
            }}
            onClick={handleSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onEditCancel}
            style={{ backgroundColor: "black" }}
            className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteEdit;
