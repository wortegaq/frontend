import React, { useState } from 'react';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (usuario.contraseña === usuario.confirmarContraseña) {
      console.log('Usuario registrado:', usuario);
      // Aquí agregarías la lógica para enviar los datos al backend
    } else {
      console.log('Las contraseñas no coinciden');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={usuario.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={usuario.correo}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        value={usuario.contraseña}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="confirmarContraseña"
        placeholder="Confirmar Contraseña"
        value={usuario.confirmarContraseña}
        onChange={handleChange}
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default Registro;
