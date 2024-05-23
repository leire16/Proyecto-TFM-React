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
                        <h1 className="AskartzaMartxa">Askartza Martxa</h1>
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