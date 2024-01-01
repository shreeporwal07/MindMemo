import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote } from "../actions/noteActions";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const NoteList = () => {
  const notes = useSelector((state) => state.notes.notes);
  const dispatch = useDispatch();
  const [editNoteId, setEditNoteId] = useState(null);

  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      dispatch(deleteNote(noteId));
      if (noteId === editNoteId) {
        setEditNoteId(null);
      }
    }
  };

  const renderNoteBody = (body) => {
    const formattedBody = body
      .replace(/\[b\]/g, "<strong>")
      .replace(/\[\/b\]/g, "</strong>")
      .replace(/\[i\]/g, "<em>")
      .replace(/\[\/i\]/g, "</em>")
      .replace(/\[u\]/g, "<u>")
      .replace(/\[\/u\]/g, "</u>");

    return { __html: formattedBody };
  };

  return (
    <div className="max-w-screen-l mx-auto p-5 flex flex-col my-3 items-center">
      <h2 className="text-4xl font-bold mb-5">Your Notes</h2>
      <ul className="flex flex-wrap">
        {notes.map((note) => (
          <li
            key={note.id}
            className={`border border-gray-300 mx-4 p-5 rounded-md shadow-md mb-4`}
            style={{
              backgroundColor: note.color || "#ffffff",
              maxWidth: "300px",
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <strong className="text-2xl">{note.title}</strong>
              <RxCross2
                onClick={() => handleDelete(note.id)}
                className="cursor-pointer text-black-700"
              />
            </div>
            <div
              className="max-h-30 overflow-y-auto text-gray-600 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
              style={{
                maxHeight: "100px",
                scrollbarWidth: "thin",
                scrollbarArrowColor: "transparent",
              }}
              dangerouslySetInnerHTML={renderNoteBody(note.body)}
            />
            <div className="mt-3">
              <Link to={`/${note.id}`}>
                <button
                  className="w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none"
                >
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NoteList;
