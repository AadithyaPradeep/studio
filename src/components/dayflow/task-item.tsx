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
  return (
    <Card className={cn(
      "w-full transition-all duration-300 ease-in-out",
      task.isCompleted ? "bg-card/50" : "bg-card"
    )}>
      <CardContent className="p-4 flex items-center gap-4">
        <Checkbox
          id={`task-${task.id}`}
          checked={task.isCompleted}
          onCheckedChange={() => onToggleComplete(task.id)}
          aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
          className="h-5 w-5"
        />
        <div className="flex-grow grid gap-1">
          <label 
            htmlFor={`task-${task.id}`}
            className={cn(
              "font-medium leading-none cursor-pointer",
              task.isCompleted && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </label>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Tag className="h-3 w-3" />
              <Badge variant="secondary">{task.category}</Badge>
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
  );
}
