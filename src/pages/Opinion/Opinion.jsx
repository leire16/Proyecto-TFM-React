import React, { useState } from 'react';
import OpinionCard from '../../components/Cards/OpinionCard';
import Encuesta from '../../components/Encuesta/Encuesta';
import opinionesData from '../../mocks/opiniones.json';

const Opinion = () => {
    const [mostrarTodas, setMostrarTodas] = useState(false);

    const handleEncuestaSubmit = (formulario) => {
        // Aquí puedes manejar el envío del formulario
        console.log('Formulario enviado:', formulario);
    };

    const handleMostrarTodasClick = () => {
        setMostrarTodas(true);
    };

    const opinionesMostradas = mostrarTodas ? opinionesData : opinionesData.slice(0, 6);

    return (
        <div className='container my-5'>
            <h1 className="mb-5 uppercase">Opiniones</h1>

            <h2 className='uppercase mb-4'>Dejanos tu Opinión</h2>
            <Encuesta onSubmit={handleEncuestaSubmit} />

            <h2 className="mb-5 uppercase">Reseñas</h2>
            {opinionesMostradas.map((opinion) => (
                <OpinionCard
                    key={opinion.id} 
                    nombre={opinion.nombre}
                    fecha={opinion.fecha}
                    musical={opinion.musical}
                    asunto={opinion.asunto}
                    opinion={opinion.opinion}
                    numEstrellas={opinion.numEstrellas}
                />
            ))}
            {!mostrarTodas && (
                <div className='mt-4'>
                    <p className='text-end pointer bold-text' onClick={handleMostrarTodasClick}>
                        MOSTRAR LAS {opinionesData.length} RESEÑAS
                    </p>
                </div>
            )}
        </div>
    );
};

export default Opinion;