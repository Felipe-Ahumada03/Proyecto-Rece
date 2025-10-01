const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // cambia si tu usuario es otro
  password: "",       // pon tu contraseña de MySQL si tienes
  database: "citas"   // tu base de datos
});

// Verificar conexión
db.connect((err) => {
  if (err) {
    console.error("Error al conectar con MySQL:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// ====================== RUTAS ======================

// 1. GET: obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuario";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error en la consulta");
    res.json(results);
  });
});

// 2. GET: obtener un usuario por ID
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuario WHERE id_usuario = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).send("Error en la consulta");
    if (results.length === 0) return res.status(404).send("Usuario no encontrado");
    res.json(results[0]);
  });
});

// 3. POST: insertar un usuario
app.post("/usuarios", (req, res) => {
  const { Nombre_usuario, Contraseña, Rol } = req.body;
  const sql = "INSERT INTO usuario (Nombre_usuario, Contraseña, Rol) VALUES (?, ?, ?)";
  db.query(sql, [Nombre_usuario, Contraseña, Rol], (err, result) => {
    if (err) return res.status(500).send("Error al insertar usuario");
    res.send("Usuario agregado correctamente ");
  });
});

// 4. PUT: actualizar un usuario por ID
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { Nombre_usuario, Contraseña, Rol } = req.body;
  const sql = "UPDATE usuario SET Nombre_usuario = ?, Contraseña = ?, Rol = ? WHERE id_usuario = ?";
  db.query(sql, [Nombre_usuario, Contraseña, Rol, id], (err, result) => {
    if (err) return res.status(500).send("Error al actualizar usuario");
    if (result.affectedRows === 0) return res.status(404).send("Usuario no encontrado");
    res.send("Usuario actualizado correctamente ");
  });
});

// 5. DELETE: eliminar un usuario por ID
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuario WHERE id_usuario = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send("Error al eliminar usuario");
    if (result.affectedRows === 0) return res.status(404).send("Usuario no encontrado");
    res.send("Usuario eliminado correctamente ");
  });
});

// ===================================================

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
