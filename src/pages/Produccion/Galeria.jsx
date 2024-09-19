import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';
import './Galeria.css';

const Galeria = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const [imagenes, setImagenes] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const obtenerImagenes = async () => {
      setImagenes([]); // Resetear imágenes al cambiar de producción
      setError(''); // Resetear el error al cambiar de producción
      setSlideIndex(0); // Resetear el índice del carrusel al cambiar de producción

      try {
        const response = await axios.get(`http://localhost:3001/api/imagenes/${nombreProduccion}`);

        if (response.status !== 200) {
          throw new Error('Error al obtener las imágenes');
        }

        const imagenesDesdeAPI = response.data;
        if (!imagenesDesdeAPI || imagenesDesdeAPI.length === 0) {
          throw new Error('No se encontraron imágenes para mostrar');
        }

        setImagenes(imagenesDesdeAPI);
      } catch (error) {
        console.error('Error al obtener las imágenes:', error);
        setError(error.message);
      }
    };

    obtenerImagenes();
  }, [nombreProduccion]);

  const handleSelect = (selectedIndex, e) => {
    setSlideIndex(selectedIndex);
  };

  if (error) {
    return (
      <div className='container'>
        <p>{error}</p>
      </div>
    );
  }

  if (imagenes.length === 0) {
    return (
      <div className='container'>
        <p>No se encontraron imágenes o videos para la obra especificada.</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Galería de Imágenes - {nombreProduccion}</h1>
      <Carousel
        activeIndex={slideIndex}
        onSelect={handleSelect}
        controls={true}
        indicators={true}
        interval={null}
        prevIcon={<span className="carousel-control-prev-icon" />}
        nextIcon={<span className="carousel-control-next-icon" />}
        className="carousel-container"
      >
        {imagenes.map((imagen, index) => (
          <Carousel.Item key={index}>
            <div className='Imagenes'>
              {imagen.url.endsWith('.mp4') ? (
                <video className="d-block w-100" controls>
                  <source src={imagen.url} type="video/mp4" />
                  Tu navegador no admite la reproducción de videos.
                </video>
              ) : (
                <img
                  className="d-block w-100"
                  src={imagen.url}
                  alt={`Elemento ${index + 1}`}
                />
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <h5 className="text-center texto-imagenes">{imagenes.length} {imagenes.length === 1 ? 'elemento' : 'elementos'}</h5>
    </div>
  );
};

export default Galeria;
