"use client";

import SuggestedTasks from "@/components/dayflow/suggested-tasks";
import type { Task } from "@/lib/types";

interface DayflowHeaderProps {
  onTaskCreate: (taskData: Omit<Task, "id" | "isCompleted" | "createdAt" | "priority" | "dueDate">) => void;
  previousTaskTitles: string[];
  todaysCategories: string[];
}

export default function DayflowHeader({ 
  onTaskCreate, 
  previousTaskTitles, 
  todaysCategories 
}: DayflowHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Tasks</h1>
            <p className="text-muted-foreground">Here's what you've got on your plate.</p>
        </div>
        <SuggestedTasks 
            onTaskCreate={onTaskCreate}
            previousTaskTitles={previousTaskTitles}
            todaysCategories={todaysCategories}
        />
    </div>
  );
}
