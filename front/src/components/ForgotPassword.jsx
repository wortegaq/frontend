import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [Correo_Electronico, setCorreo_Electronico] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Maneja el envío del formulario para actualizar la contraseña
    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            // Asegúrate de que el endpoint en el backend esté configurado para manejar solo el correo electrónico
            const response = await axios.patch(`http://localhost:3000/api/usuarios/reset-password`, {
                Correo_Electronico: Correo_Electronico,
                Contraseña: newPassword
            });

            if (response.status === 200) {
                setMensaje("Contraseña actualizada exitosamente");
                setCorreo_Electronico('');
                setNewPassword('');
            } else {
                setMensaje("Error al actualizar la contraseña");
            }
        } catch (error) {
            setMensaje("Error al actualizar la contraseña");
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <h2>Recuperar Contraseña</h2>
            <form onSubmit={handlePasswordReset}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={Correo_Electronico}
                    onChange={(e) => setCorreo_Electronico(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Restablecer Contraseña</button>
            </form>
            <p>{mensaje}</p>
        </div>
    );
};

export default ForgotPassword;


