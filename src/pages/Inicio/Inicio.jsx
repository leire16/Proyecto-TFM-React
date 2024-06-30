import React, { useState } from 'react';
import OpinionCard from '../../components/Cards/OpinionCard';
import { MusicalEnProduccion, InformacionAskartzaMartxa, Producciones } from '../../components/Inicio/Index';
import opinionesData from '../../mocks/opiniones.json'; // Ya has importado el JSON

const Inicio = ({ cambiarSeccionConParametros, cambiarSeccion }) => {
  const [showInfoText, setShowInfoText] = useState(false);

  const handleImageClick = (seccion) => {
    cambiarSeccion(seccion);
  };

  // Solo toma las primeras 3 opiniones
  const primerasOpiniones = opinionesData.slice(0, 3);

  return (
    <div id="inicio">
      <div className="container-fluid">
        {/* Sección musical en produccion */}
        <MusicalEnProduccion imagen='https://res.cloudinary.com/dqq0xnj5b/image/upload/v1717596919/Askartza%20Martxa/Grease/logo.webp' />

        {/* Sección que es askartza martxa */}
        <InformacionAskartzaMartxa />

        {/* Sección de producciones */}
        <Producciones showInfoText={showInfoText} setShowInfoText={setShowInfoText} cambiarSeccionConParametros={cambiarSeccionConParametros} />

        {/* Sección de opiniones */}
        <div className="container-fluid my-5 py-5 card-red">
          <div className="container">
            <h2 className="text mb-4">OPINIONES (30)</h2>
            {primerasOpiniones.map((opinion, index) => (
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
            <div className='mt-4'>
              <p className='text-end pointer bold-text' onClick={() => handleImageClick('opinion')}> + VER MÁS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
