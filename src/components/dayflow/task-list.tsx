"use client";

import TaskItem from "./task-item";
import type { Task } from "@/lib/types";
import { FilePlus2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export default function TaskList({
  tasks,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-24 px-4 border-2 border-dashed rounded-xl bg-card/50">
        <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground/50" />
        <h3 className="mt-6 text-xl font-semibold text-foreground">
          No tasks yet
        </h3>
        <p className="mt-2 text-base text-muted-foreground">
          Click "Add New Task" to get started!
        </p>
      </div>
    );
  }

  return (
    <motion.div layout className="space-y-3">
      <AnimatePresence>
        {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onUpdateTask={onUpdateTask}
              onDeleteTask={onDeleteTask}
              onToggleComplete={onToggleComplete}
            />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
