import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import DondeEstamos from './pages/DondeEstamos/DondeEstamos.jsx';
import Sinopsis from './pages/Produccion/Sinopsis.jsx';
import Elenco from './pages/Produccion/Elenco.jsx';
import Canciones from './pages/Produccion/Canciones.jsx';
import EquipoCreativo from './pages/Produccion/EquipoCreativo.jsx';
import Galeria from './pages/Produccion/Galeria.jsx';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes/PreguntasFrecuentes.jsx';
import Opinion from './pages/Opinion/Opinion.jsx';
import AvisoLegal from './pages/AvisoLegal/AvisoLegal.jsx';
import PoliticaCookies from './pages/PoliticaCookies/PoliticaCookies.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import Intranet from './pages/Intranet/Intranet.jsx';
import './Index.css';

const Main = () => {
  const [seccionActual, setSeccionActual] = useState('inicio');
  const [nombreProduccion, setNombreProduccion] = useState(null);

  const cambiarSeccion = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    setTimeout(() => {
      document.body.scrollIntoView({ top: 0, behavior: 'smooth', block: 'start' });
  }, 0);
  };

  const cambiarSeccionConParametros = (apartado, nombreProduccion) => {
    setNombreProduccion(nombreProduccion);
    setSeccionActual(apartado);
    // Realizar acciones adicionales con los parámetros, como cargar datos
    setTimeout(() => {
      document.body.scrollIntoView({ top: 0, behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const Secciones = {
    inicio: <Inicio cambiarSeccionConParametros={cambiarSeccionConParametros} cambiarSeccion={cambiarSeccion} />,
    dondeEstamos : <DondeEstamos/>,
    sinopsis: seccionActual === 'sinopsis' ? <Sinopsis parametros={{ nombreProduccion }} /> : null,
    elenco: seccionActual === 'elenco' ? <Elenco parametros={{ nombreProduccion }} /> : null,
    canciones: seccionActual === 'canciones' ? <Canciones parametros={{ nombreProduccion }} /> : null,
    equipoCreativo: seccionActual === 'equipoCreativo' ? <EquipoCreativo parametros={{ nombreProduccion }} /> : null,  
    galeria: seccionActual === 'galeria' ? <Galeria parametros={{ nombreProduccion }} /> : null, 
    faq : <PreguntasFrecuentes/>,
    opinion: <Opinion />,
    avisoLegal: <AvisoLegal />,
    politicaPrivacidad: <PoliticaPrivacidad />,
    politicaCookies: <PoliticaCookies />,
    intranet: <Intranet />
  };
  
    const renderizarContenido = () => {
      return Secciones[seccionActual] || <Inicio cambiarSeccionConParametros={cambiarSeccionConParametros} cambiarSeccion={cambiarSeccion} />;
    };

  return (
    <div>
      <Header cambiarSeccion={cambiarSeccion} cambiarSeccionConParametros={cambiarSeccionConParametros} />
      <div id="cuerpo" className='pt-5 pb-5'>
        {renderizarContenido()}
      </div>
      <Footer
        onMostrarAvisoLegal={() => cambiarSeccion('avisoLegal')}
        onMostrarPoliticaPrivacidad={() => cambiarSeccion('politicaPrivacidad')}
        onMostrarPoliticaCookies={() => cambiarSeccion('politicaCookies')}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);
