import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css';

const Menu = () => {
    const [rol, setRol] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const usuarioActivo = localStorage.getItem('usuario');
        const rolUsuario = localStorage.getItem('rol'); // Obtener el rol desde localStorage

        if (!usuarioActivo) {
            navigate('/', { replace: true });
        } else {
            setRol(rolUsuario);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('rol'); // Remover rol también
        navigate('/', { replace: true });
    };

    const goToCafeteria = () => {
        navigate('/cafeterias');
    };

    const goToElementos = () => {
        navigate('/elementos');
    };

    return (
        <div className="menu-container">
            <header className="menu-header">
                <div className="menu-left">
                    <span className="app-title">Coffeed</span>
                    <span className="nav-link" onClick={goToCafeteria}>Cafeterías</span>
                    {rol === 'C' && (
                        <span className="nav-link" onClick={goToElementos}>Elementos</span>
                    )}
                </div>
                <nav className="menu-right">
                    <span className="nav-link" onClick={handleLogout}>Cerrar sesión</span>
                </nav>
            </header>
            <div className="menu-content">
                {/* Contenido principal aquí, si necesitas agregarlo */}
            </div>
        </div>
    );
};

export default Menu;









