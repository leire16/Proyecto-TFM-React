import React, { useEffect, useState, forwardRef } from 'react';
import OpinionCard from '../../components/Cards/OpinionCard';
import Encuesta from '../../components/Encuesta/Encuesta';

const Opinion = forwardRef(({ scrollIntoView }, ref) => {
  const [mostrarTodas, setMostrarTodas] = useState(false);
  const [opinionesData, setOpinionesData] = useState([]);

  useEffect(() => {
    obtenerOpiniones();
  }, []);

  const obtenerOpiniones = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/opiniones/ordenadasFecha');
      if (!response.ok) {
        throw new Error('Error al obtener las opiniones');
      }
      const opiniones = await response.json();
      setOpinionesData(opiniones);
    } catch (error) {
      console.error('Error al obtener las opiniones:', error);
    }
  };

  const handleEncuestaSubmit = async (formulario) => {
    await obtenerOpiniones();
  };

  const handleMostrarTodasClick = () => {
    setMostrarTodas(true);
  };

  const handleMostrarMenosClick = () => {
    setMostrarTodas(false);
  };

  const opinionesMostradas = mostrarTodas ? opinionesData : opinionesData.slice(0, 6);

  useEffect(() => {
    if (scrollIntoView && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollIntoView, ref]);

  return (
    <div className='container my-5'>
      <h1 className="mb-5 uppercase">Opiniones</h1>

      <h2 className='uppercase mb-4'>Dejanos tu Opinión</h2>
      <Encuesta onSubmit={handleEncuestaSubmit} />

      <h2 ref={ref} className="mb-5 uppercase">Opiniones</h2>
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
      <div className='mt-4'>
        {!mostrarTodas ? (
          <p className='text-end pointer bold-text' onClick={handleMostrarTodasClick}>
            MOSTRAR LAS {opinionesData.length} RESEÑAS
          </p>
        ) : (
          <p className='text-end pointer bold-text' onClick={handleMostrarMenosClick}>
            MOSTRAR MENOS RESEÑAS
          </p>
        )}
      </div>
    </div>
  );
});

export default Opinion;
