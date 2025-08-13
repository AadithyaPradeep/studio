"use client";

import { BrainCircuit } from "lucide-react";
import SuggestedTasks from "@/components/dayflow/suggested-tasks";
import type { Task } from "@/lib/types";

interface DayflowHeaderProps {
  onTaskCreate: (taskData: Omit<Task, "id" | "isCompleted" | "createdAt">) => void;
  previousTaskTitles: string[];
  todaysCategories: string[];
}

export default function DayflowHeader({ 
  onTaskCreate, 
  previousTaskTitles, 
  todaysCategories 
}: DayflowHeaderProps) {
  return (
    <header className="border-b border-border/40 bg-card">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold font-headline tracking-tight">
              DayFlow
            </span>
          </div>
          <SuggestedTasks 
            onTaskCreate={onTaskCreate}
            previousTaskTitles={previousTaskTitles}
            todaysCategories={todaysCategories}
          />
        </div>
      </div>
    </header>
  );
}
