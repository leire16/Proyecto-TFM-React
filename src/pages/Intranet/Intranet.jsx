import React, { useState, useEffect } from 'react';
import './Intranet.css';
import apiUrl from '../../config';

const Intranet = () => {
    const [musicalesOrdenados, setMusicalesOrdenados] = useState([]);
    const [videosCargados, setVideosCargados] = useState({});

    useEffect(() => {
        const obtenerMusicales = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/musicales`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de musicales');
                }
                const data = await response.json();

                // Ordenar los musicales por fecha de manera descendente (más reciente primero)
                data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

                // Actualizar el estado con el array ordenado
                setMusicalesOrdenados(data);
            } catch (error) {
                console.error('Error al obtener los musicales:', error);
            }
        };

        obtenerMusicales();
    }, []);


    const descargarGuion = async (id) => {
        try {
            // Solicitar los datos del musical
            const response = await fetch(`${apiUrl}/api/musicales/guion/${encodeURIComponent(id)}`);
            if (!response.ok) {
                throw new Error('Error al obtener la URL del guion');
            }

            // Leer los datos JSON de la respuesta
            const data = await response.json();

            const { guion_url, titulo } = data;

            // Convertir el enlace de Google Drive a un enlace de descarga directa
            const obtenerEnlaceDeDescarga = (url) => {
                const id = new URL(url).pathname.split('/')[3];
                return `https://drive.google.com/uc?export=download&id=${id}`;
            };

            const enlaceDeDescarga = obtenerEnlaceDeDescarga(guion_url);

            // Abrir el enlace de descarga en una nueva pestaña
            window.open(enlaceDeDescarga, '_blank');
        } catch (error) {
            console.error('Error al descargar el guion:', error);
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
                    <div key={obra._id} className="mb-4">
                        <h2 className='mb-4'>{obra.titulo}</h2>
                        <p className='p-guion mb-3'>
                            <strong>Guión: </strong>
                            <button onClick={() => descargarGuion(obra._id)} className="btn btn-link">
                                Descargar
                            </button>
                        </p>
                        <div className="video-responsive mb-5">
                            {!videosCargados[obra._id] && <p>Cargando video...</p>}
                            <iframe
                                width="560"
                                height="315"
                                src={convertToEmbedUrl(obra.video_url)}
                                title={obra.titulo}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad={() => handleVideoLoad(obra._id)}
                                style={{ display: videosCargados[obra._id] ? 'block' : 'none' }}
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