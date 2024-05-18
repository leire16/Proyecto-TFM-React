import React, { useState } from 'react';
import './HeaderPrincipal.css';

const HeaderPrincipal = ({ mostrarIntranet, toggleHeaderPrincipal, onMostrarSeccion }) => {
  const [menuVisible, setMenuVisible] = useState(true);
  const [produccionesVisible, setProduccionesVisible] = useState(false);
  const [intranetVisible, setIntranetVisible] = useState(false); // Nuevo estado para controlar la visibilidad de Intranet

  const mostrarSeccion = (seccion) => {
    toggleHeaderPrincipal();
    onMostrarSeccion(seccion);
  };

  const mostrarProducciones = () => {
    setMenuVisible(false);
    setProduccionesVisible(true);
    setIntranetVisible(false); // Al mostrar las producciones, oculta Intranet
  };

  const ocultarMenuVertical = () => {
    setMenuVisible(false);
    setProduccionesVisible(false);
    setIntranetVisible(false); // Al ocultar el menú vertical, oculta Intranet
  };

  const toggleMenuButton = () => {
    if (produccionesVisible) {
      ocultarMenuVertical();
      setMenuVisible(true);
    } else if (menuVisible) {
      toggleHeaderPrincipal();
    } else {
      setProduccionesVisible(false);
      setMenuVisible(true);
    }
  };

  const mostrarAccesoUsuarios = () => { 
    // esta condicion cmabaira cuando el login este hecho
    setIntranetVisible(true); // Al mostrar Intranet, asegúrate de que esté visible
  };

  return (
    <div id="menuVertical" className={`MenuVertical bg-dark text-white py-4 mb-0 position-fixed ${menuVisible ? 'visible' : ''}`}>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div id="menuPrincipal" className={`col-8 ${!produccionesVisible ? 'visible' : 'oculto'}`}>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => mostrarSeccion('inicio')}>Inicio</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={mostrarProducciones}>Producciones</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>Dónde Estamos</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>FAQ</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>Opiniones</div>
            </div>
            <div className="mb-1 d-flex">
              {intranetVisible && <div className="Texto ms-0 ms-2 BotonTexto" onClick={mostrarIntranet}>Intranet</div>}
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto Intranet" onClick={mostrarAccesoUsuarios}>Acceso usuarios</div>
            </div>
          </div>
          <div id="producciones" className={`col-md-9 col-sm-12 ${produccionesVisible ? 'visible' : 'oculto'}`}>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>El Rey Leon</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>Mamma Mia</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>Jesucristo SuperStar</div>
            </div>
            <div className="mb-1 d-flex">
              <div className="Texto ms-0 ms-2 BotonTexto" onClick={() => toggleHeaderPrincipal()}>Grease</div>
            </div>
          </div>
          <div className="col-4 d-flex align-items-start">
            <button id="toggleMenuButton" className="btn btn-link p-0" onClick={toggleMenuButton}>
              <span className="mdi mdi-arrow-left-bold-circle-outline LogoVuelta"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrincipal;
