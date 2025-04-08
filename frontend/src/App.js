import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import PublicationPage from './PublicationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/publications" element={<PublicationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
