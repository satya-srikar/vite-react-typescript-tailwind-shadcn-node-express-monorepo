export type ServiceStatus = "ok" | "degraded" | "offline";

export interface HealthStatus {
  service: string;
  status: ServiceStatus;
  responseTimeMs: number;
  timestamp: string;
}

export type ProjectStatus = "planning" | "active" | "blocked" | "complete";

export interface ProjectSummary {
  id: string;
  name: string;
  owner: string;
  status: ProjectStatus;
  milestonesCompleted: number;
  totalMilestones: number;
  updatedAt: string;
}

export type ApiSuccess<TData> = {
  success: true;
  data: TData;
  meta?: Record<string, unknown>;
};

export type ApiFailure = {
  success: false;
  error: string;
};

export type ApiResponse<TData> = ApiSuccess<TData> | ApiFailure;
