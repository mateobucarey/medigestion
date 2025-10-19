import { useEffect, useState } from 'react';
import { listMisTurnos, cancelarTurno } from '../services/turnoService';

export default function MisTurnos() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await listMisTurnos();
    if (res.success) setTurnos(res.data || []);
  }

  async function cancelar(id) {
    if (!confirm('Confirma cancelar este turno?')) return;
    const res = await cancelarTurno(id);
    if (res.success) {
      alert('Turno cancelado');
      load();
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Mis turnos</h2>
      <ul>
        {turnos.map(t => (
          <li key={t.id_turno}>{t.fecha} {t.hora_inicio} - {t.hora_fin} | Paciente: {t.paciente_nombre} {t.paciente_apellido}
            <button style={{ marginLeft: 8 }} onClick={() => cancelar(t.id_turno)}>Cancelar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
