const turnoModel = require('../models/turnoModel');
const disponibilidadModel = require('../models/disponibilidadModel');
const profesionalModel = require('../models/profesionalModel');

async function listForProfesional(req, res, next) {
  try {
    const id_profesional = parseInt(req.user.id, 10);
    const rows = await turnoModel.findByProfesional(id_profesional);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function cancelTurno(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    // Si el usuario es profesional, debería ser dueño del turno. Si es secretario (rol 3) puede cancelar cualquiera.
    const user = req.user || {};
    if (user.rol === 2) {
      // verificar propiedad
      const turno = await turnoModel.findById(id);
      if (!turno) return res.status(404).json({ success: false, error: 'Turno no encontrado' });
      if (turno.id_profesional !== parseInt(user.id, 10)) return res.status(403).json({ success: false, error: 'Sin permisos sobre este turno' });
    }
    const row = await turnoModel.cancelTurno(id);
    return res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

async function createTurno(req, res, next) {
  try {
    const { id_profesional, id_paciente, fecha, hora_inicio, hora_fin } = req.body;
    // Validaciones básicas
    if (!id_profesional || !id_paciente || !fecha || !hora_inicio || !hora_fin) return res.status(400).json({ success: false, error: 'Faltan datos' });
    const row = await turnoModel.createTurno({ id_profesional, id_paciente, fecha, hora_inicio, hora_fin });
    return res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

async function editTurno(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
    const { id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado } = req.body;
    const user = req.user || {};

    if (user.rol === 2) {
      // profesional solo puede editar sus propios turnos
      const turno = await turnoModel.findById(id);
      if (!turno) return res.status(404).json({ success: false, error: 'Turno no encontrado' });
      if (turno.id_profesional !== parseInt(user.id, 10)) return res.status(403).json({ success: false, error: 'Sin permisos sobre este turno' });
    }

    const row = await turnoModel.updateTurno(id, { id_profesional, id_paciente, fecha, hora_inicio, hora_fin, estado });
    return res.json({ success: true, data: row });
  } catch (err) {
    next(err);
  }
}

module.exports = { listForProfesional, cancelTurno, createTurno, editTurno };

async function listAllTurnos(req, res, next) {
  try {
    const rows = await turnoModel.findAllTurnos();
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

async function listFilteredTurnos(req, res, next) {
  try {
    const { from, to, id_profesional, estado } = req.query;
    const filters = { from, to, id_profesional: id_profesional ? parseInt(id_profesional, 10) : undefined, estado };
    const rows = await turnoModel.findTurnos(filters);
    return res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
}

module.exports = { listForProfesional, cancelTurno, createTurno, editTurno, listAllTurnos, listFilteredTurnos };

// Buscar slots disponibles
async function buscarTurnosDisponibles(req, res, next) {
  try {
    const { id_profesional, especialidad, fecha, hora_inicio, hora_fin, slotMinutes } = req.query;
    if (!fecha) return res.status(400).json({ success: false, error: 'Fecha requerida' });
    const slot = parseInt(slotMinutes || '60', 10);

    // Build list of professionals to consider
    let profesionales = [];
    if (id_profesional) {
      profesionales.push({ id_profesional: parseInt(id_profesional, 10) });
    } else if (especialidad) {
      // search professionals by especialidad
      // profesionalModel does not expose a search by especialidad currently; we'll query all and filter
      // For simplicity, fetch all profesionales via upsert table isn't available; assume profesional table exists and query directly
      const resProf = await profesionalModel.findAllByEspecialidad(especialidad);
      profesionales = resProf.map(p => ({ id_profesional: p.id_profesional, profesion: p.profesion, especialidad: p.especialidad }));
    } else {
      // if no filter, consider all professionals
      const resProf = await profesionalModel.findAll();
      profesionales = resProf.map(p => ({ id_profesional: p.id_profesional, profesion: p.profesion, especialidad: p.especialidad }));
    }

  // Map date to Spanish weekday used in disponibilidad (e.g. 'Lunes')
  const daysEs = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
  const dateObj = new Date(fecha + 'T00:00:00');
  const dayOfWeek = daysEs[dateObj.getDay()];
    const results = [];

    for (const prof of profesionales) {
  // get disponibilidades for this professional
  const disponibilidades = await disponibilidadModel.findByProfesional(prof.id_profesional);
  const relevant = disponibilidades.filter(d => (d.dia_semana || '').toLowerCase() === dayOfWeek.toLowerCase());
      if (!relevant.length) continue;

      // get existing turnos for that profesional on fecha
      const ocupados = await turnoModel.findByProfesionalAndFecha(prof.id_profesional, fecha);
      const ocupadosTimes = ocupados.map(o => ({ inicio: o.hora_inicio, fin: o.hora_fin }));

      const slots = [];
      // helpers to parse times like '09:00:00' or '09:00'
      const parseToMinutes = (t) => {
        if (!t) return null;
        const parts = t.split(':').map(Number);
        return parts[0] * 60 + (parts[1] || 0);
      };
      const formatFromMinutes = (m) => {
        const hh = String(Math.floor(m / 60)).padStart(2, '0');
        const mm = String(m % 60).padStart(2, '0');
        return `${hh}:${mm}`;
      };

      const filterStart = hora_inicio ? parseToMinutes(hora_inicio) : null;
      const filterEnd = hora_fin ? parseToMinutes(hora_fin) : null;

      // normalize ocupados to minutes
      const ocupadosMins = ocupados.map(o => ({ inicio: parseToMinutes(o.hora_inicio), fin: parseToMinutes(o.hora_fin) }));

      for (const d of relevant) {
        const startMinD = parseToMinutes(d.hora_inicio);
        const endMinD = parseToMinutes(d.hora_fin);
        if (startMinD === null || endMinD === null) continue;

        let curStart = startMinD;
        while (curStart + slot <= endMinD) {
          const sMin = curStart;
          const eMin = curStart + slot;

          // apply hora filters
          if (filterStart !== null && eMin <= filterStart) { curStart += slot; continue; }
          if (filterEnd !== null && sMin >= filterEnd) break;

          // check overlap with ocupados
          const overlap = ocupadosMins.some(o => !(eMin <= o.inicio || sMin >= o.fin));
          if (!overlap) slots.push({ hora_inicio: formatFromMinutes(sMin), hora_fin: formatFromMinutes(eMin) });
          curStart += slot;
        }
      }

      if (slots.length) {
        // get profesional name
        const userProf = await profesionalModel.getUsuarioById(prof.id_profesional);
        results.push({ id_profesional: prof.id_profesional, profesional_nombre: userProf?.nombre, profesional_apellido: userProf?.apellido, slots });
      }
    }

    return res.json({ success: true, data: results });
  } catch (err) {
    next(err);
  }
}

module.exports.buscarTurnosDisponibles = buscarTurnosDisponibles;
