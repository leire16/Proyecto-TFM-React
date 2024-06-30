import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import './Registro.css';

const Registro = ({ show, handleClose }) => {
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // Función para limpiar los campos cuando se abre la modal
    const limpiarCampos = () => {
        setNombre('');
        setApellidos('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    };

    // Efecto para limpiar campos cuando cambia la visibilidad de la modal
    useEffect(() => {
        if (show) {
            limpiarCampos();
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let formErrors = [];

        // Validar que al menos uno de los campos esté lleno
        if (!nombre && !apellidos && !email && !password && !confirmPassword) {
            formErrors.push('Todos los campos son obligatorios');
        } else {
            // Validar cada campo individualmente
            if (!nombre) {
                formErrors.push('El campo Nombre es obligatorio');
            }
            if (!apellidos) {
                formErrors.push('El campo Apellidos es obligatorio');
            }
            if (!email) {
                formErrors.push('El campo Email es obligatorio');
            } else {
                // Validar formato de email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    formErrors.push('El email ingresado no es válido');
                }
            }
            if (!password) {
                formErrors.push('El campo Contraseña es obligatorio');
            } else {
                // Validar restricciones de contraseña (ejemplo: longitud mínima, complejidad)
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

            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                formErrors.push('Las contraseñas no coinciden');
            }
        }

        // Mostrar errores si los hay
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        // Aquí puedes implementar la lógica de registro de usuarios
        console.log('Formulario de registro enviado:', nombre, apellidos, email, password);
        // Lógica adicional de registro...
        // Puedes cerrar la modal después de registrar al usuario
        handleClose();
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
                    <Form.Group controlId="formBasicPassword" className="mb-4 form-group-horizontal">
                        <h2>Contraseña: </h2>
                        <Form.Control
                            type="password"
                            placeholder="Introduce tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicConfirmPassword" className="mb-4 form-group-horizontal">
                        <h2>Repetir Contraseña: </h2>
                        <Form.Control
                            type="password"
                            placeholder="Repite tu contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="off"
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
