import { useState, useEffect  } from 'react';
import axios from 'axios';



const Certificados = () => {
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
  const [resultados, setResultados] = useState([]);

  const handleItemChange = (index, campo, valor) => {
    const nuevosItems = [...items];
    nuevosItems[index][campo] = campo === 'cantidad' || campo === 'precio' ? Number(valor) : valor;
    if (campo === 'cantidad' || campo === 'precio') {
      const cantidad = nuevosItems[index].cantidad || 0;
      const precio = nuevosItems[index].precio || 0;
      nuevosItems[index].total = parseFloat((cantidad * precio).toFixed(2));
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

  const eliminarUltimaFila = () => {
    setItems((prevItems) => {
      if (prevItems.length > 1) {
        return prevItems.slice(0, -1);
      }
      return prevItems;
    });
  };

  const limpiarFormulario = () => {
    setItems([
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
    setEmpresaInput('');
    setEmpresaSeleccionada(null);
    setDeposito('');
    setFechaCobro('');
    setFechaVencimiento('');
    setDescripcion('');
  };

  const validarFormulario = () => {
    if (!empresaSeleccionada || !fechaCobro || !fechaVencimiento) return false;
    if (items.length === 0) return false;
    for (const item of items) {
      if (!item.nombreArticulo || item.cantidad <= 0 || item.precio <= 0) return false;
    }
    return true;
  };

  const handleEmpresaSelect = (empresa) => {
    setEmpresaInput(empresa.razon_social);
    setEmpresaSeleccionada(empresa);
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!validarFormulario()) {
      alert('Por favor completa todos los campos obligatorios correctamente.');
      return;
    }

    const payload = {
      items,
      empresa: empresaSeleccionada,
      deposito,
      fechaCobro,
      fechaVencimiento,
      descripcion,
    };

    console.log('Payload a enviar:', payload);
    alert('Formulario enviado correctamente ✅');
  };

  const totalGeneral = items.reduce((acc, item) => acc + item.total, 0);

  useEffect(() => {
    if (empresaInput.trim() === '') {
      setResultados([]);
      return;
    }

    const fetchEmpresas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/clientes/buscar?q=${empresaInput}`);
        console.log("Respuesta del backend:", response.data);
        setResultados(response.data); // o como lo estés almacenando
      } catch (error) {
        console.error("Error al buscar empresas:", error);
      }
    };

    fetchEmpresas();
  }, [empresaInput]);

  return (
    <form className="mt-15" onSubmit={enviarFormulario}>
      <div className="row mb-3 position-relative">
        <div className="col-md-4">
          <label className="form-label">Empresa</label>
          <input
            className="form-control"
            type="text"
            value={empresaInput}
            onChange={(e) => {
              setEmpresaInput(e.target.value);
              setEmpresaSeleccionada(null);
            }}
          />
            {empresaInput && !empresaSeleccionada && resultados.length > 0 && (
              <ul className="list-group position-absolute z-3  shadow" style={{ maxHeight: 150, overflowY: 'auto' }}>
                {resultados.map((empresa, i) => (
                  <li
                    key={i}
                    className="list-group-item list-group-item-action"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEmpresaSelect(empresa)}
                  >
                    {empresa.razon_social}
                  </li>
                ))}
              </ul>
            )}
        </div>

        <div className="col-md-4">
          <label className="form-label">NIT</label>
          <input className="form-control" type="text" value={empresaSeleccionada?.nit || ''} readOnly />
        </div>
        <div className="col-md-4">
          <label className="form-label">Correo</label>
          <input className="form-control" type="email" value={empresaSeleccionada?.correo || ''} readOnly />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Tel</label>
          <input className="form-control" type="text" value={empresaSeleccionada?.telefono || ''} readOnly />
        </div>
        <div className="col-md-4">
          <label className="form-label">Dirección</label>
          <input className="form-control" type="text" value={empresaSeleccionada?.direccion || ''} readOnly />
        </div>
        <div className="col-md-4">
          <label className="form-label">Depósito</label>
          <input className="form-control" type="text" value={deposito} onChange={(e) => setDeposito(e.target.value)} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Fecha de cobro:</label>
          <input className="form-control" type="date" value={fechaCobro} onChange={(e) => setFechaCobro(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Fecha de vencimiento:</label>
          <input className="form-control" type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} />
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción:</label>
        <textarea className="form-control" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>

      <button type="button" className="btn btn-info ms-2 mb-4" onClick={agregarFila}>Agregar Fila</button>
      <button type="button" className="btn btn-primary ms-2 mb-4" onClick={eliminarUltimaFila}>Eliminar Última Fila</button>
      <button type="button" className="btn btn-danger ms-2 mb-4" onClick={limpiarFormulario}>Limpiar Todo</button>

      {items.map((item, index) => (
        <div key={item.id} className="border rounded p-3 mb-4">
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select className="form-select" value={item.categoria} onChange={(e) => handleItemChange(index, 'categoria', e.target.value)}>
                <option value="">Elegir</option>
                <option value="servicio-de-recoleccion">Servicio de recolección</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Servicio</label>
              <select className="form-select" value={item.servicio} onChange={(e) => handleItemChange(index, 'servicio', e.target.value)}>
                <option value="">Elegir</option>
                <option value="Recolección">Recolección</option>
                <option value="Recolección residuos trampa grasa">Recolección residuos trampa grasa</option>
                <option value="Mantenimiento General">Mantenimiento General</option>
                <option value="Residuos Orgánicos">Residuos Orgánicos</option>
              </select>
            </div>

            <div className="col-md-3">
              <label className="form-label">Nombre del artículo</label>
              <input className="form-control" type="text" value={item.nombreArticulo} onChange={(e) => handleItemChange(index, 'nombreArticulo', e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Cantidad</label>
              <input className="form-control" type="number" value={item.cantidad} onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} />
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <label className="form-label">Precio</label>
              <input className="form-control" type="number" value={item.precio} onChange={(e) => handleItemChange(index, 'precio', e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label">Total</label>
              <input className="form-control" type="number" value={item.total} readOnly />
            </div>
          </div>
        </div>
      ))}

      <div className="text-end fw-bold fs-5 mt-3">
        Total general: ${totalGeneral.toFixed(2)}
      </div>

      <button type="submit" className="btn btn-success mt-4">Generar</button>
    </form>
  );
};

export default Certificados;
