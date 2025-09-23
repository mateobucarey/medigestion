const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { nombre, apellido, telefono, mail, contrasenia, dni, fecha_nac } = req.body;

  try {
    // 1. Buscar el rol de "Paciente"
    const rolRes = await pool.query("SELECT id_rol FROM rol WHERE nombre = $1", ['paciente']);
    if (rolRes.rows.length === 0) return res.status(400).json({ error: "Rol 'Paciente' no existe" });
    const id_rol = rolRes.rows[0].id_rol;

    // 2. Hashear contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // 3. Insertar en tabla usuario
    const userRes = await pool.query(
      "INSERT INTO usuario (nombre, apellido, telefono, mail, contrasenia, id_rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_usuario",
      [nombre, apellido, telefono, mail, hashedPassword, id_rol]
    );

    const id_usuario = userRes.rows[0].id_usuario;

    // 4. Insertar en tabla paciente
    await pool.query(
      "INSERT INTO paciente (id_paciente, fecha_nac, dni) VALUES ($1, $2, $3)",
      [id_usuario, fecha_nac, dni]
    );

    res.status(201).json({ message: "Usuario registrado correctamente", id_usuario });
  } catch (err) {
    console.error(err);
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
