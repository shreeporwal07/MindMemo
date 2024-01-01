export const addNote = (note) => ({
    type: 'ADD_NOTE',
    payload: note,
  });
  
  export const editNote = (note) => ({
    type: 'EDIT_NOTE',
    payload: note,
  });
  
  export const deleteNote = (noteId) => ({
    type: 'DELETE_NOTE',
    payload: noteId,
  });
  export const selectNote = (noteId) => ({
    type: 'SET_SELECTED_NOTE',
    payload: noteId,
  });