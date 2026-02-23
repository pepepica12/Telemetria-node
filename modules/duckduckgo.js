export async function buscarEnDuckDuckGo(q) {
  const r = await fetch(
    `https://api.duckduckgo.com/?q=${q}&format=json`
  );
  const data = await r.json();

  if (!data.Abstract) return [];

  return [{
    titulo: data.Heading,
    descripcion: data.Abstract,
    tipo: "duckduckgo",
    enlace: data.AbstractURL
  }];
}
