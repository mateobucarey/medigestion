const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, apellido, telefono, mail, contrasenia } = req.body;

  try {
    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Asignamos rol por defecto (ej: 4 → paciente)
    const id_rol = 4;

    const result = await pool.query(
      `INSERT INTO usuario (nombre, apellido, telefono, mail, contrasenia, id_rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [nombre, apellido, telefono || null, mail, hashedPassword, id_rol]
    );

    res.status(201).json({ msg: 'Usuario registrado', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { mail, contrasenia } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuario WHERE mail = $1', [mail]);
    const user = result.rows[0];

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(contrasenia, user.contrasenia);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id_usuario: user.id_usuario, id_rol: user.id_rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const userId = req.user.id_usuario; // viene del middleware JWT
    const result = await pool.query(
      "SELECT id_usuario, nombre, apellido, mail, id_rol FROM usuario WHERE id_usuario=$1",
      [userId]
    );

    if (!result.rows[0]) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
