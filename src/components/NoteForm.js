import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useDispatch } from 'react-redux';
import { addNote } from '../actions/noteActions';
import { IoMdDoneAll } from 'react-icons/io';

const predefinedColors = ['#ffff', '#F8BBD0', '#C8E6C9', '#FFF9C4', '#ffcc99', '#B3E5FC'];

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      id: Date.now(),
      title,
      body,
      color: selectedColor,
    };
    dispatch(addNote(newNote));
    setTitle('');
    setBody('');
    setSelectedColor(predefinedColors[0]);
  };
  const modules = {
    toolbar: ['bold', 'italic', 'underline']
  };
  return (
    <div className="max-w-screen-md mx-auto p-5 bg-white shadow-md rounded-md">
      <h2 className="text-4xl font-bold mb-5">Add Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <ReactQuill
          value={body}
          onChange={setBody}
          modules={modules}
          placeholder="Enter your note"
          className="w-full h-30 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="flex space-x-2 my-5">
          <strong>Select Note Colour</strong>
          {predefinedColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none relative"
              style={{ backgroundColor: color, cursor: 'pointer' }}
            >
              {selectedColor === color && (
                <span
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  role="img"
                  aria-label="Selected"
                >
                  <IoMdDoneAll color="black" />
                </span>
              )}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
