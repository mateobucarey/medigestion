import { useEffect, useState, useContext } from 'react';
import { listDisponibilidades, createDisponibilidad, updateDisponibilidad, deleteDisponibilidad } from '../services/disponibilidadService';
import { getAcceptedPlans, setAcceptedPlans } from '../services/profesionalService';
import { AuthContext } from '../context/AuthContext';

export default function Disponibilidad() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ dia_semana: 'Lunes', hora_inicio: '09:00', hora_fin: '17:00' });
  const [editingId, setEditingId] = useState(null);
  const [plans, setPlans] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    async function load() {
      const d = await listDisponibilidades();
      if (d.success) setList(d.data || []);
      const p = await getAcceptedPlans();
      if (p.success) { setPlans(p.data || []); setAccepted((p.data || []).map(x => x.id_plan)); }
    }
    load();
  }, [user]);

  async function add(e) {
    e.preventDefault();
    let res;
    if (editingId) {
      res = await updateDisponibilidad(editingId, form);
      setEditingId(null);
    } else {
      res = await createDisponibilidad(form);
    }
    if (res.success) {
      const d = await listDisponibilidades();
      setList(d.data || []);
    }
  }

  function startEditDisp(d) {
    setEditingId(d.id_disponibilidad);
    setForm({ dia_semana: d.dia_semana, hora_inicio: d.hora_inicio, hora_fin: d.hora_fin });
  }

  async function removeDisp(id) {
    const res = await deleteDisponibilidad(id);
    if (res.success) {
      const d = await listDisponibilidades();
      setList(d.data || []);
    }
  }

  async function savePlans() {
    const res = await setAcceptedPlans(accepted);
    if (res.success) alert('Planes guardados');
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Disponibilidad</h2>
      <form onSubmit={add}>
        <select value={form.dia_semana} onChange={(e) => setForm({ ...form, dia_semana: e.target.value })}>
          <option>Lunes</option>
          <option>Martes</option>
          <option>Miercoles</option>
          <option>Jueves</option>
          <option>Viernes</option>
          <option>Sabado</option>
          <option>Domingo</option>
        </select>
        <input type="time" value={form.hora_inicio} onChange={(e) => setForm({ ...form, hora_inicio: e.target.value })} />
        <input type="time" value={form.hora_fin} onChange={(e) => setForm({ ...form, hora_fin: e.target.value })} />
        <button type="submit">{editingId ? 'Guardar' : 'Agregar'}</button>
      </form>

      <h3>Horarios</h3>
      <ul>
        {list.map(d => (
          <li key={d.id_disponibilidad}>{d.dia_semana} {d.hora_inicio} - {d.hora_fin}
            <button style={{ marginLeft: 8 }} onClick={() => startEditDisp(d)}>Editar</button>
            <button style={{ marginLeft: 8 }} onClick={() => removeDisp(d.id_disponibilidad)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Planes aceptados</h3>
      <div>
        {plans.map(p => (
          <label key={p.id_plan} style={{ display: 'block' }}>
            <input type="checkbox" checked={accepted.includes(p.id_plan)} onChange={(e) => {
              if (e.target.checked) setAccepted([...accepted, p.id_plan]); else setAccepted(accepted.filter(x => x !== p.id_plan));
            }} /> {p.tipo}
          </label>
        ))}
  <button onClick={savePlans}>Guardar</button>
      </div>
    </div>
  );
}
