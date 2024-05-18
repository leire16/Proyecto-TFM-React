import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import imagen1 from '/src/assets/img/carteles/imagen1.jpg'; // Importa la imagen estáticamente
import imagen2 from '/src/assets/img/carteles/imagen2.jpg'; // Importa la imagen estáticamente
// Importa más imágenes según sea necesario

const Inicio = () => {
  const [carteles, setCarteles] = useState([]);

  useEffect(() => {
    // Almacena las rutas de las imágenes en el estado
    setCarteles([imagen1, imagen2]);
  }, []);

  return (
    <div id="inicio">
      <div className="container">
        <h1 className="mb-5">INICIO</h1>
        <h2 className="text-center mb-4">MUSICAL EN PRODUCCIÓN</h2>
        <div className="text-center">
          <img src="/src/assets/img/grease.png" alt="Grease" className="img-fluid" style={{ maxWidth: 'calc(100% - 40px)' }} />
        </div>

        <h2 className="mb-4">PRODUCCIONES</h2>
        <Carousel controls={true} indicators={false} interval={null} prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
          {carteles.map((imagen, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                <div className="col">
                  <img className="d-block w-100" src={imagen} alt={`Imagen ${index}`} />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Inicio;
