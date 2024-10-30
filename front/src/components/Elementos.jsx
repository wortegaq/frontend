import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Elementos = () => {
    const [categorias, setCategorias] = useState([]);
    const [elementos, setElementos] = useState([]);
    const [promociones, setPromociones] = useState([]);
    const [nuevoElemento, setNuevoElemento] = useState({ nombre: '', descripcion: '', precio: '', idCategoria: '', disponibilidad: 'Disponible' });
    
    // Función para obtener las categorías
    const fetchCategorias = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error("Error al obtener categorías:", error);
        }
    };

    // Función para obtener los elementos
    const fetchElementos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/elementos');
            setElementos(response.data);
        } catch (error) {
            console.error("Error al obtener elementos:", error);
        }
    };

    // Función para obtener las promociones
    const fetchPromociones = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/promociones');
            setPromociones(response.data);
        } catch (error) {
            console.error("Error al obtener promociones:", error);
        }
    };

    // Llama a las funciones al montar el componente
    useEffect(() => {
        fetchCategorias();
        fetchElementos();
        fetchPromociones();
    }, []);

    // Función para agregar un nuevo elemento
    const handleAddElemento = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/elementos', nuevoElemento);
            setElementos([...elementos, response.data]);
            setNuevoElemento({ nombre: '', descripcion: '', precio: '', idCategoria: '', disponibilidad: 'Disponible' });
        } catch (error) {
            console.error("Error al agregar el elemento:", error);
        }
    };

    // Función para eliminar un elemento
    const handleDeleteElemento = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/elementos/${id}`);
            setElementos(elementos.filter(el => el.ID_Elemento !== id));
        } catch (error) {
            console.error("Error al eliminar el elemento:", error);
        }
    };

    // Función para manejar el cambio en los campos de nuevo elemento
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoElemento({ ...nuevoElemento, [name]: value });
    };

    return (
        <div className="elementos-container">
            <h2>Gestión de Elementos</h2>

            <div className="section">
                <h3>Agregar Nuevo Elemento</h3>
                <form onSubmit={handleAddElemento} className="elemento-form">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={nuevoElemento.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevoElemento.descripcion}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="precio"
                        placeholder="Precio"
                        value={nuevoElemento.precio}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="idCategoria"
                        value={nuevoElemento.idCategoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una Categoría</option>
                        {categorias.map(categoria => (
                            <option key={categoria.ID_Categoria} value={categoria.ID_Categoria}>
                                {categoria.Nombre}
                            </option>
                        ))}
                    </select>
                    <select
                        name="disponibilidad"
                        value={nuevoElemento.disponibilidad}
                        onChange={handleChange}
                    >
                        <option value="Disponible">Disponible</option>
                        <option value="No disponible">No disponible</option>
                    </select>
                    <button type="submit">Agregar Elemento</button>
                </form>
            </div>

            <div className="section">
                <h3>Lista de Elementos</h3>
                <ul>
                    {elementos.map(elemento => (
                        <li key={elemento.ID_Elemento}>
                            <strong>{elemento.Nombre}</strong>: {elemento.Descripcion}, Precio: {elemento.Precio}, Disponibilidad: {elemento.Disponibilidad}
                            <button onClick={() => handleDeleteElemento(elemento.ID_Elemento)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="section">
                <h3>Promociones</h3>
                <ul>
                    {promociones.map(promocion => (
                        <li key={promocion.ID_Promocion}>
                            <strong>{promocion.Nombre}</strong>: {promocion.Descripcion}, Descuento: {promocion.Descuento}%, Vigente desde: {promocion.Fecha_Inicio} hasta: {promocion.Fecha_Fin}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Elementos;
