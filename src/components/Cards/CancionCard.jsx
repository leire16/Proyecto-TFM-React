import React from 'react';
import './CancionCard.css';

const CancionCard = ({ titulo, interpretes, duracion, url }) => {
    const handleClick = () => {
        window.open(url, '_blank'); // Abre la URL en una nueva pestaña
    };

    return (
        <div className="cancion-card mb-5">
            <div className="cancion-card-content">
                <h2 className='pointer mb-4' onClick={handleClick}>{titulo}</h2>
                <p className="mb-3"><strong>Interpretes:</strong> {interpretes}</p>
                <p className="mb-1"><strong>Duración:</strong> {duracion}</p>
            </div>
        </div>
    );
};

export default CancionCard;
