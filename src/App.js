import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoteList from './components/NoteList';
import NoteView from './components/NoteView';
import NoteForm from './components/NoteForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<><NoteForm/><NoteList /></>} />
        <Route path="/:id" element={<NoteView />} />
      </Routes>
    </Router>
  );
};

export default App;
