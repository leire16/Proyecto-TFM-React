import React from 'react';
// import Preloader from '../../utils/Preloader'; // Ruta relativa desde index.jsx a Preloader.jsx
import Carousel from 'react-bootstrap/Carousel';

const Inicio = () => {
  const images = [
    '/src/assets/img/grease.png',
    '/src/assets/img/carteles/El Rey Leon.jpg',
    '/src/assets/img/carteles/Grease.jpg',
    '/src/assets/img/carteles/La Sirenita.jpeg',
    '/src/assets/img/carteles/Jesucristo SuperStar.jpg',
    '/src/assets/img/carteles/Charlie.jpg',
    '/src/assets/img/carteles/10 Remix.jpg'
  ];

  return (
    // <Preloader images={images}>
      <div id="inicio">
        <div className="container">
          <h1 className="mb-5">INICIO</h1>
          {/* Centrar el texto horizontalmente */}
          <h2 className="text-center mb-4">MUSICAL EN PRODUCCIÓN</h2>
          {/* Centrar la imagen horizontalmente y ajustar el ancho */}
          <div className="text-center">
            <img src='/assets/img/grease.png' alt="Grease" className="img-fluid" style={{ maxWidth: 'calc(100% - 40px)' }} />
          </div>

          <h2 className="mb-4">PRODUCCIONES</h2>
          <Carousel controls={true} indicators={false} interval={null} prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
            <Carousel.Item>
              <div className="row">
                <div className="col">
                <img src='/assets/img/carteles/Grease.jpg' className="d-block w-100" alt="Grease" />
                </div>
                <div className="col">
                    <img src='/assets/img/carteles/10 Remix.jpg' className="d-block w-100" alt="10 Remix" />
                  
                </div>
                <div className="col">
                  <img src='/assets/img/carteles/La Sirenita.jpeg' className="d-block w-100" alt="La sirenita" />
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="row">
                <div className="col">
                  <img src='/assets/img/carteles/Jesucristo SuperStar.jpg' className="d-block w-100" alt="Jesucristo SuperStar" />
                </div>
                <div className="col">
                  <img src='/assets/img/carteles/Charlie.jpg' className="d-block w-100" alt="Charlie" />
                </div>
                <div className="col">
                <img src='/assets/img/carteles/El Rey Leon.jpg' className="d-block w-100" alt="El Rey León" />
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    // </Preloader>
  );
};

export default Inicio;
