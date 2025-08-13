
import TaskListWrapper from "@/components/dayflow/task-list-wrapper";
import Mascot from "@/components/dayflow/mascot";

export default function TasksPage() {
  return (
    <div className="max-w-4xl mx-auto">
        <TaskListWrapper />
        <div className="mt-8">
            <Mascot />
        </div>
    </div>
  );
}
