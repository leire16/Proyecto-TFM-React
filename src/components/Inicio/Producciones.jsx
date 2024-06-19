import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import obras from '../../mocks/obras.json';
import ImageLoader from '../../components/Images/ImageLoader.jsx';

const Producciones = ({ cambiarSeccionConParametros }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const handleTextClick = (apartado, nombreProduccion) => {
        cambiarSeccionConParametros(apartado, nombreProduccion);
    };

    // Convertir el objeto en un arreglo de objetos y parsear las fechas
    const obrasArray = Object.keys(obras).map(key => ({
        nombre: key,
        ...obras[key],
        fecha: new Date(obras[key].fecha)  // Convertir la fecha en objeto Date
    }));

    // Ordenar las obras por fecha (más reciente primero)
    obrasArray.sort((a, b) => b.fecha - a.fecha);

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
                                    <div
                                        className="carousel-img-container"
                                        onMouseOver={() => handleMouseOver(`${index}-${innerIndex}`)}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <ImageLoader src={obra.cartel} className="d-block w-100" alt={obra.nombre} />
                                        {hoveredIndex === `${index}-${innerIndex}` && (
                                            <p className="centered-text pointer" onClick={() => handleTextClick('sinopsis', obra.nombre)}>
                                                + INFORMACIÓN
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
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
