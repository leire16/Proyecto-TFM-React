import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import ImageLoader from '../../components/Images/ImageLoader.jsx';
import apiUrl from '../../config';

const Producciones = ({ cambiarSeccionConParametros }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [obrasArray, setObrasArray] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleMouseOver = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseOut = () => {
        setHoveredIndex(null);
    };

    const handleTextClick = (apartado, nombreProduccion) => {
        cambiarSeccionConParametros(apartado, nombreProduccion);
    };

    useEffect(() => {
        const fetchObras = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/musicales`);
                const data = await response.json();
                const obrasData = data.map(obras => ({
                    nombre: obras.titulo,
                    cartel: obras.cartel_url,
                    fecha: new Date(obras.fecha)  // Convertir la fecha en objeto Date
                }));
                obrasData.sort((a, b) => b.fecha - a.fecha);
                setObrasArray(obrasData);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los musicales:', error);
            }
        };
        fetchObras();
    }, []);

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
            {loading ? (
                <p>Cargando...</p>
            ) : (
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
            )}
        </div>
    );
};

export default Producciones;
