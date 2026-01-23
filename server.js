import cors from "cors";

app.use(cors({
  origin: "https://telemetr-a-production-8eb9.up.railway.app"
}));

import express from "express";
import pool from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Ruta base
app.get("/", (req, res) => {
  res.json({ status: "Telemetr-a API running" });
});

// GET /dispositivos
app.get("/dispositivos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM dispositivos");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /dispositivos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// POST /dispositivos
app.post("/dispositivos", async (req, res) => {
  const { uuid_dispositivo, plataforma, descripcion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO dispositivos (uuid_dispositivo, plataforma, descripcion)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [uuid_dispositivo, plataforma, descripcion]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /dispositivos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`Telemetr-a API running on port ${port}`);
});

app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eventos ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /eventos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.post("/eventos", async (req, res) => {
  const { uuid_dispositivo, tipo, payload } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO eventos (uuid_dispositivo, tipo, payload)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [uuid_dispositivo, tipo, payload]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /eventos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.get("/logs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM logs ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /logs:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.post("/logs", async (req, res) => {
  const { uuid_dispositivo, nivel, mensaje, contexto } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO logs (uuid_dispositivo, nivel, mensaje, contexto)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [uuid_dispositivo, nivel, mensaje, contexto]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /logs:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.get("/metricas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM metricas ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /metricas:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.post("/metricas", async (req, res) => {
  const { uuid_dispositivo, nombre, valor, unidad } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO metricas (uuid_dispositivo, nombre, valor, unidad)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [uuid_dispositivo, nombre, valor, unidad]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /metricas:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});


