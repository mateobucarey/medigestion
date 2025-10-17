import { useState, useEffect } from 'react';
import { registerPaciente } from '../services/pacienteService';
import { listObras } from '../services/obraService';
import { listPlanes } from '../services/planService';

export default function Register() {
  const [form, setForm] = useState({ nombre: '', apellido: '', mail: '', contrasenia: '', fecha_nac: '', dni: '', id_plan: '', nro_afiliado: '' });
  const [obras, setObras] = useState([]);
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await listObras();
      if (res.success) setObras(res.data || []);
    }
    load();
  }, []);

  async function onObraChange(obraId) {
    const res = await listPlanes(obraId);
    if (res.success) setPlanes(res.data || []);
  }

  async function submit(e) {
    e.preventDefault();
    const res = await registerPaciente(form);
    if (res.success) {
      alert('Registrado correctamente');
      window.location.href = '/login';
    } else {
      alert(res.error || 'Error');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Registro de paciente</h2>
      <form onSubmit={submit}>
        <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
        <input placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
        <input placeholder="Email" value={form.mail} onChange={(e) => setForm({ ...form, mail: e.target.value })} />
        <input placeholder="Contraseña" type="password" value={form.contrasenia} onChange={(e) => setForm({ ...form, contrasenia: e.target.value })} />
        <input placeholder="Fecha Nac (YYYY-MM-DD)" value={form.fecha_nac} onChange={(e) => setForm({ ...form, fecha_nac: e.target.value })} />
        <input placeholder="DNI" value={form.dni} onChange={(e) => setForm({ ...form, dni: e.target.value })} />

        <div>
          <label>Obra social</label>
          <select onChange={(e) => { setForm({ ...form, id_obra: e.target.value }); onObraChange(e.target.value); }}>
            <option value="">-- Seleccionar --</option>
            {obras.map(o => <option key={o.id_obra_social} value={o.id_obra_social}>{o.nombre}</option>)}
          </select>
        </div>

        <div>
          <label>Plan</label>
          <select value={form.id_plan} onChange={(e) => setForm({ ...form, id_plan: e.target.value })}>
            <option value="">-- Seleccionar --</option>
            {planes.map(p => <option key={p.id_plan} value={p.id_plan}>{p.tipo}</option>)}
          </select>
        </div>

        <input placeholder="Nro afiliado" value={form.nro_afiliado} onChange={(e) => setForm({ ...form, nro_afiliado: e.target.value })} />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
