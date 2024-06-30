import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import './InicioSesion.css';

const RecuperarContra = ({ show, handleClose }) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    // Función para limpiar los campos del formulario
    const limpiarCampos = () => {
        setEmail('');
        setError('');
    };

    // Efecto para limpiar campos cuando cambia la visibilidad de la modal
    useEffect(() => {
        if (!show) {
            limpiarCampos();
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError('El campo Email es obligatorio');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El email ingresado no es válido');
            return;
        }

        // Aquí iría la lógica para enviar el email de recuperación
        console.log('Email para recuperación:', email);
        // Simulación de lógica de envío de email...

        // Cerrar la modal después de enviar el email de recuperación
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header className="modal-header-custom">
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <h1 className="modal-title mb-5">Recuperar Contraseña</h1>
                {error && (
                    <Alert variant="danger" className="mb-3">
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit} noValidate>
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
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RecuperarContra;
