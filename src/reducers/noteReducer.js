const initialState = {
  notes: JSON.parse(localStorage.getItem('notes')) || [],
};
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const addedNote = action.payload;
      const updatedAddNotes = [...state.notes, addedNote];
      localStorage.setItem('notes', JSON.stringify(updatedAddNotes));
      return {
        ...state,
        notes: updatedAddNotes,
      };

    case 'EDIT_NOTE':
      const editedNote = action.payload;
      const updatedEditNotes = state.notes.map((note) =>
        note.id === editedNote.id ? editedNote : note
      );
      localStorage.setItem('notes', JSON.stringify(updatedEditNotes));
      return {
        ...state,
        notes: updatedEditNotes,
      };

    case 'DELETE_NOTE':
      const filteredNotes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem('notes', JSON.stringify(filteredNotes));
      return {
        ...state,
        notes: filteredNotes,
      };
      case 'SET_SELECTED_NOTE':
      return {
        ...state,
        selectedNoteId: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
