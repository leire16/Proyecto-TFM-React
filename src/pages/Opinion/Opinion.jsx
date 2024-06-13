import React, { useState } from 'react';
import OpinionCard from '../../components/Cards/Opinion-card';
import opinionesData from '../../mocks/opiniones.json'; // Ajusta el path según la ubicación de tu JSON

const Opinion = () => {
    const [mostrarTodas, setMostrarTodas] = useState(false);

    const handleMostrarTodasClick = () => {
        setMostrarTodas(true);
    };

    const opinionesMostradas = mostrarTodas ? opinionesData : opinionesData.slice(0, 6);

    return (
        <div className='container my-5'>
            <h1 className="mb-5">OPINIÓN</h1>
            {opinionesMostradas.map((opinion, index) => (
                <OpinionCard
                    key={index}
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
