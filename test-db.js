import pool from "./db.js";

const test = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión OK:", res.rows);
  } catch (err) {
    console.error("Error de conexión:", err);
  }
};

test();
