const model = require('../models/documentoMedicoModel');

async function getDocumentos(req, res) {
  try {
    const docs = await model.obtenerDocumentosPorTurno(req.params.id_turno);
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener documentos' });
  }
}

async function postDocumento(req, res) {
  try {
    const doc = await model.crearDocumento(req.body);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear documento' });
  }
}

async function putCompartir(req, res) {
  try {
    const actualizado = await model.compartirDocumento(req.params.id);
    if (!actualizado) return res.status(404).json({ mensaje: 'Documento no encontrado' });
    res.json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al compartir documento' });
  }
}

module.exports = {
  getDocumentos,
  postDocumento,
  putCompartir,
};
