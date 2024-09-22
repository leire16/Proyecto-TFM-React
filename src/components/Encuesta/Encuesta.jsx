import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Usaremos axios para hacer peticiones HTTP
import './Encuesta.css';
import apiUrl from '../../config';

const Encuesta = ({ onSubmit }) => {
    const [formulario, setFormulario] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        asunto: '',
        musical: '', // Inicializar musical como una cadena vacía
        numEstrellas: 0,
        opinion: ''
    });

    const [errores, setErrores] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        asunto: '',
        numEstrellas: '',
        opinion: ''
    });

    const [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [musicales, setMusicales] = useState([]); // Estado para guardar los musicales desde la BD
    const [mostrarDesplegable, setMostrarDesplegable] = useState(false); // Estado para controlar la visibilidad del desplegable

    useEffect(() => {
        const obtenerMusicales = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/musicales`);
                setMusicales(response.data);
            } catch (error) {
                console.error('Error al obtener los musicales:', error);
            }
        };

        obtenerMusicales();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });

        validarCampo(name, value);
    };

    const validarCampo = (campo, valor) => {
        let mensajeError = '';
        switch (campo) {
            case 'nombre':
                mensajeError = valor ? '' : 'El nombre es obligatorio.';
                break;
            case 'apellidos':
                mensajeError = valor ? '' : 'Los apellidos son obligatorios.';
                break;
            case 'email':
                mensajeError = valor ? (validateEmail(valor) ? '' : 'Por favor, introduce un email válido.') : 'El email es obligatorio.';
                break;
            case 'asunto':
                mensajeError = valor ? '' : 'El asunto es obligatorio.';
                break;
            case 'opinion':
                mensajeError = valor ? '' : 'La opinión es obligatoria.';
                break;
            default:
                break;
        }
        setErrores({
            ...errores,
            [campo]: mensajeError
        });
    };

    const handleStarClick = (valor) => {
        setFormulario({
            ...formulario,
            numEstrellas: valor
        });
        setErrores({
            ...errores,
            numEstrellas: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { nombre, apellidos, email, asunto, opinion, numEstrellas, musical } = formulario;

        const erroresFormulario = {};

        // Validar cada campo
        if (!nombre) {
            erroresFormulario.nombre = "El nombre es obligatorio.";
        }
        if (!apellidos) {
            erroresFormulario.apellidos = "Los apellidos son obligatorios.";
        }
        if (!email) {
            erroresFormulario.email = "El email es obligatorio.";
        } else if (!validateEmail(email)) {
            erroresFormulario.email = "Por favor, introduce un email válido.";
        }
        if (!asunto) {
            erroresFormulario.asunto = "El asunto es obligatorio.";
        }
        if (!opinion) {
            erroresFormulario.opinion = "La opinión es obligatoria.";
        }
        if (!numEstrellas) {
            erroresFormulario.numEstrellas = "La valoración es obligatoria.";
        }

        // Mostrar errores acumulados
        setErrores(erroresFormulario);

        // Verificar si hay errores
        if (Object.values(erroresFormulario).some((error) => error !== '')) {
            // Si hay errores, no enviar el formulario
            return;
        }

        // Preparar objeto a enviar
        const dataToSend = {
            nombre,
            apellidos,
            email,
            asunto,
            opinion,
            numEstrellas
        };

        // Añadir musical solo si está definido
        if (musical) {
            dataToSend.musical = musical;
        }

        // Enviar formulario al backend
        try {
            const response = await fetch(`${apiUrl}/api/opiniones/crear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('Error al enviar la opinión');
            }

            // Limpiar formulario después de enviar
            setFormulario({
                nombre: '',
                apellidos: '',
                email: '',
                asunto: '',
                musical: '',
                numEstrellas: 0,
                opinion: ''
            });

            // Mostrar mensaje de formulario enviado correctamente
            setMensajeEnviado(true);

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                setMensajeEnviado(false);
            }, 3000);

            // Llamar a la función de callback para actualizar las opiniones en Opinion.js
            onSubmit({
                nombre,
                apellidos,
                email,
                asunto,
                musical,
                numEstrellas,
                opinion
            });
        } catch (error) {
            console.error('Error al enviar la opinión:', error);
            // Manejar el error (mostrar mensaje, etc.)
        }
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const toggleDesplegable = () => {
        setMostrarDesplegable(!mostrarDesplegable); // Alternar entre mostrar y ocultar el desplegable
    };

    const seleccionarMusical = (titulo) => {
        setFormulario({ ...formulario, musical: titulo });
        setErrores({ ...errores, musical: '' });
        setMostrarDesplegable(false); // Ocultar el desplegable al seleccionar una opción
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Row para Nombre, Apellidos, Email */}
            <div className='row mb-4'>
                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <label htmlFor='nombre'>
                        <h5 className='mb-4'>Nombre <span className='text-danger'>*</span></h5>
                    </label>
                    <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        maxLength='50'
                        value={formulario.nombre}
                        onChange={handleInputChange}
                        onBlur={() => validarCampo('nombre', formulario.nombre)}
                        className='form-control mb-2'
                    />
                    {errores.nombre && <div className='text-danger mb-4'>{errores.nombre}</div>}
                </div>

                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <label htmlFor='apellidos'>
                        <h5 className='mb-4'>Apellidos <span className='text-danger mb-3'>*</span></h5>
                    </label>
                    <input
                        type='text'
                        id='apellidos'
                        name='apellidos'
                        maxLength='50'
                        value={formulario.apellidos}
                        onChange={handleInputChange}
                        onBlur={() => validarCampo('apellidos', formulario.apellidos)}
                        className='form-control mb-2'
                    />
                    {errores.apellidos && <div className='text-danger mb-4'>{errores.apellidos}</div>}
                </div>

                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <label htmlFor='email'>
                        <h5 className='mb-4'>Email <span className='text-danger mb-3'>*</span></h5>
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        maxLength='100'
                        value={formulario.email}
                        onChange={handleInputChange}
                        onBlur={() => validarCampo('email', formulario.email)}
                        className='form-control mb-2'
                    />
                    {errores.email && <div className='text-danger '>{errores.email}</div>}
                </div>
            </div>

            {/* Row para Asunto y Musical */}
            <div className='row mb-4'>
                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <label htmlFor='asunto'>
                        <h5 className='mb-4'>Asunto <span className='text-danger'>*</span></h5>
                    </label>
                    <input
                        type='text'
                        id='asunto'
                        name='asunto'
                        maxLength='100'
                        value={formulario.asunto}
                        onChange={handleInputChange}
                        onBlur={() => validarCampo('asunto', formulario.asunto)}
                        className='form-control mb-2'
                    />
                    {errores.asunto && <div className='text-danger mb-4'>{errores.asunto}</div>}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <label htmlFor='musical'>
                        <h5 className='mb-4'>Musical</h5>
                    </label>
                    <div className='dropdown'>
                        <button
                            className='btn btn-secondary dropdown-toggle text-start mb-2'
                            type='button'
                            onClick={toggleDesplegable}
                        >
                            {formulario.musical || 'Selecciona un Musical'}
                            <i className='bi bi-caret-down-fill float-end'></i>
                        </button>
                        <div className={`dropdown-menu ${mostrarDesplegable ? 'show' : ''}`}>
                            {musicales.map((musical) => (
                                <a
                                    key={musical.id}
                                    className='dropdown-item'
                                    onClick={() => seleccionarMusical(musical.titulo)}
                                >
                                    {musical.titulo}
                                </a>
                            ))}
                        </div>
                        {errores.musical && <div className='text-danger mb-4'>{errores.musical}</div>}
                    </div>
                </div>
            </div>

            {/* Row para Valoración General */}
            <div className='row mb-4'>
                <div className='col'>
                    <label>
                        <h5 className='mb-4'>Valoración General <span className='text-danger mb-2'>*</span></h5>
                    </label>
                    <div className='star-rating mb-2'>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${formulario.numEstrellas >= star ? 'selected' : ''}`}
                                onClick={() => handleStarClick(star)}
                            >
                                &#9733;
                            </span>
                        ))}
                    </div>
                    {errores.numEstrellas && <div className='text-danger mb-4'>{errores.numEstrellas}</div>}
                </div>
            </div>

            {/* Row para Opinión */}
            <div className='row mb-4'>
                <div className='col'>
                    <label htmlFor='opinion'>
                        <h5 className='mb-4'>Opinión <span className='text-danger'>*</span></h5>
                    </label>
                    <textarea
                        id='opinion'
                        name='opinion'
                        maxLength='1000'
                        value={formulario.opinion}
                        onChange={handleInputChange}
                        onBlur={() => validarCampo('opinion', formulario.opinion)}
                        className='form-control mb-2 textarea-grande'
                    />
                    {errores.opinion && <div className='text-danger mb-4'>{errores.opinion}</div>}
                </div>
            </div>

            {/* Row para Botón Enviar */}
            <div className='row mb-4'>
                <div className='col text-end'>
                    <button type='submit' className='button btn btn-danger'>
                        Enviar
                    </button>
                </div>
            </div>

            {/* Mensaje de Envío */}
            {mensajeEnviado && (
                <div className='row mt-4 mb-4'>
                    <div className='col'>
                        <div className='alert alert-success' role='alert'>
                            Opinión enviada correctamente
                        </div>
                    </div>
                </div>
            )}
        </form>
    );
};

export default Encuesta;
