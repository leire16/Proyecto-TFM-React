import React, { useState } from 'react';
import './HeaderPrincipal.css';

const HeaderPrincipal = ({ toggleHeaderPrincipal, onMostrarSeccion, cambiarSeccionConParametros }) => {
  const [subProduccionesVisible, setSubProduccionesVisible] = useState(false);
  const [subSubProduccionVisible, setSubSubProduccionVisible] = useState({});
  const [intranetVisible, setIntranetVisible] = useState(false); // Estado inicial oculto

  const mostrarSeccion = (seccion) => {
    toggleHeaderPrincipal();
    onMostrarSeccion(seccion);
  };

  const toggleSubProducciones = () => {
    setSubProduccionesVisible(!subProduccionesVisible);
  };

  const handleProduccionClick = (produccion) => {
    // Verificar si la subproducción ya está abierta
    const isSubProduccionVisible = subSubProduccionVisible[produccion];
    const updatedState = { ...subSubProduccionVisible };
  
    // Cerrar todas las subproducciones y subsubproducciones
    Object.keys(updatedState).forEach((key) => {
      updatedState[key] = false;
    });
  
    // Si la subproducción no estaba abierta, abrir la subproducción actual
    if (!isSubProduccionVisible) {
      updatedState[produccion] = true;
    }
  
    setSubSubProduccionVisible(updatedState);
  };
  
  const handleImageClick = (apartado,nombreProduccion) => {
    cambiarSeccionConParametros(apartado, nombreProduccion);
    toggleHeaderPrincipal();
  };

  const toggleMenuButton = () => {
    toggleHeaderPrincipal();
  };

  const mostrarAccesoUsuarios = () => {
    // esta condicion cambiara cuando el login este hecho
    setIntranetVisible(true); // Al mostrar Intranet, asegúrate de que esté visible
  };

  return (
    <div id="menuVertical" className='MenuVertical bg-dark text-white py-4 mb-0 position-fixed'>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className={`col-10 col-md-9 flex-column`}>
            <div id="menuPrincipal" className="visible">
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('inicio')}>Inicio</div>
              </div>
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer" onClick={toggleSubProducciones}>
                  Producciones {subProduccionesVisible ? <i className="mdi mdi-chevron-down"></i> : <i className="mdi mdi-chevron-right"></i>}
                </div>
              </div>
              {subProduccionesVisible && (
                <ul id="producciones" className="list-unstyled ms-3">
                  {['El Rey León', 'La Sirenita', 'Jesucristo SuperStar', 'Grease'].map((produccion) => (
                    <li key={produccion}>
                      <div className="mb-1 d-flex">
                        <div className="Texto ms-0 ms-2 pointer subapartado" onClick={() => handleProduccionClick(produccion)}>
                          {produccion} {subSubProduccionVisible[produccion] && <i className="mdi mdi-chevron-down"></i>}
                          {!subSubProduccionVisible[produccion] && <i className="mdi mdi-chevron-right"></i>}
                        </div>
                      </div>
                      {subSubProduccionVisible[produccion] && (
                        <ul className="list-unstyled ms-3">
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('sinopsis',produccion)}>Sinopsis</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick( 'elenco', produccion)}>Elenco</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('canciones', produccion)}>Canciones</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('equipoCreativo', produccion)}>Equipo Creativo</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('programa-de-mano', produccion)}>Programa de Mano</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('galeria', produccion)}>Galería de Imágenes</div>
                          </li>
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('dondeEstamos')}>Dónde Estamos</div>
              </div>
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('faq')}>FAQ</div>
              </div>
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('opiniones')}>Opiniones</div>
              </div>
              <div className="mb-1 d-flex">
                {intranetVisible && <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('intranet')}>Intranet</div>}
              </div>
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer Intranet" onClick={mostrarAccesoUsuarios}>Acceso usuarios</div>
              </div>
            </div>
          </div>
          <div className="col-2 col-md-3 d-flex align-items-start">
            <button id="toggleMenuButton" className="btn btn-link p-0" onClick={toggleMenuButton}>
              <span className="mdi mdi-close LogoVuelta"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPrincipal;
