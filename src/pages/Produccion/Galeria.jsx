import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import obras from '../../mocks/obras.json';
import './Galeria.css';

const Galeria = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const [obra, setObra] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    // Actualizar la obra cuando cambien los parametros
    if (nombreProduccion) {
      setObra(obras[nombreProduccion]);
      setSlideIndex(0); // Reiniciar el slideIndex al cambiar de obra
    }
  }, [nombreProduccion]);

  // Manejar caso donde no se encuentra la obra o no tiene imágenes
  if (!obra || !obra.imagenes || obra.imagenes.length === 0) {
    return (
      <div className='container'>
        <p>No se encontraron imágenes o videos para la obra especificada.</p>
      </div>
    );
  }

  const handleSelect = (selectedIndex, e) => {
    setSlideIndex(selectedIndex);
  };

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Galería de Imagenes - {nombreProduccion}</h1>
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
        {obra.imagenes.map((url, index) => (
          <Carousel.Item key={index}>
            <div className='Imagenes'>
              {url.endsWith('.mp4') ? (
                <video className="d-block w-100" controls>
                  <source src={url} type="video/mp4" />
                  Tu navegador no admite la reproducción de videos.
                </video>
              ) : (
                <img
                  className="d-block w-100"
                  src={url}
                  alt={`Elemento ${index + 1}`}
                />
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      <h5 className="text-center texto-imagenes">{obra.imagenes.length} {obra.imagenes.length === 1 ? 'elemento' : 'elementos'}</h5>
    </div>
  );
};

export default Galeria;
