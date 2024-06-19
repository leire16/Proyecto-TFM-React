import React from 'react';
import EquipoCard from '../../components/Cards/Equipo-card';
import obras from '../../mocks/obras.json';

const EquipoCreativo = ({ parametros }) => {
  const { nombreProduccion } = parametros;

  // Obtén la información de la obra de acuerdo a la producción
  const obra = obras[nombreProduccion];

  // Comprobar si se encontró la obra o el equipo creativo especificado
  if (!obra || !obra.equipo_creativo) {
    return (
      <div className='container'>
        <p>No se encontró el equipo creativo para la producción {nombreProduccion}.</p>
      </div>
    );
  }

  const equipoCreativo = obra.equipo_creativo;
  const equipoKeys = Object.keys(equipoCreativo);

  // Estructura de filas y columnas según el diseño específico para dispositivos pequeños
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

  // Determinar la estructura a usar según el tamaño de la pantalla
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
  const rows = estructura.map((item, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {[...Array(item.columnas)].map((_, colIndex) => {
          const colSpan = item.columnas === 1 ? 2 : 1; 
          const tdStyle = 'full-width-column'; // Estilo de la celda
          const paddingClass = 'px-4'; // Clase de padding horizontal para todas las celdas

          if (index < equipoKeys.length) {
            const equipo = (
              <EquipoCard
                titulo={equipoKeys[index]}
                persona={equipoCreativo[equipoKeys[index]]}
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
    );
  });

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