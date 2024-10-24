import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot
import App from './App';
import './index.css';

const rootElement = document.getElementById('root'); // Selecciona el div con id 'root'
const root = createRoot(rootElement); // Crea la raíz

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

