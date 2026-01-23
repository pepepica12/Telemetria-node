import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS — debe ir después de crear app
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// Ruta base - Dashboard with Vercel Web Analytics
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Telemetría API Dashboard</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .status {
      color: #22c55e;
      font-size: 14px;
      font-weight: 500;
    }
    .endpoints {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h2 {
      margin: 0 0 20px 0;
      color: #333;
    }
    .endpoint {
      display: flex;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .endpoint:last-child {
      border-bottom: none;
    }
    .method {
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 4px;
      margin-right: 12px;
      font-size: 12px;
      min-width: 50px;
      text-align: center;
    }
    .get {
      background: #dbeafe;
      color: #1e40af;
    }
    .post {
      background: #dcfce7;
      color: #166534;
    }
    .path {
      font-family: 'Courier New', monospace;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔬 Telemetría API</h1>
    <p class="status">✓ API Running</p>
  </div>
  
  <div class="endpoints">
    <h2>Available Endpoints</h2>
    <div class="endpoint">
      <span class="method get">GET</span>
      <span class="path">/dispositivos</span>
    </div>
    <div class="endpoint">
      <span class="method post">POST</span>
      <span class="path">/dispositivos</span>
    </div>
    <div class="endpoint">
      <span class="method get">GET</span>
      <span class="path">/eventos</span>
    </div>
    <div class="endpoint">
      <span class="method post">POST</span>
      <span class="path">/eventos</span>
    </div>
    <div class="endpoint">
      <span class="method get">GET</span>
      <span class="path">/logs</span>
    </div>
    <div class="endpoint">
      <span class="method post">POST</span>
      <span class="path">/logs</span>
    </div>
    <div class="endpoint">
      <span class="method get">GET</span>
      <span class="path">/metricas</span>
    </div>
    <div class="endpoint">
      <span class="method post">POST</span>
      <span class="path">/metricas</span>
    </div>
  </div>

  <!-- Vercel Web Analytics -->
  <script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  </script>
  <script defer src="/_vercel/insights/script.js"></script>
</body>
</html>
  `);
});

// API status endpoint (JSON response)
app.get("/api/status", (req, res) => {
  res.json({ status: "Telemetría API running", ok: true });
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

// GET /eventos
app.get("/eventos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM eventos ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /eventos:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// POST /eventos
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

// GET /logs
app.get("/logs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM logs ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /logs:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// POST /logs
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

// GET /metricas
app.get("/metricas", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM metricas ORDER BY id DESC");
    res.json({ ok: true, data: result.rows });
  } catch (error) {
    console.error("Error GET /metricas:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// POST /metricas
app.post("/metricas", async (req, res) => {
  const { uuid_dispositivo, tipo, valor } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO metricas (uuid_dispositivo, tipo, valor)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [uuid_dispositivo, tipo, valor]
    );

    res.json({ ok: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error POST /metricas:", error);
    res.status(500).json({ ok: false, error: "Database error" });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Telemetr-a API running on port ${port}`);
});
