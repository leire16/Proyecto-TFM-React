import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import obras from '../../mocks/obras.json';

const Producciones = ({ showInfoText, setShowInfoText, cambiarSeccionConParametros }) => {
    const handleMouseOver = () => {
        setShowInfoText(true);
    };

    const handleMouseOut = () => {
        setShowInfoText(false);
    };

    const handleImageClick = (apartado, nombreProduccion) => {
        cambiarSeccionConParametros(apartado, nombreProduccion);
    };

    // Convertir el objeto en un arreglo de objetos
    const obrasArray = Object.keys(obras).map(key => ({
        nombre: key,
        ...obras[key]
    }));

    // Dividir el arreglo en grupos de tres para mostrar en cada Carousel.Item
    const groupedObras = [];
    let tempGroup = [];
    for (let i = 0; i < obrasArray.length; i++) {
        if (tempGroup.length < 3) {
            tempGroup.push(obrasArray[i]);
        }
        if (tempGroup.length === 3 || i === obrasArray.length - 1) {
            groupedObras.push(tempGroup);
            tempGroup = [];
        }
    }

    return (
        <div className='container'>
            <h2 className="mb-5">PRODUCCIONES</h2>
            <Carousel controls={true} indicators={false} interval={null} prevIcon={<span className="carousel-control-prev-icon" />} nextIcon={<span className="carousel-control-next-icon" />}>
                {groupedObras.map((grupo, index) => (
                    <Carousel.Item key={index}>
                        <div className="row">
                            {grupo.map((obra, innerIndex) => (
                                <div key={innerIndex} className="col">
                                    <div className="carousel-img-container" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={() => handleImageClick('sinopsis', obra.nombre)}>
                                        <img src={obra.cartel} className="d-block w-100" alt={obra.nombre} style={{ cursor: 'pointer' }} />
                                        {showInfoText && <p className="centered-text pointer">+ INFORMACIÓN</p>}
                                    </div>
                                </div>
                            ))}
                            {/* Rellenar con placeholders si no hay suficientes elementos */}
                            {[...Array(3 - grupo.length)].map((_, placeholderIndex) => (
                                <div key={grupo.length + placeholderIndex} className="col" />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Producciones;
