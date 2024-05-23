const Canciones = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1>Canciones</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default Canciones;
  