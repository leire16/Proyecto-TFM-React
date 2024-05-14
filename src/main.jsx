import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import AvisoLegal from './pages/AvisoLegal/AvisoLegal.jsx';
import PoliticaCookies from './pages/PoliticaCookies/PoliticaCookies.jsx';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad/PoliticaPrivacidad.jsx';
import './Index.css';

const Secciones = {
  inicio: <Inicio />,
  avisoLegal: <AvisoLegal />,
  politicaPrivacidad: <PoliticaPrivacidad />,
  politicaCookies: <PoliticaCookies />,
};

const Main = () => {
  const [seccionActual, setSeccionActual] = useState('inicio');

  const cambiarSeccion = (nuevaSeccion) => {
    setSeccionActual(nuevaSeccion);
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const renderizarContenido = () => {
    return Secciones[seccionActual] || <Inicio />;
  };

  return (
    <div>
      <Header cambiarSeccion={cambiarSeccion} /> {/* Pasamos la función cambiarSeccion como prop a Header */}
      <div id="cuerpo">
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
    <Main /> {/* Usamos el componente Main en lugar de App */}
  </React.StrictMode>,
);
