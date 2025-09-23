const model = require('../models/menuRolModel');

async function getMenusPorRol(req, res) {
  try {
    const data = await model.obtenerMenusPorRol(req.params.id_rol);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener menús del rol' });
  }
}

async function postMenuRol(req, res) {
  try {
    const nuevo = await model.asignarMenuARol(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al asignar menú al rol' });
  }
}

async function deleteMenuRol(req, res) {
  try {
    const eliminado = await model.eliminarMenuDeRol(req.params.id_menu, req.params.id_rol);
    if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
    res.json({ mensaje: 'Menú quitado del rol' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar relación menú-rol' });
  }
}

module.exports = {
  getMenusPorRol,
  postMenuRol,
  deleteMenuRol,
};
