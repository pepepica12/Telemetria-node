import pool from "../db.js";

export async function buscarEnNeon(q) {
  const result = await pool.query(`
    SELECT 'dispositivo' AS tipo, uuid_dispositivo AS titulo, descripcion
    FROM dispositivos
    WHERE uuid_dispositivo ILIKE $1 OR descripcion ILIKE $1

    UNION ALL

    SELECT 'evento', tipo, payload::text
    FROM eventos
    WHERE tipo ILIKE $1

    UNION ALL

    SELECT 'log', nivel, mensaje
    FROM logs
    WHERE mensaje ILIKE $1

    UNION ALL

    SELECT 'metrica', tipo, valor::text
    FROM metricas
    WHERE tipo ILIKE $1
  `, [`%${q}%`]);

  return result.rows.map(r => ({
    titulo: r.titulo,
    descripcion: r.descripcion,
    tipo: r.tipo,
    enlace: null
  }));
}
