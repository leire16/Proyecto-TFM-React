import React from 'react';
import CancionCard from '../../components/Cards/CancionCard';
import obras from '../../mocks/obras.json';

const Canciones = ({ parametros }) => {
  const { nombreProduccion } = parametros;

  // Obtén la información de la obra de acuerdo a la producción
  const obra = obras[nombreProduccion];

  // Comprobar si se encontró la obra o el elenco especificado
  if (!obra || !obra.canciones) {
    return (
      <div className='container'>
        <p>No se encontraron canciones para la producción {nombreProduccion}.</p>
      </div>
    );
  }

  const cancionesProduccion = obra.canciones;

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Canciones - {nombreProduccion}</h1>
      <div className="canciones-grid">
        {cancionesProduccion.map((cancion) => (
          <CancionCard
            titulo={cancion.titulo}
            interpretes={cancion.cantante}
            duracion={cancion.duracion}
            url={cancion.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Canciones;
