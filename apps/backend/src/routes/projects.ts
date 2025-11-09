import type { ApiResponse, ProjectSummary } from "@workspace/shared/types";
import { Router } from "express";

const projectRouter = Router();

const projects: ProjectSummary[] = [
  {
    id: "p-1",
    name: "Unified Login",
    owner: "Jessie",
    status: "active",
    milestonesCompleted: 3,
    totalMilestones: 5,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
  },
  {
    id: "p-2",
    name: "Billing Refresh",
    owner: "Diya",
    status: "planning",
    milestonesCompleted: 1,
    totalMilestones: 4,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
  },
  {
    id: "p-3",
    name: "Analytics QA",
    owner: "Haruki",
    status: "blocked",
    milestonesCompleted: 2,
    totalMilestones: 6,
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  }
];

projectRouter.get("/projects", (_req, res) => {
  const response: ApiResponse<ProjectSummary[]> = {
    success: true,
    data: projects,
    meta: { total: projects.length }
  };

  res.json(response);
});

export { projectRouter };
