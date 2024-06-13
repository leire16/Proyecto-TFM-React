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

  // Función auxiliar para verificar si una línea debe ser tabulada
  const needsTabulation = (line) => line.startsWith('\t');

  return (
    <div className='container'>
      {/* Título de la sinopsis */}
      <h1 className="titulo mb-5">Sinopsis {nombreProduccion}</h1>

      <div className="imagen">
        {/* Mostrar la imagen de la obra si está disponible */}
        {img && <img className='Imagen' src={img} alt={nombreProduccion} />}
      </div>

      {/* Renderizar la sinopsis */}
      <div className="texto">
        {typeof sinopsis === "string" ? (
          // Si la sinopsis es un string, dividirlo en líneas y renderizar
          sinopsis.split('\n').map((line, index) => (
            <p
              className={`parrafo mb-4 ${needsTabulation(line) ? 'tabulada' : ''}`}
              key={index}
            >
              {line}
            </p>
          ))
        ) : (
          // Si la sinopsis es un objeto con secciones
          Object.keys(sinopsis).map(seccion => (
            <div key={seccion}>
              {/* Título de la sección */}
              <h2 className='subtitulo mb-4'>{seccion}</h2>
              {typeof sinopsis[seccion] === "object" ? (
                // Si el contenido de la sección es un array, renderizar cada línea
                sinopsis[seccion].map((line, index) => (
                  <p className={`parrafo mb-5 ${needsTabulation(line) ? 'tabulada' : ''}`} key={index}>{line}</p>
                ))
              ) : (
                // Si el contenido de la sección es un string, dividirlo en líneas y renderizar
                sinopsis[seccion].split('\n').map((line, index) => (
                  <p
                    className={`parrafo mb-5 ${needsTabulation(line) ? 'tabulada' : ''}`}
                    key={index}
                  >
                    {line}
                  </p>
                ))
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Sinopsis;
