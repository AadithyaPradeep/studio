
import TasksServer from "@/components/dayflow/tasks-server";
import { Suspense } from "react";
import LoadingSkeleton from "@/components/dayflow/loading-skeleton";

export default function TasksPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <TasksServer />
    </Suspense>
  );
}
