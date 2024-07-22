import React, { useState, useEffect } from 'react';
import OpinionCard from '../../components/Cards/OpinionCard';
import { MusicalEnProduccion, InformacionAskartzaMartxa, Producciones } from '../../components/Inicio/Index';

const Inicio = ({ cambiarSeccionConParametros, onVerMas }) => {

  const [showInfoText, setShowInfoText] = useState(false);
  const [opiniones, setOpiniones] = useState([]);
  const [totalOpiniones, setTotalOpiniones] = useState(0);

  useEffect(() => {
    const fetchOpiniones = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/opiniones/ordenadasFecha');
        const data = await response.json();
        setTotalOpiniones(data.length);
        setOpiniones(data.slice(0, 3));
      } catch (error) {
        console.error('Error al obtener opiniones:', error);
      }
    };

    fetchOpiniones();
  }, []);

  const handleVerMasClick = () => {
    onVerMas(); // Llamar a la función para manejar clic en "Ver más"
  };

  return (
    <div id="inicio">
      <div className="container-fluid">
        <MusicalEnProduccion imagen='https://res.cloudinary.com/dqq0xnj5b/image/upload/v1717596919/Askartza%20Martxa/Grease/logo.webp' />
        <InformacionAskartzaMartxa />
        <Producciones showInfoText={showInfoText} setShowInfoText={setShowInfoText} cambiarSeccionConParametros={cambiarSeccionConParametros} />
        <div className="container-fluid my-5 py-5 card-red">
          <div className="container">
            <h2 className="text mb-4">OPINIONES ({totalOpiniones})</h2>
            {opiniones.map((opinion, index) => (
              <OpinionCard
                key={index}
                nombre={opinion.nombre}
                fecha={new Date(opinion.fecha).toLocaleDateString('es-ES')} // Formatear fecha
                musical={opinion.musical}
                asunto={opinion.asunto}
                opinion={opinion.opinion}
                numEstrellas={opinion.numEstrellas}
              />
            ))}
            <div className='mt-4'>
              <p className='text-end pointer bold-text' onClick={handleVerMasClick}> + VER MÁS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
