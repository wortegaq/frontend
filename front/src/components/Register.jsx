import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('U'); // Estado para el rol con valor predeterminado "U"
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios', {
                Nombre: nombre,
                Correo_Electronico: correoElectronico,
                Contraseña: password,
                rol_usuario: rol // Aquí asegúrate de que el nombre coincida
            });
    
            if (response.status === 201) {
                setMensaje("Registro exitoso");
                navigate('/');
            }
        } catch (error) {
            setMensaje("Error en el registro");
            console.error(error);
        }
    };
    
    

    return (
        <div className="register-container">
            <div className="register-form">
                <h2 className="register-title">Registro de Usuarios</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="email"
                        placeholder="Correo Electrónico"
                        value={correoElectronico}
                        onChange={(e) => setCorreoElectronico(e.target.value)}
                        required
                        className="register-input"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="register-input"
                    />

                    {/* Campo de selección de rol con radio buttons */}
                    <div className="register-role">
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="U"
                                checked={rol === 'U'}
                                onChange={() => setRol('U')}
                            />
                            Usuario
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="rol"
                                value="C"
                                checked={rol === 'C'}
                                onChange={() => setRol('C')}
                            />
                            Perfil de Cafetería
                        </label>
                    </div>

                    <button type="submit" className="register-button">Registrarse</button>
                </form>
                <p className="register-message">{mensaje}</p>
            </div>
        </div>
    );
};

export default Register;
