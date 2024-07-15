import { ProjectDataResponse } from "@/lib/ProjectDataResponse";
import { ProjectTasksResponse } from "@/lib/ProjectTasksResponse";
import useSWR from "swr";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PieChart } from "lucide-react";
import { Pie } from "recharts";

export default function TaskDistribution() {
    const { data: project_data } = useSWR("/api/projects/{project_id}");

    const { data, error, isLoading } = useSWR(
        "/api/projects/{project_id}/tasks"
    );

    if (error) return <>Error {error}</>;
    if (isLoading) return <>Loading...</>;

    const status_pool = (project_data as ProjectDataResponse).status_pool;
    const tasks = (data as ProjectTasksResponse).tasks;

    const task_status_distribution = tasks.map((task) => {
        const distribution = tasks.filter(
            (t) =>
                (t.status.category === "complete" &&
                    task.status.category === "complete") ||
                (t.status.category === "incomplete" &&
                    task.status.category === "incomplete" &&
                    t.status.id === task.status.id)
        ).length;

        return {
            name: task.name,
            distribution,
        };
    });

    const chartConfig = {
        contribution: {
            label: "Contribution",
        },
    } satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>任务状态</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={task_status_distribution}
                            dataKey="contribution"
                            nameKey="name"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
