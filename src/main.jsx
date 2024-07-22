import React, { useState, useEffect, useRef } from 'react';
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
  const [scrollToOpinions, setScrollToOpinions] = useState(false);
  const opinionesRef = useRef(null); // Referencia para la sección de opiniones

  const cambiarSeccionInicio = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    setScrollToOpinions(false); // Asegurarse de que no se vaya a la sección de opiniones
    setTimeout(() => {
      document.body.scrollIntoView({ top: 0, behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const cambiarSeccionOpiniones = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    setTimeout(() => {
      if (opinionesRef.current) {
        opinionesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  };

  const cambiarSeccionConParametros = (apartado, nombreProduccion) => {
    setNombreProduccion(nombreProduccion);
    setSeccionActual(apartado);
    setTimeout(() => {
      document.body.scrollIntoView({ top: 0, behavior: 'smooth', block: 'start' });
    }, 0);
  };

  // Función para manejar el clic en "Ver más" desde Inicio.jsx
  const handleVerMasInicio = () => {
    cambiarSeccionOpiniones('opinion'); // Cambiar a la sección de opiniones
    setScrollToOpinions(true); // Establecer scroll a opiniones
  };

  const Secciones = {
    inicio: <Inicio
      cambiarSeccionConParametros={cambiarSeccionConParametros}
      onVerMas={handleVerMasInicio} />,
    dondeEstamos: <DondeEstamos />,
    sinopsis: seccionActual === 'sinopsis' ? <Sinopsis parametros={{ nombreProduccion }} /> : null,
    elenco: seccionActual === 'elenco' ? <Elenco parametros={{ nombreProduccion }} /> : null,
    canciones: seccionActual === 'canciones' ? <Canciones parametros={{ nombreProduccion }} /> : null,
    equipoCreativo: seccionActual === 'equipoCreativo' ? <EquipoCreativo parametros={{ nombreProduccion }} /> : null,
    galeria: seccionActual === 'galeria' ? <Galeria parametros={{ nombreProduccion }} /> : null,
    faq: <PreguntasFrecuentes />,
    opinion: <Opinion ref={opinionesRef} scrollIntoView={scrollToOpinions} />,
    avisoLegal: <AvisoLegal />,
    politicaPrivacidad: <PoliticaPrivacidad />,
    politicaCookies: <PoliticaCookies />,
    intranet: <Intranet />
  };

  const renderizarContenido = () => {
    return Secciones[seccionActual] || <Inicio cambiarSeccionConParametros={cambiarSeccionConParametros} cambiarSeccion={cambiarSeccionInicio} />;
  };

  return (
    <div>
      <Header cambiarSeccion={cambiarSeccionInicio} cambiarSeccionConParametros={cambiarSeccionConParametros} />
      <div id="cuerpo" className='pt-5 pb-5'>
        {renderizarContenido()}
      </div>
      <Footer
        onMostrarAvisoLegal={() => cambiarSeccionInicio('avisoLegal')}
        onMostrarPoliticaPrivacidad={() => cambiarSeccionInicio('politicaPrivacidad')}
        onMostrarPoliticaCookies={() => cambiarSeccionInicio('politicaCookies')}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);

export default Main;
