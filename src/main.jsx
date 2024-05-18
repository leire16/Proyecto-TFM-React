import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import Grease from './pages/Grease/GreaseMusical.jsx';
import Remix from './pages/Remix/RemixMusical.jsx';
import AvisoLegal from './pages/AvisoLegal/AvisoLegal.jsx';
import PoliticaCookies from './pages/PoliticaCookies/PoliticaCookies.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import './Index.css';

const Main = () => {
  const [seccionActual, setSeccionActual] = useState('inicio');

  const cambiarSeccion = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const Secciones = {
    inicio: <Inicio cambiarSeccion={cambiarSeccion} />,
    grease:<Grease />,
    remix:<Remix />,
    avisoLegal: <AvisoLegal />,
    politicaPrivacidad: <PoliticaPrivacidad />,
    politicaCookies: <PoliticaCookies />,
  };

  const renderizarContenido = () => {
    return Secciones[seccionActual] || <Inicio cambiarSeccion={cambiarSeccion}/>;
  };

  return (
    <div>
      <Header cambiarSeccion={cambiarSeccion} /> {/* Pasamos la función cambiarSeccion como prop a Header */}
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
