export async function buscarEnReddit(q) {
  const r = await fetch(
    `https://www.reddit.com/search.json?q=${q}`,
    { headers: { "User-Agent": process.env.REDDIT_USER_AGENT } }
  );
  const data = await r.json();

  return data.data.children.map(post => ({
    titulo: post.data.title,
    descripcion: post.data.selftext || "",
    tipo: "reddit",
    enlace: `https://reddit.com${post.data.permalink}`
  }));
}
