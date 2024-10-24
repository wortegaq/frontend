import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Importa el componente de login
import Registro from './components/Registro'; // Importa el componente de registro

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Login} />
        <Route path="/registro" Component={Registro} />
      </Routes>
    </Router>
  );
}

export default App;