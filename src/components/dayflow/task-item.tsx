"use client";

import { format } from "date-fns";
import { Calendar, Edit, Tag, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/lib/types";
import TaskForm from "./task-form";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const priorityClasses = {
  low: "border-l-green-400",
  medium: "border-l-yellow-400",
  high: "border-l-red-500",
};

export default function TaskItem({
  task,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}: TaskItemProps) {
  const taskItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      layout
      variants={taskItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={!task.isCompleted ? 'hover' : ''}
      className="w-full"
    >
      <Card className={cn(
        "w-full transition-all duration-300 ease-in-out border-l-4",
        task.isCompleted ? "bg-card/60 shadow-none border-border" : "bg-card shadow-sm hover:shadow-lg",
        priorityClasses[task.priority]
      )}>
        <CardContent className="p-4 flex items-center gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
            className="h-6 w-6"
          />
          <div className="flex-grow grid gap-1">
            <label 
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-semibold text-base leading-tight cursor-pointer transition-colors duration-300",
                task.isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-4 text-sm text-muted-foreground select-none">
              <div className="flex items-center gap-1.5">
                <Tag className="h-3 w-3" />
                <Badge variant="outline" className="rounded-full text-xs">{task.category}</Badge>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" />
                  <span>{format(new Date(task.dueDate), "MMM d, yyyy")}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <TaskForm 
              mode="edit" 
              task={task} 
              onTaskSubmit={onUpdateTask}
              onDelete={onDeleteTask}
            >
              <Button variant="ghost" size="icon" aria-label={`Edit task: ${task.title}`}>
                <Edit className="h-4 w-4" />
              </Button>
            </TaskForm>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
