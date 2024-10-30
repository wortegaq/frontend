import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [Correo_Electronico, setCorreo_Electronico] = useState('');
    const [password, setPassword] = useState('');
    const [nombre, setNombre] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [rol, setRol] = useState('U'); // Estado para el rol con valor predeterminado "U"
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioActivo = localStorage.getItem('usuario');
        if (usuarioActivo) {
            navigate('/menu', { replace: true });
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                Correo_Electronico: Correo_Electronico,
                password: password
            });

            if (response.data.mensaje === 'Login exitoso') {
                localStorage.setItem('usuario', response.data.usuario.ID_Usuario);
                localStorage.setItem('rol', response.data.usuario.rol_usuario); // Guardar rol en localStorage
                setMensaje(`Bienvenido, ${response.data.usuario.ID_Usuario}`);
                navigate('/menu', { replace: true });
            } else {
                setMensaje('Credenciales incorrectas');
            }
        } catch (error) {
            setMensaje('Error en el inicio de sesión');
            console.error(error);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/usuarios', {
                Nombre: nombre,
                Correo_Electronico: correoElectronico,
                Contraseña: password,
                Rol: rol // Incluye el rol en la solicitud
            });

            if (response.status === 201) {
                setMensaje("Registro exitoso. Ahora puedes iniciar sesión.");
                setIsLogin(true); 
            }
        } catch (error) {
            setMensaje("Error en el registro");
            console.error(error);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMensaje('');
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <div className="login-container">
            {isLogin ? (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={Correo_Electronico}
                            onChange={(e) => setCorreo_Electronico(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Iniciar sesión</button>
                    </form>
                    <p>{mensaje}</p>
                    <p>¿No tienes una cuenta? <button onClick={toggleForm}>Regístrate</button></p>
                    <p>¿Olvidaste tu contraseña? <button onClick={handleForgotPassword}>Recupérala aquí</button></p>
                </div>
            ) : (
                <div>
                    <h2>Registro de Usuario</h2>
                    <form onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Correo Electrónico"
                            value={correoElectronico}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        {/* Campo de selección de rol */}
                        <div>
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
                            <label style={{ marginLeft: '15px' }}>
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

                        <button type="submit">Registrarse</button>
                    </form>
                    <p>{mensaje}</p>
                    <p>¿Ya tienes una cuenta? <button onClick={toggleForm}>Inicia sesión</button></p>
                </div>
            )}
        </div>
    );
};

export default Login;
