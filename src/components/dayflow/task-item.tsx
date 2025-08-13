"use client";

import { format } from "date-fns";
import { Calendar, Edit, Tag } from "lucide-react";
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

export default function TaskItem({
  task,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
}: TaskItemProps) {
  const cardVariants = {
    checked: { 
      opacity: 0.5, 
      scale: 0.95, 
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    unchecked: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" } 
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial={false}
      animate={task.isCompleted ? "checked" : "unchecked"}
      exit={{ opacity: 0, y: 20 }}
      className="w-full"
    >
      <Card className={cn(
        "w-full transition-shadow duration-300 ease-in-out hover:shadow-xl",
        task.isCompleted ? "bg-card/60" : "bg-card hover:-translate-y-1"
      )}>
        <CardContent className="p-4 flex items-center gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
            className="h-6 w-6 rounded-full"
          />
          <div className="flex-grow grid gap-1">
            <label 
              htmlFor={`task-${task.id}`}
              className={cn(
                "font-semibold text-lg leading-none cursor-pointer transition-colors duration-300",
                task.isCompleted && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </label>
            <div className="flex items-center gap-4 text-sm text-muted-foreground select-none">
              <div className="flex items-center gap-1.5">
                <Tag className="h-4 w-4" />
                <Badge variant="secondary" className="rounded-full">{task.category}</Badge>
              </div>
              {task.dueDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
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
                <Edit className="h-5 w-5" />
              </Button>
            </TaskForm>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
