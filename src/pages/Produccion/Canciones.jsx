const Canciones = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1 className="mb-5 uppercase">Canciones {nombreProduccion}</h1>
        <h2></h2>
      </div>
    );
  };
  
  export default Canciones;
  