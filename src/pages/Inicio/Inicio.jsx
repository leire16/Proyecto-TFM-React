import React, { useState } from 'react';
import OpinionCard from '../../components/Cards/Opinion-card';
import { MusicalEnProduccion, InformacionAskartzaMartxa, Producciones } from '../../components/Inicio/Index';

const Inicio = ({ cambiarSeccionConParametros, cambiarSeccion }) => {
  const [showInfoText, setShowInfoText] = useState(false);

  const handleImageClick = (seccion) => {
    cambiarSeccion(seccion);
  };

  return (
    <div id="inicio">
      <div className="container-fluid">
        {/* Sección musical en produccion */}
        <MusicalEnProduccion imagen='/assets/img/grease.webp' />

        {/* Sección que es askartza martxa */}
        <InformacionAskartzaMartxa />

        {/* Sección de producciones */}
        <Producciones showInfoText={showInfoText} setShowInfoText={setShowInfoText} cambiarSeccionConParametros={cambiarSeccionConParametros} />

        {/* Sección de opiniones */}
        <div className="container-fluid my-5 py-5 card-red">
          <div className="container">
            <h2 className="text mb-4">OPINIONES (30)</h2>
            <OpinionCard
              nombre="Leire"
              fecha="11 de enero de 2023"
              musical="Grease"
              asunto="Critica"
              opinion="Me pareció que el vestuario del musical debería haber estado mas curradoción fue excelente y las actuaciones estuvieron a la altura. Recomiendo a todos ver este musical."
              numEstrellas={2}
            />
            <OpinionCard
              nombre="Jose"
              fecha="22 de Noviembre de 2023"
              musical="El Rey León"
              asunto="Espectáculo increíble"
              opinion="El espectáculo me pareció muy dinámico y divertido. Lo que si no perdono es la organización!!"
              numEstrellas={4}
            />
            <OpinionCard
              nombre="Mari Carmen"
              fecha="25 de Noviembre de 2023"
              musical=""
              asunto="Impresionante"
              opinion="Me ha parecido un espectáculo de 10. Impresionante el elenco, las dos  actrices principales brillan con luz propia... vaya vozarrones!! L@s  bailarines llenan el pequeño escenario."
              numEstrellas={5}
            />
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
