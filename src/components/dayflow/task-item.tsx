"use client";

import React, { useState } from 'react';
import { format } from "date-fns";
import { Calendar, Edit, Tag, Flag, ChevronDown, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task, Subtask } from "@/lib/types";
import TaskForm from "./task-form";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from '../ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleComplete: (id: string, subtaskId?: string) => void;
  onAddSubtask: (taskId: string, subtaskTitle: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
}

const priorityClasses = {
  low: "border-l-blue-500",
  medium: "border-l-yellow-500",
  high: "border-l-red-500",
  none: "border-l-transparent",
};

const priorityFlagClasses = {
  low: "text-blue-500",
  medium: "text-yellow-500",
  high: "text-red-500",
  none: "text-gray-400",
}

export default function TaskItem({
  task,
  onUpdateTask,
  onDeleteTask,
  onToggleComplete,
  onAddSubtask,
  onDeleteSubtask,
}: TaskItemProps) {
  const [newSubtask, setNewSubtask] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddSubtask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      onAddSubtask(task.id, newSubtask.trim());
      setNewSubtask("");
    }
  };

  const taskItemVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } },
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
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <Card className={cn(
        "w-full transition-all duration-300 ease-in-out border-l-4",
        task.isCompleted ? "bg-card/60 shadow-none border-border" : "bg-card shadow-sm hover:shadow-lg",
        priorityClasses[task.priority]
      )}>
        <CardContent className="p-4 flex items-start gap-4">
          <Checkbox
            id={`task-${task.id}`}
            checked={task.isCompleted}
            onCheckedChange={() => onToggleComplete(task.id)}
            aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
            className="h-6 w-6 mt-1"
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
                  <span>{format(new Date(task.dueDate), "MMM d")}</span>
                </div>
              )}
              {task.priority !== "none" && (
                <div className={cn("flex items-center gap-1.5", priorityFlagClasses[task.priority])}>
                  <Flag className="h-3 w-3" />
                  <span className="capitalize">{task.priority}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {task.subtasks && task.subtasks.length > 0 && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")} />
                </Button>
              </CollapsibleTrigger>
            )}
            <TaskForm 
              mode="edit" 
              task={task} 
              onTaskSubmit={onUpdateTask}
            >
              <Button variant="ghost" size="icon" aria-label={`Edit task: ${task.title}`}>
                <Edit className="h-4 w-4" />
              </Button>
            </TaskForm>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={`Delete task: ${task.title}`}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the task "{task.title}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onDeleteTask(task.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
        <CollapsibleContent>
            <AnimatePresence>
            {isExpanded && (
                <motion.div 
                    className="pl-14 pr-6 pb-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                >
                    <div className="space-y-2">
                      <AnimatePresence>
                        {task.subtasks.map(subtask => (
                            <motion.div 
                                key={subtask.id}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center gap-3 group"
                            >
                                <Checkbox 
                                  id={`subtask-${subtask.id}`} 
                                  checked={subtask.isCompleted} 
                                  onCheckedChange={() => onToggleComplete(task.id, subtask.id)}
                                />
                                <label 
                                  htmlFor={`subtask-${subtask.id}`}
                                  className={cn("flex-grow text-sm", subtask.isCompleted && "line-through text-muted-foreground")}
                                >
                                  {subtask.title}
                                </label>
                                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100" onClick={() => onDeleteSubtask(task.id, subtask.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                </Button>
                            </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    <form onSubmit={handleAddSubtask} className="flex items-center gap-2 mt-3">
                        <Input 
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                            placeholder="Add a new subtask..."
                            className="h-8"
                        />
                        <Button type="submit" size="sm" variant="ghost">
                            <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                    </form>
                </motion.div>
            )}
            </AnimatePresence>
        </CollapsibleContent>
      </Card>
      </Collapsible>
    </motion.div>
  );
}
