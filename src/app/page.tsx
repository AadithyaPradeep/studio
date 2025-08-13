"use client";

import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import TaskList from "@/components/dayflow/task-list";
import DayflowHeader from "@/components/dayflow/dayflow-header";
import { PlusCircle, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/dayflow/task-form";
import LoadingSkeleton from "@/components/dayflow/loading-skeleton";

// Polyfill for uuid in browser environments that might need it.
if (typeof window !== "undefined" && !window.crypto) {
  window.crypto = {
    // @ts-ignore
    getRandomValues: (arr) => {
      for (let i = 0, l = arr.length; i < l; i++) {
        arr[i] = Math.floor(Math.random() * 256);
      }
      return arr;
    },
  };
}

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("dayflow:tasks", []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddTask = (taskData: Omit<Task, "id" | "isCompleted" | "createdAt">) => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      isCompleted: false,
      createdAt: Date.now(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return b.createdAt - a.createdAt;
    });
  }, [tasks]);
  
  const previousTaskTitles = useMemo(() => tasks.map(task => task.title), [tasks]);
  const todaysCategories = useMemo(() => {
      const categories = tasks
        .filter(task => !task.isCompleted)
        .map(task => task.category);
      return [...new Set(categories)];
    }, [tasks]);


  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <DayflowHeader 
        onTaskCreate={handleAddTask}
        previousTaskTitles={previousTaskTitles}
        todaysCategories={todaysCategories}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ListTodo className="h-6 w-6 text-primary" />
              <h1 className="text-2xl md:text-3xl font-bold font-headline">
                Today's Flow
              </h1>
            </div>
            <TaskForm 
              mode="add" 
              onTaskSubmit={handleAddTask}
            >
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Task
              </Button>
            </TaskForm>
          </div>
          <TaskList
            tasks={sortedTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </main>
    </div>
  );
}
