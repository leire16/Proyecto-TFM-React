import React from 'react';
import './Opinion-card.css';

const OpinionCard = ({ nombre, fecha, musical, asunto, opinion, numEstrellas }) => {
  return (
    <div className="card opinion-card mb-3 p-3">
      {nombre && (
        <div className="align-center mb-2">
          <i className="bi bi-person-circle icon-person me-2"></i>
          <p className="mb-0 bold-text">{nombre}</p>
        </div>
      )}
      <div className="align-center mb-2">
        {numEstrellas > 0 && (
          <div className="me-2 d-flex space-between">
            {[...Array(numEstrellas)].map((_, i) => (
              <i key={i} className="bi bi-star-fill text-warning icon-star"></i>
            ))}
          </div>
        )}
        {fecha && <p className="mb-0 me-2 space-between">{fecha}</p>}
        {musical && (
          <p className="mb-0">
            <span className="bold-text">Musical:</span> {musical}
          </p>
        )}
      </div>
      {asunto && <h5 className="mb-2 bold-text">{asunto}</h5>}
      {opinion && <p>{opinion}</p>}
    </div>
  );
};

export default OpinionCard;