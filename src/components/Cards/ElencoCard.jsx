import React from 'react';
import './ElencoCard.css';
import ImageLoader from '../Images/ImageLoader.jsx';

const ElencoCard = ({ seccion, personaje, imagen, persona, descripcion }) => {
    return (
        <div className={`elenco-card mb-3`}>
            <div className="card-body mb-3">
                <h5 className='mb-4'>
                    <strong>{personaje} : {persona}</strong>
                </h5>
                <div className="row mb-3">
                    <div className="col-md-3 me-3 mt-3 image-container">
                        <ImageLoader className='ImagenElenco' src={imagen} alt={personaje} />
                    </div>
                    <div className={` ${seccion === "Actores Secundarios" ? "col-md-8 actores-secundarios" : "col-md-10 actores-principales"}`}>
                        <p className="descripcion">{descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElencoCard;
