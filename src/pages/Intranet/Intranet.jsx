import React, { useState, useEffect } from 'react';
import obras from '../../mocks/obras.json';
import './Intranet.css';

const Intranet = () => {
    const [musicalesOrdenados, setMusicalesOrdenados] = useState([]);
    const [videosCargados, setVideosCargados] = useState({});

    useEffect(() => {
        // Convertir el objeto JSON a un array de objetos
        const musicalesArray = Object.keys(obras).map((key) => ({
            ...obras[key],
            id: key // Agregar un campo id para mantener la referencia del objeto original
        }));

        // Ordenar los musicales por fecha de manera descendente (más reciente primero)
        musicalesArray.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        // Actualizar el estado con el array ordenado
        setMusicalesOrdenados(musicalesArray);
    }, []);

    const descargarGuion = async (nombreProduccion) => {
        const obra = obras[nombreProduccion];
        if (obra && obra.guion) {
            try {
                const response = await fetch(obra.guion);
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = `Guión-${nombreProduccion}.pdf`;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Error al descargar el guion:', error);
            }
        }
    };

    const convertToEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}?start=0`;
        }
        return `https://www.youtube.com/embed/${videoId}?start=0`;
    };

    const handleVideoLoad = (key) => {
        setVideosCargados((prev) => ({ ...prev, [key]: true }));
    };

    return (
        <div id="intranet">
            <div className="container">
                <h1 className="mb-5">INTRANET</h1>
                {musicalesOrdenados.map((obra) => (
                    <div key={obra.id} className="mb-4">
                        <h2 className='mb-4'>{obra.titulo}</h2>
                        <p className='p-guion mb-3'>
                            <strong>Guión: </strong>
                            <button onClick={() => descargarGuion(obra.id)} className="btn btn-link">
                                Descargar
                            </button>
                        </p>
                        <div className="video-responsive mb-5">
                            {!videosCargados[obra.id] && <p>Cargando video...</p>}
                            <iframe
                                width="560"
                                height="315"
                                src={convertToEmbedUrl(obra.video)}
                                title={obra.titulo}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => handleVideoLoad(obra.id)} // Marcar el video como cargado cuando se completa la carga del iframe
                                style={{ display: videosCargados[obra.id] ? 'block' : 'none' }} // Mostrar el iframe solo cuando el video está cargado
                            ></iframe>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Intranet;
