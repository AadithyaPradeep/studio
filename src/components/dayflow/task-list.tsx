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
      <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg">
        <FilePlus2 className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium text-foreground">
          No tasks yet
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Get started by adding a new task.
        </p>
      </div>
    );
  }

  return (
    <motion.div layout className="space-y-3">
      <AnimatePresence initial={false}>
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
