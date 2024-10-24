

import React, { useState } from 'react';

function Feedback() {
  // Definir estados para manejar la información del feedback
  const [nombre, setNombre] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState(5);

  // Función para manejar el envío del feedback
  const enviarFeedback = (e) => {
    e.preventDefault();
    // Aquí puedes hacer una petición a un API o manejar el feedback como prefieras
    console.log('Nombre:', nombre);
    console.log('Comentario:', comentario);
    console.log('Calificación:', calificacion);
  };

  return (
    <div>
      <h2>Deja tu Feedback</h2>
      <form onSubmit={enviarFeedback}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input 
            type="text" 
            id="nombre" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="comentario">Comentario:</label>
          <textarea
            id="comentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="calificacion">Calificación:</label>
          <input
            type="number"
            id="calificacion"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit">Enviar Feedback</button>
      </form>
    </div>
  );
}

export default Feedback;
