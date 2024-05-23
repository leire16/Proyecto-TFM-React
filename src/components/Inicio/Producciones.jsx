// Producciones.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Producciones = ({ showInfoText, setShowInfoText, cambiarSeccionConParametros }) => {
    const handleMouseOver = () => {
        setShowInfoText(true);
    };

    const handleMouseOut = () => {
        setShowInfoText(false);
    };

    const handleImageClick = (apartado,nombreProduccion) => {
        cambiarSeccionConParametros(apartado, nombreProduccion);
    };

    return (
        <div className='container'>
            <h2 className="mb-5">PRODUCCIONES</h2>
            <Carousel controls={true} indicators={false} interval={null} prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
                <Carousel.Item>
                    <div className="row">
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','Grease')}>
                                <img src='/assets/img/carteles/Grease.webp' className="d-block w-100" alt="Grease" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','10 Remix')}>
                                <img src='/assets/img/carteles/10 Remix.webp' className="d-block w-100" alt="10 Remix" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','Jesucristo SuperStar')}>
                                <img src='/assets/img/carteles/Jesucristo Superstar.webp' className="d-block w-100" alt="Jesucritso SuperStar" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className="row">
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','La Sirenita')}>
                                <img src='/assets/img/carteles/La Sirenita.webp' className="d-block w-100" alt="La sirenita" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','Charlie y la Fabrica de Chocolate')}>
                                <img src='/assets/img/carteles/Charlie.webp' className="d-block w-100" alt="Charlie" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                        <div className="col">
                            <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis','El Rey León')}>
                                <img src='/assets/img/carteles/El Rey Leon.webp' className="d-block w-100" alt="El Rey León" style={{ cursor: 'pointer' }} />
                                {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Producciones;
