import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Feedback from './Feedback';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/feedback" element={<Feedback />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);



