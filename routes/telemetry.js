import fs from "fs";
import express from "express";

const router = express.Router();

router.get("/telemetry/logs", (req, res) => {
    const logs = fs.readFileSync("telemetry.log", "utf8");
    res.type("text/plain").send(logs);
});

export default router;
