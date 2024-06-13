import React from 'react';
import './Preguntas.css';

const Preguntas = ({ id, pregunta, respuesta, isOpen, onClickPregunta }) => {
  const toggleRespuesta = () => {
    onClickPregunta(id);
  };

  return (
    <div className="pregunta-container">
      <div className="pregunta-header mx-3">
        <span className='me-2'>{pregunta}</span>
        <i className={`icono-mas ${isOpen ? 'rotado' : ''}`} onClick={toggleRespuesta}>+</i>
      </div>
      {isOpen && (
        <div className="respuesta-container">
          <p className="ms-3 me-5 mt-1 mb-1">{respuesta}</p>
        </div>
      )}
    </div>
  );
};

export default Preguntas;
