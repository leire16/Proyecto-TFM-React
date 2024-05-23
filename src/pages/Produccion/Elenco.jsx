const Elenco = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1>Elenco</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default Elenco;
  