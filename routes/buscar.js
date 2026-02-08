import express from "express";

import { buscarEnNeon } from "../modules/neon.js";
import { buscarEnWikipedia } from "../modules/wikipedia.js";
import { buscarEnDuckDuckGo } from "../modules/duckduckgo.js";
import { buscarEnGoogle } from "../modules/google.js";
import { buscarEnYouTube } from "../modules/youtube.js";
import { buscarEnGitHub } from "../modules/github.js";
import { buscarEnReddit } from "../modules/reddit.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const q = req.query.q || "";

  try {
    const [
      neon,
      wiki,
      ddg,
      google,
      youtube,
      github,
      reddit
    ] = await Promise.all([
      buscarEnNeon(q),
      buscarEnWikipedia(q),
      buscarEnDuckDuckGo(q),
      buscarEnGoogle(q),
      buscarEnYouTube(q),
      buscarEnGitHub(q),
      buscarEnReddit(q)
    ]);

    res.json({
      ok: true,
      data: [
        ...neon,
        ...wiki,
        ...ddg,
        ...google,
        ...youtube,
        ...github,
        ...reddit
      ]
    });
  } catch (error) {
    res.json({ ok: false, error: "Error en motor híbrido" });
  }
});

export default router;
