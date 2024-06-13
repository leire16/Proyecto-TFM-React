const EquipoCreativo = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1 className="mb-5 uppercase">Equipo Creativo</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default EquipoCreativo;
  