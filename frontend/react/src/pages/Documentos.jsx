import { useState } from 'react';
import { uploadDocumento, listDocumentosByTurno } from '../services/documentoService';

export default function Documentos() {
  const [turnoId, setTurnoId] = useState('');
  const [file, setFile] = useState(null);
  const [docs, setDocs] = useState([]);
  const [compartir, setCompartir] = useState(false);

  async function buscar() {
    if (!turnoId) return alert('Ingrese id de turno');
    const res = await listDocumentosByTurno(turnoId);
    if (res.success) setDocs(res.data || []);
  }

  async function subir() {
    if (!file) return alert('Seleccione archivo');
    const fd = new FormData();
    fd.append('file', file);
    fd.append('id_turno', turnoId);
    fd.append('compartir', compartir ? 'true' : 'false');
    const res = await uploadDocumento(fd);
    if (res.success) { alert('Subido'); buscar(); }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Documentos médicos</h2>
      <div>
        <input placeholder="ID Turno" value={turnoId} onChange={(e) => setTurnoId(e.target.value)} />
        <button onClick={buscar}>Buscar</button>
      </div>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <label><input type="checkbox" checked={compartir} onChange={(e) => setCompartir(e.target.checked)} /> Compartir con paciente</label>
        <button onClick={subir}>Subir</button>
      </div>
      <h3>Listado</h3>
      <ul>
        {docs.map(d => <li key={d.id_documento}>{d.fecha} - {d.tipo_documento} - <a href={d.url} target="_blank">Ver</a></li>)}
      </ul>
    </div>
  );
}
