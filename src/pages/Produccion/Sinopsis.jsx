import React from 'react';
import obras from '../../mocks/obras.json';
import './Sinopsis.css';
import ImageLoader from '../../components/Images/ImageLoader.jsx'; 

const Sinopsis = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const obra = obras[nombreProduccion];

  if (!obra) {
    return (
      <div className='container'>
        <p>No se encontró la obra especificada.</p>
      </div>
    );
  }

  const { sinopsis = "", img = "" } = obra;

  const needsTabulation = (line) => line.startsWith('\t');

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Sinopsis - {nombreProduccion}</h1>
      <div className="imagen">
        <ImageLoader className='Imagen mb-5' src={img} alt={nombreProduccion} />
      </div>
      <div className="texto">
        {typeof sinopsis === "string" ? (
          sinopsis.split('\n').map((line, index) => (
            <p
              className={`parrafo mb-4 ${needsTabulation(line) ? 'tabulada' : ''}`}
              key={index}
            >
              {line}
            </p>
          ))
        ) : (
          Object.keys(sinopsis).map(seccion => (
            <div key={seccion}>
              <h2 className='subtitulo mb-4'>{seccion}</h2>
              {typeof sinopsis[seccion] === "object" ? (
                sinopsis[seccion].map((line, index) => (
                  <p className={`parrafo mb-5 ${needsTabulation(line) ? 'tabulada' : ''}`} key={index}>{line}</p>
                ))
              ) : (
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
