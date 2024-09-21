import React, { useState, useEffect } from 'react';
import CancionCard from '../../components/Cards/CancionCard';
import apiUrl from '../../config';

const Canciones = ({ parametros }) => {
  const { nombreProduccion } = parametros;

  // Estados para manejar los datos y el estado de carga
  const [canciones, setCanciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener canciones desde la API
    const obtenerCanciones = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/canciones/${nombreProduccion}`);

        if (response.status !== 200) {
          throw new Error(`Error al obtener las canciones. Estado: ${response.status}`);
        }

        // Convierte la respuesta a JSON
        const cancionDesdeAPI = await response.json();

        if (!cancionDesdeAPI || cancionDesdeAPI.length === 0) {
          throw new Error('No se encontraron las canciones para mostrar');
        }

        setCanciones(cancionDesdeAPI);
      } catch (error) {
        console.error('Error al obtener las canciones:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerCanciones();
  }, [nombreProduccion]);

  // Mensajes de carga y error
  if (loading) {
    return (
      <div className='container'>
        <p>Cargando canciones...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <p>Error: {error}</p>
      </div>
    );
  }

  // Comprobar si se encontraron canciones
  if (!canciones || canciones.length === 0) {
    return (
      <div className='container'>
        <p>No se encontraron canciones para la producción {nombreProduccion}.</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Canciones - {nombreProduccion}</h1>
      <div className="canciones-grid">
        {canciones.map((cancion) => (
          <CancionCard
            key={cancion._id}
            titulo={cancion.titulo}
            interpretes={cancion.detalles.map(detalle => detalle.personaje_id ? detalle.personaje_id.nombre : '').join(', ')}
            duracion={cancion.duracion}
            url={cancion.url}
            detalle={cancion.detalles}
          />
        ))}
      </div>
    </div>
  );
};

export default Canciones;