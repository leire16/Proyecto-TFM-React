import React from 'react';
import './Equipo-card.css';

const EquipoCard = ({ titulo, persona }) => {
    return (
        <div className="equipo-card mb-4 p-4">
            <h3 className='mb-4 equipo-card-titulo'><strong>{titulo}</strong></h3>
            <p>{persona}</p>
        </div>
    );
};

export default EquipoCard;
