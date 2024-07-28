import React from 'react';
import './EquipoCard.css';

const EquipoCard = ({ titulo, personas }) => {
  // Construir una cadena con los nombres y apellidos, solo mostrando apellido 2 si existe
  const personasTexto = personas && personas.length > 0
    ? personas.map(persona => {
        const { nombre, apellido1, apellido2 } = persona;
        return apellido2 ? `${nombre} ${apellido1} ${apellido2}` : `${nombre} ${apellido1}`;
      }).join(', ')
    : 'No hay personas para este puesto.';

  return (
    <div className="equipo-card mb-4 p-4">
      <h2 className='mb-4 equipo-card-titulo'><strong>{titulo}</strong></h2>
      <p className="equipo-card-personas">{personasTexto}</p>
    </div>
  );
};

export default EquipoCard;