import React from 'react';
import './CancionCard.css';

const CancionCard = ({ titulo, interpretes, duracion, url, detalle }) => {
    const handleClick = () => {
        window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    };

    // Filtrar los tipos que no son null y unirlos en una cadena
    const tipos = detalle
        .filter(detalle => detalle.tipo)
        .map(detalle => detalle.tipo)
        .join(', ');

    // Construir la cadena de interpretes
    const interpretesStr = detalle
        .map(detalle => detalle.personaje_id ? detalle.personaje_id.nombre : null)
        .filter(nombre => nombre)
        .join(', ');

    // Construir la cadena final que incluye intérpretes y tipos
    const detalleTexto = [interpretesStr, tipos].filter(Boolean).join(', ');

    return (
        <div className="cancion-card mb-5">
            <div className="cancion-card-content">
                <h2 className='pointer mb-4' onClick={handleClick}>{titulo}</h2>
                {detalleTexto && (
                    <p className="mb-3">
                        <strong>Intérpretes:</strong> {detalleTexto}
                    </p>
                )}
                <p className="mb-1"><strong>Duración:</strong> {duracion}</p>
            </div>
        </div>
    );
};

export default CancionCard;
