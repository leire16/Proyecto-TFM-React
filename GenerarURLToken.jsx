import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // React Router para navegación

const GenerarURLToken = () => {
    const history = useHistory();

    useEffect(() => {
        const JWT_SECRET = process.env.JWT_SECRET; // Debes definir esta variable de entorno

        // Crea el token con jwt.sign()
        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // expiresIn es opcional

        // Genera la URL con el token como parámetro de consulta
        const url = `http://localhost:5173/?token=${token}`;

        // Redirige al usuario a la URL generada
        history.push(url);
    }, [history]);

    return (
        <div>   
            Redirigiendo...
        </div>
    );
};

export default GenerarURLToken;
