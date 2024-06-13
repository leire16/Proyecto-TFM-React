import React from 'react';
import './DondeEstamos.css';

const DondeEstamos = () => {
  return (
    <div className="container">
      <h1 className='mb-5 uppercase'>Dónde Estamos</h1>
      <p>
        Somos un grupo de teatro amateur afiliado al colegio Claret Askartza, ubicado en Sarriena Auzoa, 173, Leioa, Vizcaya. 
        Nos reunimos para ensayar en el Cinema Areto del colegio, creando magia teatral en este espacio inspirador.
      </p>
      <p>
        <strong>Dirección: </strong>Sarriena Auzoa, 173 48940 Leioa, Vizcaya
      </p>
      <p>
        <strong>Horario de ensayos: </strong>Los ensayos se llevan a cabo todos los viernes durante el periodo escolar en el Cinema Areto del colegio, 
        de 13:00 a 14:00. Además, se realizan ensayos generales en días festivos o fines de semana, en fechas establecidas al comienzo 
        de cada curso y acordadas con todos los participantes.
      </p>

      <h2 className="mt-5 uppercase">Cómo Llegar</h2>
      <div className="row mt-4">
        <div className="col-md-7 col-sm-12 mb-5 mb-sm-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2902.1453640137793!2d-2.985888884522032!3d43.33263007913325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4e50b5f7e32587%3A0x40b82c3688b19f6d!2sSarriena%20Auzoa%2C%20173%2C%2048940%20Leioa%2C%20Vizcaya!5e0!3m2!1sen!2ses!4v1620144217396!5m2!1sen!2ses"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            title="Ubicación en Google Maps"
          ></iframe>
        </div>
        <div className="col-md-5 col-sm-12"> 
          <div className="mb-1 mt-2 d-flex align-items-center">
            <i className="mdi mdi-bus mr-2 Icono"></i>
            <h5 className='uppercase'><strong>Autobus</strong></h5>
          </div>
          <p className="mb-5">Líneas A2161, A3471 o A3531.</p>
          <div className="mb-1 d-flex align-items-center">
            <i className="mdi mdi-subway-variant mr-2 Icono"></i>
            <h5 className='uppercase'><strong>Metro</strong></h5>
          </div>
          <p className="mb-5">Linea L1 del metro, parada en Leioa, donde coger bus o subir andando.</p>
          <div className="mb-1 d-flex align-items-center">
            <i className="mdi mdi-parking mr-2 Icono"></i>
            <h5 className='uppercase'><strong>Parking</strong></h5>
          </div>
          <p className="mb-5">Contamos con un estacionamiento privado disponible para los visitantes que llegan en coche.</p>
        </div>
      </div>
    </div>
  );
};

export default DondeEstamos;
