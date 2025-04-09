import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import PublicationPage from './PublicationPage';
import AuthorPage from './AuthorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
        <Route path="/authors" element={<AuthorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
