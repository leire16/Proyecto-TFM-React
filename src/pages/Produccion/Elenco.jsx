import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ElencoCard from '../../components/Cards/ElencoCard';

const Elenco = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    const [elencoProduccion, setElencoProduccion] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerElenco = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/elenco/${nombreProduccion}`);

                if (response.status !== 200) {
                    throw new Error(`Error al obtener el elenco. Estado: ${response.status}`);
                }

                const elencosDesdeAPI = response.data;

                if (!elencosDesdeAPI || elencosDesdeAPI.length === 0) {
                    throw new Error('No se encontró elenco para mostrar');
                }
                
                setElencoProduccion(elencosDesdeAPI);
            } catch (error) {
                setError('No se pudo obtener el elenco.');
                console.error('Error en la solicitud del elenco:', error);
            }
        };

        obtenerElenco();
    }, [nombreProduccion]);

    if (error) {
        return (
            <div className='container'>
                <p>{error}</p>
            </div>
        );
    }

    // Agrupar por secciones
    const secciones = elencoProduccion.reduce((acc, item) => {
        const { seccion } = item.personaje_id; // Usa `seccion` del `personaje_id`
        if (!acc[seccion]) {
            acc[seccion] = [];
        }
        acc[seccion].push(item);
        return acc;
    }, {});

    return (
        <div className='container'>
            <h1 className="mb-5 uppercase">Elenco - {nombreProduccion}</h1>

            {/* Itera sobre las claves del objeto secciones */}
            {Object.keys(secciones).map((seccion, index) => (
                <div key={index} className={getMarginClass(seccion)}>
                    <h2 className={getTitleMarginClass(seccion)}>{seccion}</h2>
                    {seccion === "Actores Principales" ? (
                        // Si es "Actores Principales", usa ElencoCard y muestra en una sola columna
                        secciones[seccion].map((item, index) => (
                            <ElencoCard
                                key={index}
                                seccion={seccion}
                                personaje={item.personaje_id.nombre}
                                imagen={item.personaje_id.imagen_url}
                                persona={item.persona_id}
                                descripcion={item.personaje_id.descripcion}
                            />
                        ))
                    ) : seccion === "Actores Secundarios" ? (
                        // Si es "Actores Secundarios", muestra dos actores por fila
                        <div className="row">
                            {chunkArray(secciones[seccion], 2).map((row, rowIndex) => (
                                <div key={rowIndex} className="row">
                                    {row.map((item, index) => (
                                        <div key={index} className="col-md-6">
                                            <ElencoCard
                                                seccion={seccion}
                                                personaje={item.personaje_id.nombre}
                                                imagen={item.personaje_id.imagen_url}
                                                persona={item.persona_id}
                                                descripcion={item.personaje_id.descripcion}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Para otras secciones, muestra todos los nombres y apellidos en una sola línea
                        <p>
                            {secciones[seccion].map((item, index) => (
                                `${item.persona_id.nombre} ${item.persona_id.apellido1}`
                            )).reduce((acc, curr, idx) => (
                                acc + (idx > 0 ? ', ' : '') + curr
                            ), '')}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

// Función para dividir un array en subarrays de tamaño dado
function chunkArray(array, size) {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
        chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
}

// Función para obtener la clase de margen adecuada según la sección
function getMarginClass(seccion) {
    if (seccion === "Actores Principales") {
        return "mb-4";
    } else if (seccion === "Actores Secundarios") {
        return "mt-4 mb-3";
    } else {
        return "mt-4 mb-3";
    }
}

// Función para obtener la clase de margen del título según la sección
function getTitleMarginClass(seccion) {
    if (seccion === "Actores Principales" || seccion === "Actores Secundarios") {
        return "mt-5 mb-5";
    } else {
        return "mb-4 mt-5";
    }
}

export default Elenco;