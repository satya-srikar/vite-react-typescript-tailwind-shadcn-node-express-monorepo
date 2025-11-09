import cors from "cors";
import express from "express";

import { healthRouter } from "./routes/health.js";
import { projectRouter } from "./routes/projects.js";

const app = express();

const allowedOrigins = process.env.CORS_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean) ?? ["http://localhost:5173", "http://localhost:4173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api", healthRouter);
app.use("/api", projectRouter);

app.get("/", (_req, res) => {
  res.json({ message: "Workspace backend is up" });
});

const port = Number.parseInt(process.env.PORT ?? "3000", 10);

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
