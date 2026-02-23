export async function buscarEnWikipedia(q) {
  const r = await fetch(
    `https://es.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=${q}`
  );
  const data = await r.json();

  return data.query.search.map(item => ({
    titulo: item.title,
    descripcion: item.snippet,
    tipo: "wikipedia",
    enlace: `https://es.wikipedia.org/wiki/${encodeURIComponent(item.title)}`
  }));
}
