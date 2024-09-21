import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EquipoCard from '../../components/Cards/EquipoCard';
import apiUrl from '../../config';

const EquipoCreativo = ({ parametros }) => {
  const { nombreProduccion } = parametros;
  const [equipoCreativo, setEquipoCreativo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerEquipoCreativo = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/equiposCreativos/${nombreProduccion}`);
        if (response.status !== 200) {
          throw new Error(`Error al obtener el equipo Creativo. Estado: ${response.status}`);
        }

        const equipoCreativoDesdeAPI = response.data;

        if (!equipoCreativoDesdeAPI || equipoCreativoDesdeAPI.length === 0) {
          throw new Error('No se encontró equipo creativo para mostrar');
        }

        // Agrupar personas por puesto creativo
        const agrupadoPorPuesto = equipoCreativoDesdeAPI.reduce((acc, item) => {
          const puesto = item.puesto_creativo_id.nombre;
          const persona = item.persona_id;

          if (!acc[puesto]) {
            acc[puesto] = [];
          }

          acc[puesto].push(persona);
          return acc;
        }, {});

        setEquipoCreativo(agrupadoPorPuesto);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener el equipo creativo:', error);
        setError('No se pudo obtener el equipo creativo.');
        setLoading(false);
      }
    };

    obtenerEquipoCreativo();
  }, [nombreProduccion]);

  if (loading) {
    return <div className='container'>Cargando...</div>;
  }

  if (error) {
    return (
      <div className='container'>
        <p>{error}</p>
      </div>
    );
  }

  if (Object.keys(equipoCreativo).length === 0) {
    return (
      <div className='container'>
        <p>No se encontró el equipo creativo para la producción {nombreProduccion}.</p>
      </div>
    );
  }

  // Determinar la estructura a usar según el tamaño de la pantalla
  const estructuraDispositvosPequeños = [
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 }
  ];

  const estructura = window.innerWidth <= 576 ? estructuraDispositvosPequeños : [
    { columnas: 1, filas: 1 }, 
    { columnas: 2 }, 
    { columnas: 2 },
    { columnas: 2 },
    { columnas: 2 },
    { columnas: 1, filas: 1 },
    { columnas: 1, filas: 1 }
  ];

  // Generar las filas y columnas para la tabla
  let index = 0;
  const rows = estructura.map((item, rowIndex) => (
    <tr key={rowIndex}>
      {[...Array(item.columnas)].map((_, colIndex) => {
        const colSpan = item.columnas === 1 ? 2 : 1; 
        const tdStyle = 'full-width-column'; // Estilo de la celda
        const paddingClass = 'px-4'; // Clase de padding horizontal para todas las celdas

        if (index < Object.keys(equipoCreativo).length) {
          const puesto = Object.keys(equipoCreativo)[index];
          const personas = equipoCreativo[puesto];

          const equipo = (
            <EquipoCard
              key={puesto}
              titulo={puesto}
              personas={personas} // Pasamos la lista de personas
            />
          );
          index++;
          return (
            <td key={colIndex} colSpan={colSpan} rowSpan={item.filas} className={`${tdStyle} ${paddingClass}`}>
              {equipo}
            </td>
          );
        } else {
          return <td key={colIndex} colSpan={colSpan} rowSpan={item.filas} className={`${tdStyle} ${paddingClass}`}></td>;
        }
      })}
    </tr>
  ));

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Equipo Creativo - {nombreProduccion}</h1>
      <table className="equipo-creativo-table">
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
};

export default EquipoCreativo;