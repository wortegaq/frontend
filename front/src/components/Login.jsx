import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [Correo_Electronico, setCorreo_Electronico] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                Correo_Electronico: Correo_Electronico,
                password: password
            });

            if (response.data.mensaje === 'Login exitoso') {
                setMensaje(`Bienvenido, ${response.data.usuario.ID_Usuario}`);
            } else {
                setMensaje('Credenciales incorrectas');
            }
        } catch (error) {
            setMensaje('Error en el inicio de sesión');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={Correo_Electronico}
                    onChange={(e) => setCorreo_Electronico(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>{mensaje}</p>
        </div>
    );
};

export default Login;
