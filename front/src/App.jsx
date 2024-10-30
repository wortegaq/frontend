import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'; // Importa el componente de login
import Menu from './components/menu';
import Cafeteria from './components/Cafeteria';
import FeedbackForm from './components/FeedbackForm';
import Register from './components/Register';
import Elementos from './components/Elementos';
import ForgotPassword from './components/ForgotPassword';
import ProtectedRoute from "./components/ProtectedRoute";







function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/feedback" element={<FeedbackForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/cafeterias" element={<Cafeteria />} />
        
      

        <Route
                    path="/elementos"
                    element={
                        <ProtectedRoute>
                            <Elementos />
                        </ProtectedRoute>
                    }/>
      </Routes>
    </Router>
  );
}

export default App;
