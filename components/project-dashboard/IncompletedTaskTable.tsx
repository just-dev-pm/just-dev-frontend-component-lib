"use client";

import { ProjectTasksResponse, Task } from "@/lib/ProjectTasksResponse";
import { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";
import { DataTable } from "../ui/data-table";
import { ProjectDataResponse, StatusPool } from "@/lib/ProjectDataResponse";
import { Circle, CircleCheck } from "lucide-react";

const getColumns: (
    status_pool: StatusPool | null | undefined
) => ColumnDef<Task>[] = (status_pool) => {
    let status_column: ColumnDef<Task>[] = [];
    if (status_pool) {
        status_column = [
            {
                accessorKey: "status",
                header: "状态",
                cell: ({ row }) => {
                    const status = row.original.status;

                    return (
                        <div className="flex gap-2 items-center">
                            <Circle className="w-4 h-4" />
                            <span>
                                {
                                    status_pool.incomplete.find(
                                        (i) => i.id === status.id!
                                    )?.status.name
                                }
                            </span>
                        </div>
                    );
                },
            },
        ];
    }
    return [
        {
            accessorKey: "name",
            header: "任务",
        },
        {
            accessorKey: "deadline",
            header: "截止日期",
        },
        ...status_column,
    ];
};

export default function IncompletedTaskTable() {
    const { data: project_data } = useSWR("/api/projects/{project_id}");

    const { data, error, isLoading } = useSWR(
        "/api/projects/{project_id}/tasks"
    );

    if (error) return <>Error {error}</>;
    if (isLoading) return <>Loading...</>;

    const tasks = (data as ProjectTasksResponse).tasks.filter(
        (task) => task.status.category === "incomplete"
    );

    const status_pool = (project_data as ProjectDataResponse).status_pool;

    const columns = getColumns(status_pool);

    return <DataTable columns={columns} data={tasks} />;
}
