const Produccion = ({ parametros }) => {
  const { nombre } = parametros;
  return (
    <div className='container'>
      <h1>{nombre}</h1>
    </div>
  );
};

export default Produccion;
