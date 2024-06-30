import React from 'react';
import ElencoCard from '../../components/Cards/ElencoCard';
import obras from '../../mocks/obras.json'; 

const Elenco = ({ parametros }) => {
  const { nombreProduccion } = parametros;

  // Obtén la información de la obra de acuerdo a la producción
  const obra = obras[nombreProduccion];

  // Comprobar si se encontró la obra
  if (!obra || !obra.elenco) {
    return (
      <div className='container'>
        <p>No se encontró la obra o el elenco especificado.</p>
      </div>
    );
  }

  const elencoProduccion = obra.elenco;

  return (
    <div className='container'>
      <h1 className="mb-5 uppercase">Elenco - {nombreProduccion}</h1>

      {/* Itera sobre las claves del objeto elencoProduccion (secciones) */}
      {Object.keys(elencoProduccion).map((seccion, index) => (
        <div key={index} className={getMarginClass(seccion)}>
          <h2 className={getTitleMarginClass(seccion)}>{seccion}</h2>
          {Array.isArray(elencoProduccion[seccion]) ? (
            seccion === "Actores Principales" ? (
              // Si es "Actores Principales", usa ElencoCard y muestra en una sola columna
              elencoProduccion[seccion].map((personaje, index) => (
                <ElencoCard
                  key={index}
                  seccion={seccion}
                  personaje={personaje.personaje}
                  imagen={personaje.imagen}
                  persona={personaje.persona}
                  descripcion={personaje.descripcion}
                />
              ))
            ) : seccion === "Actores Secundarios" ? (
              // Si es "Actores Secundarios", muestra dos actores por fila
              <div className="row">
                {chunkArray(elencoProduccion[seccion], 2).map((row, rowIndex) => (
                  <div key={rowIndex} className="row">
                    {row.map((personaje, index) => (
                      <div key={index} className="col-md-6">
                        <ElencoCard
                          seccion={seccion}
                          personaje={personaje.personaje}
                          imagen={personaje.imagen}
                          persona={personaje.persona}
                          descripcion={personaje.descripcion}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // Para otras secciones que son arrays, maneja aquí si es necesario
              elencoProduccion[seccion].map((item, index) => (
                <p key={index}>{item}</p>
              ))
            )
          ) : (
            // Si no es un array, simplemente muestra el texto
            <p>{elencoProduccion[seccion]}</p>
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
