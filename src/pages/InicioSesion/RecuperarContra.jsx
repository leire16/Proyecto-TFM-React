import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './InicioSesion.css';
import apiUrl from '../../config';

const RecuperarContra = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const limpiarCampos = () => {
        setEmail('');
        setErrors([]);
        setMessage('');
        setPassword('');
        setConfirmPassword('');
    };

    useEffect(() => {
        if (!show) {
            limpiarCampos();
            setShowPasswordModal(false);
        }
    }, [show]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();

        const emailErrors = [];

        if (!email) {
            emailErrors.push('El campo Email es obligatorio');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailErrors.push('El email ingresado no es válido');
        }

        if (emailErrors.length > 0) {
            setErrors(emailErrors);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/password/verify-email`, { email });
            setMessage(response.data.message);
            setErrors([]);
            if (response.data.exists) {
                setShowPasswordModal(true);
            } else {
                setErrors(['El email ingresado no existe']);
            }
        } catch (error2) {
            if (error2.response && error2.response.data.message) {
                setErrors([error2.response.data.message]);
            } else {
                setErrors(['Hubo un problema al verificar el email']);
            }
            setMessage('');
        }
    };

    const validatePassword = (password, confirmPassword) => {
        const formErrors = [];

        if (!password) {
            formErrors.push('El campo Contraseña es obligatorio');
        } else {
            if (password.length < 8) {
                formErrors.push('La contraseña debe tener al menos 8 caracteres');
            }

            const uppercaseRegex = /[A-Z]/;
            const lowercaseRegex = /[a-z]/;
            const numberRegex = /[0-9]/;

            if (!uppercaseRegex.test(password)) {
                formErrors.push('La contraseña debe incluir al menos una letra mayúscula');
            }

            if (!lowercaseRegex.test(password)) {
                formErrors.push('La contraseña debe incluir al menos una letra minúscula');
            }

            if (!numberRegex.test(password)) {
                formErrors.push('La contraseña debe incluir al menos un número');
            }
        }

        if (!confirmPassword) {
            formErrors.push('Debe repetir la contraseña');
        }

        if (password !== confirmPassword) {
            formErrors.push('Las contraseñas no coinciden');
        }

        return formErrors;
    };

    const handlePasswordSubmit = async (e, email) => {
        e.preventDefault();

        const formErrors = validatePassword(password, confirmPassword);
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/password/reset-password', { email, password });
            setMessage(response.data.message);
            setErrors([]);
            handleClose(); // Cerrar la modal después de restablecer la contraseña
        } catch (error2) {
            if (error2.response && error2.response.data.message) {
                setErrors([error2.response.data.message]);
            } else {
                setErrors(['Hubo un problema al restablecer la contraseña']);
            }
            setMessage('');
        }
    };

    return (
        <>
            <Modal show={show && !showPasswordModal} onHide={handleClose} centered>
                <Modal.Header className="modal-header-custom">
                    <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </Modal.Header>
                <Modal.Body>
                    <h1 className="modal-title mb-5">Recuperar Contraseña</h1>
                    {errors.length > 0 && (
                        <Alert variant="danger">
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </Alert>
                    )}
                    {message && (
                        <Alert variant="success" className="mb-3">
                            {message}
                        </Alert>
                    )}
                    <Form onSubmit={handleEmailSubmit} noValidate>
                        <Form.Group controlId="formBasicEmail" className="mb-4 form-group-horizontal">
                            <h2>Email: </h2>
                            <Form.Control
                                type="email"
                                placeholder="Introduce tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="off"
                            />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="danger" type="submit" className="button mb-4">
                                Siguiente
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            {showPasswordModal && (
                <Modal show={showPasswordModal} onHide={handleClose} centered>
                    <Modal.Header className="modal-header-custom">
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </Modal.Header>
                    <Modal.Body>
                        <h1 className="modal-title mb-5">Restablecer Contraseña</h1>
                        {errors.length > 0 && (
                            <Alert variant="danger">
                                <ul>
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </Alert>
                        )}
                        <Form onSubmit={(e) => handlePasswordSubmit(e, email)} noValidate>
                            <Form.Group controlId="formBasicPassword" className="mb-4 form-group-horizontal">
                                <h2>Contraseña: </h2>
                                <Form.Control
                                    type="password"
                                    placeholder="Introduce tu nueva contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPasswordConfirm" className="mb-4 form-group-horizontal">
                                <h2>Repetir Contraseña: </h2>
                                <Form.Control
                                    type="password"
                                    placeholder="Repite tu nueva contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="danger" type="submit" className="button mb-4">
                                    Enviar
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default RecuperarContra;
