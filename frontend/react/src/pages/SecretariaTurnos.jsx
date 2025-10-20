import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { listAllTurnos, createTurno, updateTurno, cancelarTurno } from '../services/turnoService';
import { searchPacientes } from '../services/pacienteService';

export default function SecretariaTurnos() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [turnos, setTurnos] = useState([]);
  const [form, setForm] = useState({ id_profesional: '', id_paciente: '', fecha: '', hora_inicio: '', hora_fin: '' });
  const [patientQuery, setPatientQuery] = useState('');
  const [patientResults, setPatientResults] = useState([]);
  const [patientTimer, setPatientTimer] = useState(null);

  useEffect(() => {
    if (!user) return navigate('/login');
    if (user.rol !== 3) return navigate('/');
    load();
  }, [user]);

  async function load() {
    // listAllTurnos endpoint - backend should implement it (fallback to mis-turnos if not)
    try {
      const res = await listAllTurnos();
      if (res.success) setTurnos(res.data || []);
    } catch (e) {
      console.error(e);
    }
  }

  async function onCreate(e) {
    e.preventDefault();
    const res = await createTurno(form);
    if (res.success) {
      alert('Turno creado');
      setForm({ id_profesional: '', id_paciente: '', fecha: '', hora_inicio: '', hora_fin: '' });
      load();
    } else alert(res.error || 'Error');
  }

  async function onCancel(id) {
    if (!confirm('Confirma cancelar este turno?')) return;
    const res = await cancelarTurno(id);
    if (res.success) {
      alert('Turno cancelado');
      load();
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">
      <h2 className="text-2xl font-semibold mb-4">Gestión de turnos (Secretaría)</h2>

      <section className="bg-white p-6 rounded shadow mb-8">
        <h3 className="font-medium mb-2">Crear turno</h3>
        <form onSubmit={onCreate} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="p-2 border rounded" placeholder="ID profesional" value={form.id_profesional} onChange={e => setForm({ ...form, id_profesional: e.target.value })} />
          <div className="relative">
            <input className="p-2 border rounded w-full" placeholder="Buscar paciente por nombre/DNI/email" value={patientQuery} onChange={e => {
              const v = e.target.value;
              setPatientQuery(v);
              // debounce
              if (patientTimer) clearTimeout(patientTimer);
              setPatientTimer(setTimeout(async () => {
                if (!v) return setPatientResults([]);
                const res = await searchPacientes(v);
                if (res.success) setPatientResults(res.data || []);
              }, 300));
            }} />
            {patientResults.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border rounded mt-1 max-h-48 overflow-auto z-50">
                {patientResults.map(p => (
                  <li key={p.id_paciente} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setForm({ ...form, id_paciente: p.id_paciente });
                    setPatientQuery(`${p.nombre} ${p.apellido} (${p.mail || p.dni})`);
                    setPatientResults([]);
                  }}>{p.nombre} {p.apellido} {p.dni ? `- ${p.dni}` : ''} {p.mail ? `- ${p.mail}` : ''}</li>
                ))}
              </ul>
            )}
          </div>
          <input type="date" className="p-2 border rounded" value={form.fecha} onChange={e => setForm({ ...form, fecha: e.target.value })} />
          <input type="time" className="p-2 border rounded" value={form.hora_inicio} onChange={e => setForm({ ...form, hora_inicio: e.target.value })} />
          <input type="time" className="p-2 border rounded" value={form.hora_fin} onChange={e => setForm({ ...form, hora_fin: e.target.value })} />
          <button className="bg-teal-400 hover:bg-teal-500 text-white rounded py-2 px-4" type="submit">Crear</button>
        </form>
      </section>

      <section>
        <h3 className="text-xl font-medium mb-3">Turnos</h3>
        <div className="space-y-3">
          {turnos.map(t => (
            <div key={t.id_turno} className="bg-white p-4 rounded shadow flex items-center justify-between">
              <div>
                <div className="font-medium">{t.fecha} {t.hora_inicio} - {t.hora_fin}</div>
                <div className="text-sm text-gray-600">Profesional: {t.id_profesional} | Paciente: {t.paciente_nombre} {t.paciente_apellido}</div>
              </div>
              <div className="space-x-2">
                <button onClick={() => onCancel(t.id_turno)} className="text-red-600">Cancelar</button>
                {/* Edit action could open a modal - omitted for brevity */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
