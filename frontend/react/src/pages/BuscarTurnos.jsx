import { useState, useEffect, useContext } from 'react';
import { searchAvailableSlots, reservarSlot } from '../services/turnoService';
import { AuthContext } from '../context/AuthContext';

export default function BuscarTurnos() {
  const { user } = useContext(AuthContext);
  const [filters, setFilters] = useState({ fecha: '', especialidad: '', id_profesional: '', slotMinutes: 60 });
  const [results, setResults] = useState([]);

  async function onSearch(e) {
    e && e.preventDefault();
    if (!filters.fecha) return alert('Seleccioná una fecha');
    const res = await searchAvailableSlots(filters);
    if (res.success) setResults(res.data || []);
    else alert(res.error || 'Error al buscar slots');
  }

  async function reservar(prof, slot) {
    if (!user) return alert('Debés iniciar sesión como paciente');
    const payload = { id_profesional: prof.id_profesional, id_paciente: user.id, fecha: filters.fecha, hora_inicio: slot.hora_inicio, hora_fin: slot.hora_fin };
    const res = await reservarSlot(payload);
    if (res.success) { alert('Turno reservado'); onSearch(); }
    else alert(res.error || 'Error al reservar');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-8">
      <h2 className="text-2xl font-semibold mb-4">Buscar turnos disponibles</h2>
      <form className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4" onSubmit={onSearch}>
        <input type="date" className="p-2 border rounded" value={filters.fecha} onChange={e => setFilters({ ...filters, fecha: e.target.value })} />
        <input className="p-2 border rounded" placeholder="Especialidad" value={filters.especialidad} onChange={e => setFilters({ ...filters, especialidad: e.target.value })} />
        <input className="p-2 border rounded" placeholder="ID profesional (opcional)" value={filters.id_profesional} onChange={e => setFilters({ ...filters, id_profesional: e.target.value })} />
        <button className="bg-teal-400 hover:bg-teal-500 text-white rounded py-2 px-4" type="submit">Buscar</button>
      </form>

      <div className="space-y-4">
        {results.length === 0 && <p className="text-gray-600">No se encontraron franjas. Probá otra fecha o profesional.</p>}
        {results.map(p => (
          <div key={p.id_profesional} className="bg-white rounded shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.profesional_nombre} {p.profesional_apellido} (ID {p.id_profesional})</div>
                <div className="text-sm text-gray-600">{p.slots.length} franjas disponibles</div>
              </div>
              <div className="space-x-2">
                {p.slots.slice(0,5).map(s => (
                  <button key={s.hora_inicio} onClick={() => reservar(p, s)} className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">{s.hora_inicio}</button>
                ))}
              </div>
            </div>
            {p.slots.length > 5 && <div className="text-sm text-gray-500 mt-2">Y {p.slots.length - 5} más...</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
