import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importa los estilos
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const usuariosSimulados = [
      { correo: 'usuario@correo.com', contraseña: '123456' },
      { correo: 'usuario2@correo.com', contraseña: 'abcdef' },
    ];

    const usuarioEncontrado = usuariosSimulados.find(
      (usuario) => usuario.correo === correo && usuario.contraseña === contraseña
    );

    if (usuarioEncontrado) {
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Usuario no encontrado');
    }
  };

  const handleRegister = () => {
    navigate('/registro');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-icon">
          <input
            type="email"
            placeholder="Username"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <i className="icon fa fa-user"></i>
        </div>
        <div className="input-icon">
          <input
            type="password"
            placeholder="Password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
          <i className="icon fa fa-lock"></i>
        </div>
        <div className="login-options">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="#" onClick={handleRegister}>Register</a>
      </p>
    </div>
  );
};

export default Login;




