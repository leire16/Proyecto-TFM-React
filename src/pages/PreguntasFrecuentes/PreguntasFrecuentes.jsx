import React, { useState } from 'react';
import './PreguntasFrecuentes.css';
import Preguntas from '../../components/Preguntas/Preguntas';

const PreguntasFrecuentes = () => {
    const [preguntaAbierta, setPreguntaAbierta] = useState(null);

    const handleClickPregunta = (id) => {
        if (preguntaAbierta === id) {
            setPreguntaAbierta(null);
        } else {
            setPreguntaAbierta(id);
        }
    };

    const preguntasMusical = [
        {
            pregunta: "¿Qué duración tiene el musical de Grease?",
            respuesta: "Grease El Musical tiene una duración de 2h."
        },
        {
            pregunta: "¿Cúal es la edad recomendada?",
            respuesta: "En Grease, la edad recomendada es de 6 años en adelante. Los niños deberán sentarse en asientos contiguos al adulto o adultos que les acompañen. No se permite la entrada al recinto a menores de 4 años por respeto al público."
        },
        {
            pregunta: "¿Dondé se puede ver el musical?",
            respuesta: "El musical se puede ver en el Zinema Areto del colegio Claret Askartza en la fecha que se represente habiendo reservado entradas"
        },
        {
            pregunta: "¿Hay alguna forma de poderse unir al grupo de taetro y participar en el próximo musical?",
            respuesta: "Claro, poniéndose en contacto al email del grupo, trasmites tu deseo y nos pondremos en contacto"
        }
    ];

    const preguntasEntradas = [
        {
            pregunta: "¿Cómo puedo comprar mis entradas?",
            respuesta: "A través de la web o a través del email que aparece en el cartel publicitario."
        },
        {
            pregunta: "¿Cómo recibiré mis entradas?",
            respuesta: "Las entradas del musical las recibirás a través de un correo electrónico, puede tardar unos minutos en llegar. O si las desea en físico nos lo puede comunicar y le indicaremos dónde recogerlas."
        },
        {
            pregunta: "¿Con cuánta antelación debo comprar mis entradas?",
            respuesta: "Si quieres tener unas ubicaciones excelentes, recomendamos que compres tus entradas cuanto antes."
        },
        {
            pregunta: "¿Puedo comprar una entrada que no sea para mí?",
            respuesta: "Claro que sí. Esperamos que nuestro espectáculo se convierta también en el mejor de los regalos. Las entradas son al portador y puede asistir quien lleve las entradas."
        },
        {
            pregunta: "¿Los niños necesitan entrada?",
            respuesta: "Cualquier espectador, independientemente de su edad, deberá portar una entrada. Los niños deberán sentarse en asientos contiguos al adulto o adultos que les acompañen. No se permite la entrada al recinto a menores de 4 años por respeto al público."
        },
        {
            pregunta: "¿Es necesario llevar las entradas impresas para acceder al teatro?",
            respuesta: "No. También puede enseñar sus entradas en el teléfono móvil."
        },
        {
            pregunta: "¿Dónde puedo consultar el calendario de funciones?",
            respuesta: "El musical se puede ver en el Zinema Areto del colegio Claret Askartza en la fecha que se represente habiendo reservado entradas."
        }
    ];

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
