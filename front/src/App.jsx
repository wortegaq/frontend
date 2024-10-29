import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Importa el componente de login


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        
       
      
      </Routes>
    </Router>
  );
}

export default App;