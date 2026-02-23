export async function buscarEnGoogle(q) {
  const r = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${q}`
  );
  const data = await r.json();

  return data.items?.map(item => ({
    titulo: item.title,
    descripcion: item.snippet,
    tipo: "google",
    enlace: item.link
  })) || [];
}
