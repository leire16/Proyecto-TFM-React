// MusicalEnProduccion.jsx
import React from 'react';

const MusicalEnProduccion = ({ imagen }) => {
  // Extraer el nombre de la imagen sin la extensión
  const nombreImagen = imagen.split('/').pop().split('.').slice(0, -1).join('.');

  return (
    <div id="musical-en-produccion">
      <div className="container-fluid">
        <h2 className="text-center mb-4">MUSICAL EN PRODUCCIÓN</h2>
        <div className="text-center">
          <img src={imagen} alt={nombreImagen} className="img-fluid" style={{ maxWidth: 'calc(100% - 40px)' }} />
        </div>
      </div>
    </div>
  );
};

export default MusicalEnProduccion;
