import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
    const [idUsuario, setIdUsuario] = useState('');
    const [idElemento, setIdElemento] = useState('');
    const [calificacion, setCalificacion] = useState('');
    const [comentario, setComentario] = useState('');
    const [fecha, setFecha] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/feedback', {
                ID_Usuario: parseInt(idUsuario),
                ID_Elemento: parseInt(idElemento),
                Calificacion: parseInt(calificacion),
                Comentario: comentario,
                Fecha: fecha
            });

            if (response.status === 201) {
                setMensaje("Feedback creado exitosamente");
                // Limpia los campos del formulario después de crear el feedback
                setIdUsuario('');
                setIdElemento('');
                setCalificacion('');
                setComentario('');
                setFecha('');
            }
        } catch (error) {
            setMensaje("Error al crear el feedback");
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Crear Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Usuario:</label>
                    <input
                        type="number"
                        value={idUsuario}
                        onChange={(e) => setIdUsuario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ID Elemento:</label>
                    <input
                        type="number"
                        value={idElemento}
                        onChange={(e) => setIdElemento(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Calificación:</label>
                    <input
                        type="number"
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label>Comentario:</label>
                    <input
                        type="text"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Fecha:</label>
                    <input
                        type="datetime-local"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Enviar Feedback</button>
            </form>
            <p>{mensaje}</p>
        </div>
    );
};

export default FeedbackForm;
