const EquipoCreativo = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1>Equipo Creativo</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default EquipoCreativo;
  