import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Registro.css';
import apiUrl from '../../config';

const Registro = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [codigo, setCodigo] = useState('');
    const [confirmContraseña, setConfirmContraseña] = useState('');
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState('');

    const limpiarCampos = () => {
        setNombre('');
        setApellidos('');
        setEmail('');
        setContraseña('');
        setCodigo('');
        setConfirmContraseña('');
        setErrors([]);
        setSuccess('');
    };

    useEffect(() => {
        if (show) {
            limpiarCampos();
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let formErrors = [];

        if (!nombre && !apellidos && !email && !contraseña && !confirmContraseña) {
            formErrors.push('Todos los campos son obligatorios');
        } else {
            if (!nombre) {
                formErrors.push('El campo Nombre es obligatorio');
            }
            if (!apellidos) {
                formErrors.push('El campo Apellidos es obligatorio');
            }
            if (!email) {
                formErrors.push('El campo Email es obligatorio');
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    formErrors.push('El email ingresado no es válido');
                }
            }
            if (!contraseña) {
                formErrors.push('El campo Contraseña es obligatorio');
            } else {
                if (contraseña.length < 8) {
                    formErrors.push('La contraseña debe tener al menos 8 caracteres');
                }

                const uppercaseRegex = /[A-Z]/;
                const lowercaseRegex = /[a-z]/;
                const numberRegex = /[0-9]/;

                if (!uppercaseRegex.test(contraseña)) {
                    formErrors.push('La contraseña debe incluir al menos una letra mayúscula');
                }

                if (!lowercaseRegex.test(contraseña)) {
                    formErrors.push('La contraseña debe incluir al menos una letra minúscula');
                }

                if (!numberRegex.test(contraseña)) {
                    formErrors.push('La contraseña debe incluir al menos un número');
                }
            }

            if (!confirmContraseña) {
                formErrors.push('Debe repetir la contraseña');
            }

            if (contraseña !== confirmContraseña) {
                formErrors.push('Las contraseñas no coinciden');
            }

            if (!codigo) {
                formErrors.push('El campo Código es obligatorio y solo lo saben los miembros del grupo de teatro');
            } else if (codigo !== '2897') {
                formErrors.push('El código proporcionado es incorrecto o no válido para miembros del grupo');
            }           
        }

        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                nombre,
                apellidos,
                email,
                contraseña,
                codigo,
                fecha_registro: new Date() // Enviar la fecha actual
            });            

            setSuccess('Usuario registrado exitosamente');
            setErrors([]);

            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data.message) {
                setErrors([error.response.data.message]);
            } else {
                setErrors(['Error en el registro']);
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal-width">
            <Modal.Header className="modal-header-custom">
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <h1 className="modal-title mb-5">Registro de Usuario</h1>
                {errors.length > 0 && (
                    <Alert variant="danger">
                        <ul>
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </Alert>
                )}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group controlId="formBasicNombre" className="mb-4 form-group-horizontal">
                        <h2>Nombre: </h2>
                        <Form.Control
                            type="text"
                            placeholder="Introduce tu nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicApellidos" className="mb-4 form-group-horizontal">
                        <h2>Apellidos: </h2>
                        <Form.Control
                            type="text"
                            placeholder="Introduce tus apellidos"
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                        />
                    </Form.Group>
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
                    <Form.Group controlId="formBasicContraseña" className="mb-4 form-group-horizontal">
                        <h2>Contraseña: </h2>
                        <Form.Control
                            type="password"
                            placeholder="Introduce tu contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmContraseña" className="mb-4 form-group-horizontal">
                        <h2>Repetir Contraseña: </h2>
                        <Form.Control
                            type="password"
                            placeholder="Repite tu contraseña"
                            value={confirmContraseña}
                            onChange={(e) => setConfirmContraseña(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCodigo" className="mb-4 form-group-horizontal">
                        <h2>Código: </h2>
                        <Form.Control
                            type="codigo"
                            placeholder="Introduce el Código de teatro"
                            value={codigo}
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                    </Form.Group>
                    <div className="text-center">
                        <Button variant="danger" type="submit" className="button mb-4">
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default Registro;
