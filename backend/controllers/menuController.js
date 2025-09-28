const model = require('../models/menuModel');

async function getMenus(req, res) {
  try {
    const id_rol = req.user.id_rol; // viene del middleware JWT
    const menus = await model.obtenerMenusPorRol(id_rol);
    res.json({ menu: menus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al obtener menús' });
  }
}

async function postMenu(req, res) {
  try {
    const nuevo = await model.crearMenu(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al crear menú' });
  }
}

async function deleteMenu(req, res) {
  try {
    const eliminado = await model.eliminarMenu(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: 'Menú no encontrado' });
    res.json({ mensaje: 'Menú eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al eliminar menú' });
  }
}

module.exports = {
  getMenus,
  postMenu,
  deleteMenu,
};
