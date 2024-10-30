import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cafeteria.css';

const Cafeteria = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [resultado, setResultado] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                setMensaje('Error al obtener usuarios');
                console.error(error);
            }
        };
        fetchUsuarios();
    }, []);

    const handleSearchUsuario = () => {
        if (nombreUsuario.trim() === '') {
            setMensaje('Por favor, ingresa un nombre para buscar.');
            setResultado([]);
            return;
        }

        const resultadosFiltrados = usuarios
            .filter((usuario) => usuario.rol_usuario === 'C') // Filtrar solo usuarios con rol 'C'
            .filter((usuario) =>
                usuario.Nombre.toLowerCase().includes(nombreUsuario.toLowerCase())
            );

        if (resultadosFiltrados.length > 0) {
            setResultado(resultadosFiltrados);
            setMensaje('');
        } else {
            setMensaje('No se encontraron usuarios con ese nombre');
            setResultado([]);
        }
    };

    const handleFeedback = (cafeteriaId) => {
        navigate(`/feedback/${cafeteriaId}`);
    };

    const handleReturnToMenu = () => {
        navigate('/menu');
    };

    return (
        <div className="cafeteria-container">
            <h2 className="cafeteria-title">Gestión de Cafetería</h2>
            
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar usuario por nombre"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearchUsuario} className="search-button">
                    Buscar cafetería
                </button>
                <button onClick={handleReturnToMenu} className="back-button">
                    Regresar al Menú
                </button>
            </div>

            {mensaje && <p className="message">{mensaje}</p>}

            {resultado.length > 0 && (
                <div className="results-container">
                    <h3 className="results-title">Resultados de la Búsqueda:</h3>
                    <ul className="results-list">
                        {resultado.map((usuario) => (
                            <li key={usuario.ID_Usuario} className="result-item">
                                <div>
                                    <strong>Nombre:</strong> {usuario.Nombre}
                                </div>
                                <button onClick={() => handleFeedback(usuario.ID_Usuario)} className="feedback-button">
                                    Dar Feedback
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Cafeteria;
