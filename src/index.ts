import express from "express";
import cors from "cors";
import helmet from "helmet";
import pino from "pino";

const logger = pino({ level: process.env.LOG_LEVEL || "info" });

const app = express();
const port = parseInt(process.env.PORT || "3001", 10);

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "saas-api", timestamp: new Date().toISOString() });
});

app.get("/api/v1/status", (_req, res) => {
  res.json({ version: "0.1.0", environment: process.env.NODE_ENV || "development" });
});

const server = app.listen(port, () => {
  logger.info({ port }, "saas-api server started");
});

const shutdown = (signal: string) => {
  logger.info({ signal }, "Shutting down gracefully");
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000);
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

export default app;
