import React, { useState, useEffect } from 'react';
import InicioSesion from '../../pages/InicioSesion/InicioSesion.jsx';
import jwtDecode from 'jwt-decode'; // Para decodificar el token JWT

const AccesoLogin = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                // Aquí puedes implementar lógica adicional para verificar la validez del token
                // Por ejemplo, verificar la fecha de expiración, roles, etc.
                if (decodedToken && !tokenExpired(decodedToken.exp)) {
                    setShowLoginModal(true); // Mostrar el modal de inicio de sesión
                } else {
                    // Token inválido o expirado
                    console.error('Token inválido o expirado');
                    // Aquí puedes redirigir a una página de inicio de sesión o mostrar un mensaje de error
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
                // Manejo de errores de decodificación de token
            }
        } else {
            // No hay token en la URL
            console.log('No hay token en la URL');
            // Aquí puedes redirigir a una página de inicio de sesión o mostrar un mensaje de error
        }
    }, []);

    const handleCloseLoginModal = () => {
        setShowLoginModal(false); // Cerrar el modal de inicio de sesión
    };

    const tokenExpired = (exp) => {
        return Date.now() >= exp * 1000;
    };

    return (
        <InicioSesion show={showLoginModal} handleClose={handleCloseLoginModal} />
    );
};

export default AccesoLogin;
