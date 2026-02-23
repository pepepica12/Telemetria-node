export async function buscarEnGitHub(q) {
  const r = await fetch(
    `https://api.github.com/search/repositories?q=${q}`
  );
  const data = await r.json();

  return data.items?.map(repo => ({
    titulo: repo.full_name,
    descripcion: repo.description,
    tipo: "github",
    enlace: repo.html_url
  })) || [];
}
