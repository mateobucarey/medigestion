import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { listTurnosFiltered } from '../services/turnoService';

function startOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as first
  return new Date(d.setDate(diff));
}

export default function SecretariaCalendario() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [view, setView] = useState('day'); // day | week | profesional
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [estado, setEstado] = useState('');
  const [idProfesional, setIdProfesional] = useState('');
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    if (!user) return navigate('/login');
    if (user.rol !== 3) return navigate('/');
    load();
  }, [user, view, date, estado, idProfesional]);

  async function load() {
    try {
      if (view === 'day') {
        const from = date;
        const to = date;
        const res = await listTurnosFiltered({ from, to, estado });
        if (res.success) setTurnos(res.data || []);
      } else if (view === 'week') {
        const start = startOfWeek(date);
        const from = start.toISOString().slice(0, 10);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        const to = end.toISOString().slice(0, 10);
        const res = await listTurnosFiltered({ from, to, estado });
        if (res.success) setTurnos(res.data || []);
      } else if (view === 'profesional') {
        const res = await listTurnosFiltered({ id_profesional: idProfesional, estado });
        if (res.success) setTurnos(res.data || []);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">
      <h2 className="text-2xl font-semibold mb-4">Calendario centralizado (Secretaría)</h2>

      <div className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select value={view} onChange={e => setView(e.target.value)} className="p-2 border rounded">
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="profesional">Por profesional</option>
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="p-2 border rounded" />
        <select value={estado} onChange={e => setEstado(e.target.value)} className="p-2 border rounded">
          <option value="">Todos estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
        {view === 'profesional' && (
          <input className="p-2 border rounded" placeholder="ID profesional" value={idProfesional} onChange={e => setIdProfesional(e.target.value)} />
        )}
      </div>

      <section>
        <h3 className="text-xl font-medium mb-3">Turnos</h3>
        <div className="space-y-3">
          {turnos.length === 0 && <div className="text-sm text-gray-600">No hay turnos para los filtros seleccionados.</div>}
          {turnos.map(t => (
            <div key={t.id_turno} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{t.fecha} {t.hora_inicio} - {t.hora_fin}</div>
                <div className="text-sm text-gray-600">Profesional: {t.profesional_nombre} {t.profesional_apellido} | Paciente: {t.paciente_nombre} {t.paciente_apellido}</div>
                <div className="text-sm text-gray-500">Estado: {t.estado}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
