import { useState } from 'react';
import { createNota, listNotasByTurno } from '../services/notaService';

export default function NotasClinicas() {
  const [turnoId, setTurnoId] = useState('');
  const [detalle, setDetalle] = useState('');
  const [notas, setNotas] = useState([]);

  async function buscar() {
    if (!turnoId) return alert('Ingrese id de turno');
    const res = await listNotasByTurno(turnoId);
    if (res.success) setNotas(res.data || []);
  }

  async function guardar() {
    if (!turnoId || !detalle) return alert('Complete turno y detalle');
    const res = await createNota({ id_turno: Number(turnoId), detalle });
    if (res.success) { alert('Nota guardada'); setDetalle(''); buscar(); }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Notas clínicas (privadas)</h2>
      <div>
        <input placeholder="ID Turno" value={turnoId} onChange={(e) => setTurnoId(e.target.value)} />
        <button onClick={buscar}>Buscar</button>
      </div>
      <div>
        <textarea placeholder="Detalle" value={detalle} onChange={(e) => setDetalle(e.target.value)} />
        <button onClick={guardar}>Guardar nota</button>
      </div>
      <h3>Listado</h3>
      <ul>
        {notas.map(n => <li key={n.id_nota_clinica}>{n.fecha_creacion} - {n.detalle}</li>)}
      </ul>
    </div>
  );
}
