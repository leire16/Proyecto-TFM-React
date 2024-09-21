import React, { useState, useEffect } from 'react';
import './Sinopsis.css';
import ImageLoader from '../../components/Images/ImageLoader.jsx';
import axios from 'axios';
import apiUrl from '../../config';

const Sinopsis = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const [sinopsis, setSinopsis] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerSinopsisDesdeAPI = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/sinopsis/${nombreProduccion}`);

        if (response.status !== 200) {
          throw new Error('Error al obtener las sinopsis');
        }

        const sinopsisDesdeAPI = response.data;

        if (!sinopsisDesdeAPI || sinopsisDesdeAPI.length === 0) {
          throw new Error('No se encontraron sinopsis para mostrar');
        }

        console.log("sinopsisDesdeAPI: ", sinopsisDesdeAPI)
        setSinopsis(sinopsisDesdeAPI);

      } catch (error) {
        setError('No se pudo obtener la sinopsis.', error);
      }
    };

    obtenerSinopsisDesdeAPI();
  }, [nombreProduccion]);


  if (Object.keys(sinopsis).length === 0) {
    return (
      <div className='container'>
        <p>{error || 'Cargando...'}</p>
      </div>
    );
  }

  const needsTabulation = (line) => line.startsWith('\t');

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Sinopsis - {nombreProduccion}</h1>
      <div className="imagen">
        {sinopsis.length > 0 && (
          <ImageLoader className='Imagen mb-5' src={sinopsis[0].musical_id.img_url} alt={sinopsis[0].musical_id.titulo} />
        )}
      </div>
      <div className="sinopsis-items">
        {sinopsis.map((item, index) => (
          <div key={index} className="sinopsis-item mb-5">
            <h2 className='subtitulo mb-4'>{item.acto}</h2>
            {typeof item.descripcion === "string" ? (
              item.descripcion.split('\n').map((line, idx) => (
                <p
                  className={`parrafo mb-5 ${needsTabulation(line) ? 'tabulada' : ''}`}
                  key={idx}
                >
                  {line}
                </p>
              ))
            ) : (
              item.descripcion.map((line, idx) => (
                <p
                  className={`parrafo mb-5 ${needsTabulation(line) ? 'tabulada' : ''}`}
                  key={idx}
                >
                  {line}
                </p>
              ))
            )}
          </div>
        ))}
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Sinopsis;