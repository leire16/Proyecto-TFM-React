const Galeria = ({ parametros }) => {
    const { nombreProduccion } = parametros;
    return (
      <div className='container'>
        <h1>Galeria de Imagenes</h1>
        <h2>{nombreProduccion}</h2>
      </div>
    );
  };
  
  export default Galeria;
  