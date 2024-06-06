import React from 'react';
import obras from '../../mocks/obras.json';
import './Sinopsis.css';

const Sinopsis = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const obra = obras[nombreProduccion];

  // Comprobar si se encontró la obra
  if (!obra) {
    return (
      <div className='container'>
        <p>No se encontró la obra especificada.</p>
      </div>
    );
  }

  const { sinopsis = "", img = "" } = obra;

  // Función auxiliar para verificar si un texto está entre comillas
  const isQuoted = (text) => text.startsWith('“') && text.endsWith('”');

  return (
    <div className='container'>
      {/* Título de la sinopsis */}
      <h1 className="mb-5 uppercase">Sinopsis {nombreProduccion}</h1>

      {/* Mostrar la imagen de la obra si está disponible */}
      {img && <img className='Imagen mb-5' src={img} alt={nombreProduccion} />}

      {/* Renderizar la sinopsis */}
      {typeof sinopsis === "string" ? (
        // Si la sinopsis es un string, dividirlo en párrafos
        sinopsis.split('\n\n').map((paragraph, index) => (
          <p
            className={`mb-4 ${isQuoted(paragraph) ? 'highlight' : ''}`}
            key={index}
          >
            {paragraph}
          </p>
        ))
      ) : (
        // Si la sinopsis es un objeto con secciones
        Object.keys(sinopsis).map(seccion => (
          <div key={seccion}>
            {/* Título de la sección */}
            <h2 className='mb-4'>{seccion}</h2>
            {typeof sinopsis[seccion] === "object" ? (
              // Si el contenido de la sección es un array, renderizar cada párrafo
              sinopsis[seccion].map((parrafo, index) => (
                <p className='mb-5 ' key={index}>{parrafo}</p>
              ))
            ) : (
              // Si el contenido de la sección es un string, dividirlo en párrafos
              sinopsis[seccion].split('\n\n').map((paragraph, index) => (
                <p
                  className={`mb-5 ${isQuoted(paragraph) ? 'highlight' : ''}`}
                  key={index}>
                  {paragraph}
                </p>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Sinopsis;
