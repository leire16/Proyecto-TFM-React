import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Inicio = ({ cambiarSeccion }) => {
  const [showInfoText, setShowInfoText] = useState(false);

  const handleMouseOver = () => {
    setShowInfoText(true);
  };

  const handleMouseOut = () => {
    setShowInfoText(false);
  };

  const handleImageClick = (seccion) => {
    cambiarSeccion(seccion);
  };

  return (
    <div id="inicio">
      <div className="container-fluid">
        {/* Centrar el texto horizontalmente */}
        <h2 className="text-center mb-4">MUSICAL EN PRODUCCIÓN</h2>
        {/* Centrar la imagen horizontalmente y ajustar el ancho */}
        <div className="text-center">
          <img src='/assets/img/grease.webp' alt="Grease" className="img-fluid" style={{ maxWidth: 'calc(100% - 40px)' }} />
        </div>

        {/* Nuevo contenedor con fondo gris */}
        <div className="bg-grey container-fluid my-5 py-5">
          <div className="container">
            <h2 className="mb-3">¿Qué es Askartza Martxa?</h2>
            <p>Askartza Martxa es un grupo de teatro amateur con una trayectoria de 22 años, originado como un proyecto enfocado principalmente en estudiantes de 1-2 de ESO. A lo largo de los años, este grupo ha evolucionado para convertirse en una destacada comunidad artística y educativa en Bizkaia, España.</p>
            <p>Con el compromiso de ofrecer entretenimiento de calidad y promover valores fundamentales a través del arte, Askartza Martxa ha producido una amplia variedad de obras teatrales, desde musicales clásicos hasta obras originales que abordan temas sociales relevantes.  </p>
          </div>
        </div>

        <div className='container'>
          <h2 className="mb-5">PRODUCCIONES</h2>
          <Carousel controls={true} indicators={false} interval={null} prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
            <Carousel.Item>
              <div className="row">
                <div className="col">
                  <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('grease')}>
                    <img src='/assets/img/carteles/Grease.webp' className="d-block w-100" alt="Grease" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
                <div className="col">
                  <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('remix')}>
                    <img src='/assets/img/carteles/10 Remix.webp' className="d-block w-100" alt="10 Remix" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
                <div className="col">
                <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('jesucristo')}>
                    <img src='/assets/img/carteles/Jesucristo Superstar.webp' className="d-block w-100" alt="Jesucritso SuperStar" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="row">
                <div className="col">
                <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('laSirenita')}>
                    <img src='/assets/img/carteles/La Sirenita.webp' className="d-block w-100" alt="La sirenita" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
                <div className="col">
                <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('charlie')}>
                    <img src='/assets/img/carteles/Charlie.webp' className="d-block w-100" alt="Charlie" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
                <div className="col">
                  <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('reyLeon')}>
                    <img src='/assets/img/carteles/El Rey Leon.webp' className="d-block w-100" alt="El Rey León" style={{ cursor: 'pointer' }} />
                    {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
