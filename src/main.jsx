import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import Produccion from './pages/Produccion/Produccion.jsx';
import Opinion from './pages/Opinion/Opinion.jsx';
import AvisoLegal from './pages/AvisoLegal/AvisoLegal.jsx';
import PoliticaCookies from './pages/PoliticaCookies/PoliticaCookies.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import './Index.css';

const Main = () => {
  const [seccionActual, setSeccionActual] = useState('inicio');
  const [parametrosProduccion, setParametrosProduccion] = useState(null);

  const cambiarSeccion = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cambiarSeccionConParametros = (nuevaSeccion, parametros) => {
    setParametrosProduccion(parametros); // Guardar los parámetros en el estado
    setSeccionActual(nuevaSeccion);
    // Realizar acciones adicionales con los parámetros, como cargar datos
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

  const Secciones = {
    inicio: <Inicio cambiarSeccionConParametros={cambiarSeccionConParametros} cambiarSeccion={cambiarSeccion} />,
    produccion: parametrosProduccion ? <Produccion parametros={parametrosProduccion} /> : null,
    opinion:<Opinion />,
    avisoLegal: <AvisoLegal />,
    politicaPrivacidad: <PoliticaPrivacidad />,
    politicaCookies: <PoliticaCookies />,
  };

  const renderizarContenido = () => {
    return Secciones[seccionActual] || <Inicio cambiarSeccionConParametros={cambiarSeccionConParametros} cambiarSeccion={cambiarSeccion} />;
  };

  return (
    <div>
      <Header cambiarSeccion={cambiarSeccion} cambiarSeccionConParametros={cambiarSeccionConParametros}/>
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
