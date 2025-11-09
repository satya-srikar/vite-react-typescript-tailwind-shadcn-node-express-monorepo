import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StarIcon } from "lucide-react";

import { Button } from "@workspace/shared/components/shadcn/button";
import { Badge } from "@workspace/shared/components/shadcn/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/shared/components/shadcn/card";
import type {
  ApiResponse,
  HealthStatus,
  ProjectSummary,
} from "@workspace/shared/types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000/api";

async function fetchApi<T>(path: string) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed (${response.status})`);
  }

  return (await response.json()) as ApiResponse<T>;
}

function App() {
  const [healthResponse, setHealthResponse] =
    useState<ApiResponse<HealthStatus> | null>(null);
  const [projectsResponse, setProjectsResponse] = useState<ApiResponse<
    ProjectSummary[]
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const hydrate = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [health, projects] = await Promise.all([
        fetchApi<HealthStatus>("/health"),
        fetchApi<ProjectSummary[]>("/projects"),
      ]);

      if (abortRef.current) {
        return;
      }

      setHealthResponse(health);
      setProjectsResponse(projects);
    } catch (err) {
      if (abortRef.current) {
        return;
      }

      const message =
        err instanceof Error ? err.message : "Failed to reach the API";
      setError(message);
    } finally {
      if (!abortRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    abortRef.current = false;
    hydrate();

    return () => {
      abortRef.current = true;
    };
  }, [hydrate]);

  const { healthData, projects, projectError } = useMemo(() => {
    return {
      healthData: healthResponse?.success ? healthResponse.data : null,
      projects: projectsResponse?.success ? projectsResponse.data : [],
      projectError:
        projectsResponse && !projectsResponse.success
          ? projectsResponse.error
          : null,
    };
  }, [healthResponse, projectsResponse]);

  return (
    <div className="min-h-screen w-screen px-4 py-8 sm:px-8">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em]">Workspace status</p>
        <h1 className="text-4xl font-semibold">Operations overview</h1>
      </header>

      {error && (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load data</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API health</CardTitle>
            <CardDescription>
              Live ping data from the backend service
            </CardDescription>
            <CardAction>
              <Badge
                variant={
                  loading
                    ? "outline"
                    : healthData?.status === "ok"
                    ? "default"
                    : healthData?.status === "degraded"
                    ? "destructive"
                    : "secondary"
                }
              >
                {loading
                  ? "Checking"
                  : healthData?.status.toLocaleUpperCase() ?? "offline"}
              </Badge>
            </CardAction>
          </CardHeader>

          <CardContent>
            {loading && !healthData && <p>Fetching current health…</p>}

            {!loading && !healthData && (
              <p>
                {healthResponse && !healthResponse.success
                  ? healthResponse.error
                  : "No health data received."}
              </p>
            )}

            {healthData && (
              <div className="space-y-2">
                <p className="text-3xl font-semibold">{healthData.service}</p>
                <p>Response time: {healthData.responseTimeMs}ms</p>
                <p className="text-sm">
                  Last ping {new Date(healthData.timestamp).toLocaleString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project tracker</CardTitle>
            <CardDescription>
              Data comes directly from the backend /projects API
            </CardDescription>
            <CardAction>
              <Button onClick={hydrate} size="sm" variant="secondary">
                Refresh
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            {loading && projects.length === 0 && <p>Loading projects…</p>}

            {projectError && <p className="text-sm">{projectError}</p>}

            {projects.length > 0 && (
              <div className="space-y-3">
                <p>
                  Tracking {projects.length} project
                  {projects.length === 1 ? "" : "s"}
                </p>
                <ul className="space-y-3">
                  {projects.map((project) => (
                    <li
                      key={project.id}
                      className="rounded-lg border px-4 py-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold">
                            {project.name}
                          </p>
                          <p className="text-sm">Lead • {project.owner}</p>
                        </div>
                        <span className="rounded-full border px-3 py-1 text-xs uppercase tracking-widest">
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm">
                        Milestones {project.milestonesCompleted} /{" "}
                        {project.totalMilestones}
                      </p>
                      <p className="text-xs">
                        Updated{" "}
                        {new Date(project.updatedAt).toLocaleDateString(
                          undefined,
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Button variants</CardTitle>
          <CardDescription>
            Components pulled from the shared UI package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-sm">
              <StarIcon />
            </Button>
            <Button size="icon">
              <StarIcon />
            </Button>
            <Button size="icon-lg">
              <StarIcon />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-xs">
          Values above are rendered with live types shared between frontend,
          storybook and backend.
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;
