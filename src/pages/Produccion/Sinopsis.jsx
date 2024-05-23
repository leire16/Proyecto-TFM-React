const Sinopsis = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1>Sinopsis</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default Sinopsis;
  