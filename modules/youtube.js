export async function buscarEnYouTube(q) {
  const r = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await r.json();

  return data.items?.map(item => ({
    titulo: item.snippet.title,
    descripcion: item.snippet.description,
    tipo: "youtube",
    enlace: `https://youtube.com/watch?v=${item.id.videoId}`
  })) || [];
}
