import { useState } from 'react';

const EMPRESAS = [
  {
    nombre: 'EcoGreen S.A.S',
    nit: '900123456',
    correo: 'info@ecogreen.com',
    telefono: '3001234567',
    direccion: 'Cra 45 # 123-45',
  },
  {
    nombre: 'BioWaste Ltda',
    nit: '901234567',
    correo: 'contacto@biowaste.com',
    telefono: '3106543210',
    direccion: 'Calle 100 # 10-20',
  },
  {
    nombre: 'Reciclajes XYZ',
    nit: '902345678',
    correo: 'ventas@xyzreciclajes.co',
    telefono: '3209876543',
    direccion: 'Av. Las Américas # 50-30',
  },
  {
    nombre: 'GreenPower SAS',
    nit: '903456789',
    correo: 'admin@greenpower.com',
    telefono: '3112233445',
    direccion: 'Carrera 80 # 23-17',
  },
  {
    nombre: 'Ambiental Plus',
    nit: '904567890',
    correo: 'plus@ambiental.com',
    telefono: '3159988776',
    direccion: 'Diagonal 32 # 76-90',
  },
];

const Cobros = () => {
  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      categoria: '',
      servicio: '',
      nombreArticulo: '',
      cantidad: 0,
      precio: 0,
      total: 0,
    },
  ]);

  const [empresaInput, setEmpresaInput] = useState('');
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);
  const [deposito, setDeposito] = useState('');
  const [fechaCobro, setFechaCobro] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleItemChange = (index, campo, valor) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] =
      campo === 'cantidad' || campo === 'precio' ? Number(valor) : valor;

    if (campo === 'cantidad' || campo === 'precio') {
      const cantidad = nuevosItems[index].cantidad || 0;
      const precio = nuevosItems[index].precio || 0;
      nuevosItems[index].total = cantidad * precio;
    }

    setItems(nuevosItems);
  };

  const agregarFila = () => {
    const nuevoItem = {
      id: crypto.randomUUID(),
      categoria: '',
      servicio: '',
      nombreArticulo: '',
      cantidad: 0,
      precio: 0,
      total: 0,
    };
    setItems([...items, nuevoItem]);
  };

  const handleEmpresaSelect = (empresa) => {
    setEmpresaInput(empresa.nombre);
    setEmpresaSeleccionada(empresa);
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    const payload = {
      items,
      empresa: empresaSeleccionada,
      deposito,
      fechaCobro,
      fechaVencimiento,
      descripcion,
    };

    console.log('Payload a enviar:', payload);
    // espacio para enviar el json a la API
  };

  const resultadosFiltrados = EMPRESAS.filter((empresa) =>
    empresa.nombre.toLowerCase().includes(empresaInput.toLowerCase())
  ).slice(0, 3);

  return (
    <form className='mt-15' onSubmit={enviarFormulario}>
      <button type="button" className="btn btn-info mb-3" onClick={agregarFila}>
        Agregar Fila
      </button>

      {items.map((item, index) => (
        <div key={item.id} className="border rounded p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={item.categoria}
                onChange={(e) => handleItemChange(index, 'categoria', e.target.value)}
              >
                <option value="">Elegir</option>
                <option value="servicio-de-recoleccion">Servicio de recolección</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Servicio</label>
              <select
                className="form-select"
                value={item.servicio}
                onChange={(e) => handleItemChange(index, 'servicio', e.target.value)}
              >
                <option value="">Elegir</option>
                <option value="Recolección">Recolección</option>
                <option value="Recolección residuos trampa grasa">
                  Recolección residuos trampa grasa
                </option>
                <option value="Mantenimiento General">Mantenimiento General</option>
                <option value="Residuos Orgánicos">Residuos Orgánicos</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Nombre del artículo</label>
              <input
                className="form-control"
                type="text"
                value={item.nombreArticulo}
                onChange={(e) => handleItemChange(index, 'nombreArticulo', e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Cantidad</label>
              <input
                className="form-control"
                type="number"
                value={item.cantidad}
                onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Precio</label>
              <input
                className="form-control"
                type="number"
                value={item.precio}
                onChange={(e) => handleItemChange(index, 'precio', e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Total</label>
              <input className="form-control" type="number" value={item.total} readOnly />
            </div>
          </div>
        </div>
      ))}

      <div className="row mb-3 position-relative">
        <div className="col-md-4">
          <label className="form-label">Empresa</label>
          <input
            className="form-control"
            type="text"
            value={empresaInput}
            onChange={(e) => {
              setEmpresaInput(e.target.value);
              setEmpresaSeleccionada(null); // resetear autocompletado si cambia texto
            }}
          />
          {empresaInput && !empresaSeleccionada && resultadosFiltrados.length > 0 && (
            <ul className="list-group position-absolute z-3  shadow" style={{maxHeight: 150, overflowY: 'auto' }}>
              {resultadosFiltrados.map((empresa, i) => (
                <li
                  key={i}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleEmpresaSelect(empresa)}
                >
                  {empresa.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-4">
          <label className="form-label">NIT</label>
          <input
            className="form-control"
            type="text"
            value={empresaSeleccionada?.nit || ''}
            readOnly
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Correo</label>
          <input
            className="form-control"
            type="email"
            value={empresaSeleccionada?.correo || ''}
            readOnly
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Tel</label>
          <input
            className="form-control"
            type="text"
            value={empresaSeleccionada?.telefono || ''}
            readOnly
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Dirección</label>
          <input
            className="form-control"
            type="text"
            value={empresaSeleccionada?.direccion || ''}
            readOnly
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Depósito</label>
              <input 
        className="form-control"
        type="text"
        value={deposito}
        onChange={(e) => setDeposito(e.target.value)}
      />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Fecha de cobro:</label>
          <input
  className="form-control"
  type="date"
  value={fechaCobro}
  onChange={(e) => setFechaCobro(e.target.value)}
/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha de vencimiento:</label>
<input
  className="form-control"
  type="date"
  value={fechaVencimiento}
  onChange={(e) => setFechaVencimiento(e.target.value)}
/>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción:</label>
<textarea
  className="form-control"
  rows={3}
  value={descripcion}
  onChange={(e) => setDescripcion(e.target.value)}
></textarea>      
</div>

      <button type="submit" className="btn btn-success">Generar</button>
    </form>
  );
};

export default Cobros;
