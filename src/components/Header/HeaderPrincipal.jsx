import React, { useState, useEffect } from 'react';
import './HeaderPrincipal.css';
import InicioSesion from '../../pages/InicioSesion/InicioSesion.jsx';

const HeaderPrincipal = ({ toggleHeaderPrincipal, onMostrarSeccion, cambiarSeccionConParametros }) => {
  const [subProduccionesVisible, setSubProduccionesVisible] = useState(false);
  const [subSubProduccionVisible, setSubSubProduccionVisible] = useState({});
  const [intranetVisible, setIntranetVisible] = useState(false); // Estado inicial oculto
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para la autenticación
  const [obrasArray, setObrasArray] = useState([]);
  const [loading, setLoading] = useState(true);

  const mostrarSeccion = (seccion) => {
    toggleHeaderPrincipal();
    onMostrarSeccion(seccion);
  };

  const toggleSubProducciones = () => {
    setSubProduccionesVisible(!subProduccionesVisible);
  };

  const handleProduccionClick = (produccion) => {
    const isSubProduccionVisible = subSubProduccionVisible[produccion];
    const updatedState = { ...subSubProduccionVisible };

    Object.keys(updatedState).forEach((key) => {
      updatedState[key] = false;
    });

    if (!isSubProduccionVisible) {
      updatedState[produccion] = true;
    }

    setSubSubProduccionVisible(updatedState);
  };

  const handleImageClick = (apartado, nombreProduccion) => {
    if (apartado === 'programa') {
      descargarPrograma(nombreProduccion);
    } else {
      cambiarSeccionConParametros(apartado, nombreProduccion);
      toggleHeaderPrincipal();
    }
  };

  const toggleMenuButton = () => {
    toggleHeaderPrincipal();
  };

  const mostrarAccesoUsuarios = () => {
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Cambiar el estado a autenticado
    setIntranetVisible(true);
    setShowLoginModal(false); // Cerrar el modal de inicio de sesión
  };

  const handleLogout = () => {
    setIsAuthenticated(false); // Cambiar el estado a no autenticado
    setIntranetVisible(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const descargarPrograma = async (nombreProduccion) => {
    const obra = obrasArray.find(obra => obra.nombre === nombreProduccion);
    if (obra && obra.programa) {
      try {
        const response = await fetch(obra.programa);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${nombreProduccion}-programa.jpg`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar la imagen:', error);
      }
    }
  };

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/musicales');
        const data = await response.json();
        const obrasData = data.map(obras => ({
          nombre: obras.titulo,
          programa: obras.programa_url,
          fecha: new Date(obras.fecha)  // Convertir la fecha en objeto Date
        }));
        obrasData.sort((a, b) => b.fecha - a.fecha);
        setObrasArray(obrasData);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los musicales:', error);
        setLoading(false); // Asegúrate de actualizar el estado de carga incluso en caso de error
      }
    };
    fetchObras();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando...</p> {/* Puedes personalizar el indicador de carga aquí */}
      </div>
    );
  }

  return (
    <div id="menuVertical" className='MenuVertical bg-dark text-white py-4 mb-0 position-fixed'>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className={`col-lg-10 col-md-9 flex-column`}>
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
                  {obrasArray.map((obra) => (
                    <li key={obra.nombre}>
                      <div className="mb-1 d-flex">
                        <div className="Texto ms-0 ms-2 pointer subapartado" onClick={() => handleProduccionClick(obra.nombre)}>
                          {obra.nombre} {subSubProduccionVisible[obra.nombre] && <i className="mdi mdi-chevron-down"></i>}
                          {!subSubProduccionVisible[obra.nombre] && <i className="mdi mdi-chevron-right"></i>}
                        </div>
                      </div>
                      {subSubProduccionVisible[obra.nombre] && (
                        <ul className="list-unstyled ms-3">
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('sinopsis', obra.nombre)}>Sinopsis</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('elenco', obra.nombre)}>Elenco</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('canciones', obra.nombre)}>Canciones</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('equipoCreativo', obra.nombre)}>Equipo Creativo</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('programa', obra.nombre)}>Programa de Mano</div>
                          </li>
                          <li className="mb-1 d-flex">
                            <div className="Texto ms-0 ms-2 pointer subsubapartado" onClick={() => handleImageClick('galeria', obra.nombre)}>Galería de Imágenes</div>
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
                <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('opinion')}>Opiniones</div>
              </div>
              <div className="mb-1 d-flex">
                {intranetVisible && <div className="Texto ms-0 ms-2 pointer" onClick={() => mostrarSeccion('intranet')}>Intranet</div>}
              </div>
              <div className="mb-1 d-flex">
                <div className="Texto ms-0 ms-2 pointer Intranet" onClick={isAuthenticated ? handleLogout : mostrarAccesoUsuarios}>
                  {isAuthenticated ? 'Cerrar Sesión' : 'Inicio Sesión'}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 d-flex align-items-start">
            <button id="toggleMenuButton" className="btn btn-link p-0" onClick={toggleMenuButton}>
              <span className="mdi mdi-close LogoVuelta"></span>
            </button>
          </div>
        </div>
      </div>
      <InicioSesion show={showLoginModal} handleClose={handleCloseLoginModal} handleLogin={handleLogin} />
    </div>
  );
};

export default HeaderPrincipal;
