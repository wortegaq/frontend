import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const rol = localStorage.getItem('rol');

    // Solo permite el acceso si el rol es "C" (Perfil de Cafetería)
    if (rol !== 'C') {
        return <Navigate to="/not-authorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
