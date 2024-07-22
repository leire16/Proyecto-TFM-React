import React, { useState, useEffect } from 'react';
import './PreguntasFrecuentes.css';
import Preguntas from '../../components/Preguntas/Preguntas';

const PreguntasFrecuentes = () => {
    const [preguntasMusical, setPreguntasMusical] = useState([]);
    const [preguntasEntradas, setPreguntasEntradas] = useState([]);
    const [preguntaAbierta, setPreguntaAbierta] = useState(null);

    useEffect(() => {
        obtenerPreguntasFrecuentes();
    }, []);

    const obtenerPreguntasFrecuentes = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/preguntas/preguntas-frecuentes');
            if (!response.ok) {
                throw new Error('Error al obtener las preguntas frecuentes');
            }
            const data = await response.json();
            const preguntasMusical = data.filter(item => item.tipo === 'El Musical');
            const preguntasEntradas = data.filter(item => item.tipo === 'Entradas');
            setPreguntasMusical(preguntasMusical);
            setPreguntasEntradas(preguntasEntradas);
        } catch (error) {
            console.error('Error al obtener las preguntas frecuentes:', error);
        }
    };

    const handleClickPregunta = (id) => {
        if (preguntaAbierta === id) {
            setPreguntaAbierta(null);
        } else {
            setPreguntaAbierta(id);
        }
    };

    return (
        <div className='container'>
            <h1 className="mb-5 uppercase">Preguntas Frecuentes</h1>

            <h2 className='uppercase text-center mb-5'>El Musical</h2>
            {preguntasMusical.map((preguntaItem, index) => (
                <Preguntas
                    key={`musical-${index}`}
                    id={`musical-${index}`}
                    pregunta={preguntaItem.pregunta}
                    respuesta={preguntaItem.respuesta}
                    isOpen={preguntaAbierta === `musical-${index}`}
                    onClickPregunta={handleClickPregunta}
                />
            ))}

            <h2 className='uppercase text-center mb-5 mt-custom'>Entradas</h2>
            {preguntasEntradas.map((preguntaItem, index) => (
                <Preguntas
                    key={`entradas-${index}`}
                    id={`entradas-${index}`}
                    pregunta={preguntaItem.pregunta}
                    respuesta={preguntaItem.respuesta}
                    isOpen={preguntaAbierta === `entradas-${index}`}
                    onClickPregunta={handleClickPregunta}
                />
            ))}
        </div>
    );
};

export default PreguntasFrecuentes;
