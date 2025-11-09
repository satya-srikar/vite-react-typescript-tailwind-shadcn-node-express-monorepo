import type { ApiResponse, HealthStatus } from "@workspace/shared/types";
import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (_req, res) => {
  const response: ApiResponse<HealthStatus> = {
    success: true,
    data: {
      service: "backend-api",
      status: "ok",
      responseTimeMs: Math.round(Math.random() * 20) + 5,
      timestamp: new Date().toISOString()
    }
  };

  res.json(response);
});

export { healthRouter };
