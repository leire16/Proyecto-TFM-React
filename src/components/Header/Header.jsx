import React, { useState } from 'react';
import './Header.css';
import HeaderPrincipal from './HeaderPrincipal';

const Header = ({ cambiarSeccion, cambiarSeccionConParametros }) => {
    const [showHeaderPrincipal, setShowHeaderPrincipal] = useState(false);

    const toggleHeaderPrincipal = () => {
        setShowHeaderPrincipal(!showHeaderPrincipal);
    };

    return (
        <div>
            <header id="home-section">
                <div className="d-flex align-items-center">
                    <div className="col d-flex justify-content-start">
                        <button className="btn btn-custom ms-3" >
                            <div className="Entradas">ENTRADAS</div>
                        </button>
                    </div>
                    <div className="col text-center">
                        <img 
                            src="https://res.cloudinary.com/dqq0xnj5b/image/upload/v1722336399/Askartza%20Martxa/logotipo.png" 
                            alt="Askartza Martxa Logo" 
                            className="AskartzaMartxa pointer"
                            onClick={() => cambiarSeccion('inicio')} 
                        />
                    </div>

                    <div className="col d-flex justify-content-end">
                        <button className="Hamburgesa btn" onClick={toggleHeaderPrincipal}>
                            <span className="mdi mdi-menu custom-icon"></span>
                        </button>
                    </div>
                </div>
            </header>
            {showHeaderPrincipal && <HeaderPrincipal toggleHeaderPrincipal={toggleHeaderPrincipal} onMostrarSeccion={cambiarSeccion} cambiarSeccionConParametros={cambiarSeccionConParametros} />}
        </div>
    );
};

export default Header;