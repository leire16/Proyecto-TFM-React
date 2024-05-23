import React from 'react';
import './Footer.css';

const Footer = ({ onMostrarAvisoLegal, onMostrarPoliticaPrivacidad, onMostrarPoliticaCookies }) => {
  return (
    <footer>
      <div className="text-white py-4 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 center">
              <div className="Titulo mb-2 text-start text-md-start text-center">CONTACTO</div>
              <div className="mb-1 d-flex align-items-center justify-content-start justify-content-md-start justify-content-center">
                <span className="mdi mdi-google-maps me-2 IconoUbicacion"></span>
                <div className="TextoUbicacion ms-1">Sarriena Auzoa, 173, 48940 Leioa, Vizcaya</div>
              </div>
              <div className="mb-1 d-flex align-items-center justify-content-start justify-content-md-start justify-content-center">
                <span className="mdi mdi-email me-2 IconoMail"></span>
                <div className="TextoMail ms-1">askartzamartxa@gmail.com</div>
              </div>
            </div>

            <div className="col-md-6 col-sm-12 mb-between-rows">
              <div className="Titulo mb-2 text-center">REDES SOCIALES</div>
              <div className="mb-1 d-flex justify-content-center">
                <a href="https://www.instagram.com/claretaskartza/" target="_blank" className="mx-3">
                  <span className="mdi mdi-instagram LogoInstagram"></span>
                </a>
                <a href="https://twitter.com/ClaretAskartza" target="_blank" className="mx-3">
                  <span className="mdi mdi-twitter LogoTwitter"></span>
                </a>
                <a href="https://www.facebook.com/pages/Askartza-Claret/359075060853931" target="_blank" className="mx-3">
                  <span className="mdi mdi-facebook LogoFacebook"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-white py-2 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-12 text-center">
              <div className="Avisos ms-0 pointer" onClick={onMostrarAvisoLegal}>Aviso Legal</div>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
              <div className="Avisos ms-0 pointer" onClick={onMostrarPoliticaPrivacidad}>Política de Privacidad</div>
            </div>
            <div className="col-md-4 col-sm-12 text-center">
              <div className="Avisos ms-0 pointer" onClick={onMostrarPoliticaCookies}>Política de Cookies</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col text-center">
              <div className="Copyright">Copyright © 2024 Askartza Martxa. Todos los derechos reservados</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;