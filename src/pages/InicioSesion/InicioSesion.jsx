import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import Registro from '../Registro/Registro';
import './InicioSesion.css';
import RecuperarContra from './RecuperarContra.jsx';
import axios from 'axios';
import apiUrl from '../../config';

const LoginModal = ({ show, handleClose, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistroModal, setShowRegistroModal] = useState(false);
    const [showRecuperarContraModal, setShowRecuperarContraModal] = useState(false);
    const [error, setError] = useState('');

    // Función para limpiar los campos cuando se abre la modal
    const limpiarCampos = () => {
        setEmail('');
        setPassword('');
        setError('');
    };

    // Efecto para limpiar campos cuando cambia la visibilidad de la modal
    useEffect(() => {
        if (show) {
            limpiarCampos();
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                email,
                password
            });

            //Mostrar opcion Intranet
            handleLogin();
            // Cerrar la modal de login
            handleClose();
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message); // Mostrar mensaje de error del servidor
            } else {
                setError('Error en el inicio de sesión'); // Mensaje genérico de error
            }
        }
    };

    const handleShowRegistroModal = () => {
        setShowRegistroModal(true); // Muestra la modal de registro
    };

    const handleCloseRegistroModal = () => {
        setShowRegistroModal(false); // Oculta la modal de registro
    };

    const handleShowRecuperarContraModal = () => {
        setShowRecuperarContraModal(true);
    };

    const handleCloseRecuperarContraModal = () => {
        setShowRecuperarContraModal(false);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="modal-header-custom">
                    {/* Botón de cerrar (X) en la esquina superior derecha */}
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="modal-title mb-5">Iniciar Sesión</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail" className="mb-4 form-group-horizontal">
                            <h2>Email: </h2>
                            <Form.Control
                                type="email"
                                placeholder="Introduce tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword" className="mb-5 form-group-horizontal">
                            <h2>Contraseña: </h2>
                            <Form.Control
                                type="password"
                                placeholder="Introduce tu contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="danger" type="submit" className="button mb-4">
                                Iniciar Sesión
                            </Button>
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <div className="mb-2">
                                <a className="text-decoration-none pointer" onClick={handleShowRecuperarContraModal}>¿Has olvidado tu contraseña?</a>
                            </div>
                            <div>
                                <a className="text-decoration-none pointer" onClick={handleShowRegistroModal}>¿Es tu primera vez? REGÍSTRATE</a>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* Modal de Registro */}
            <Registro show={showRegistroModal} handleClose={handleCloseRegistroModal} />
            <RecuperarContra show={showRecuperarContraModal} handleClose={handleCloseRecuperarContraModal} />
        </>
    );
};

export default LoginModal;