import { useEffect, useState, useContext } from 'react';
import { listObras } from '../services/obraService';
import { listPlanes } from '../services/planService';
import { getAcceptedPlans, setAcceptedPlans } from '../services/profesionalService';
import { AuthContext } from '../context/AuthContext';

export default function ProfesionalPlanes() {
  const { user } = useContext(AuthContext);
  const [obraNombre, setObraNombre] = useState('');
  const [planTipo, setPlanTipo] = useState('');

  useEffect(() => {
    async function load() {
      // Prefill nothing; professional will type their obra and plan
    }
    load();
  }, [user]);

  async function save() {
    if (!obraNombre || !planTipo) return alert('Complete obra social y tipo de plan');
    const payload = { obra_nombre: obraNombre, plan_tipo: planTipo };
    const res = await setAcceptedPlans(payload);
    if (res && res.success) {
      alert('Guardado');
    } else {
      alert('Error al guardar');
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Obra social y plan</h2>
      <div>
        <label>Obra social (escriba el nombre)</label>
        <input value={obraNombre} onChange={(e) => setObraNombre(e.target.value)} placeholder="Nombre de la obra social" />
      </div>
      <div>
        <label>Plan (escriba el tipo)</label>
        <input value={planTipo} onChange={(e) => setPlanTipo(e.target.value)} placeholder="Tipo de plan" />
      </div>
      <button onClick={save}>Guardar</button>
    </div>
  );
}
