"use client";

import { useState, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Task, Subtask } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import TaskList from "@/components/dayflow/task-list";
import DayflowHeader from "@/components/dayflow/dayflow-header";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/dayflow/task-form";
import LoadingSkeleton from "@/components/dayflow/loading-skeleton";
import SummaryHeader from "@/components/dayflow/summary-header";
import { isToday } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("dayflow:tasks", []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Task Handlers
  const handleAddTask = (taskData: Omit<Task, "id" | "isCompleted" | "createdAt" | "subtasks">) => {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      isCompleted: false,
      createdAt: Date.now(),
      subtasks: [],
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

  const handleToggleComplete = (id: string, subtaskId?: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === id) {
          if (subtaskId) {
            const updatedSubtasks = task.subtasks.map(sub => 
              sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub
            );
            const allSubtasksCompleted = updatedSubtasks.every(s => s.isCompleted);
            return { 
              ...task, 
              subtasks: updatedSubtasks,
              isCompleted: allSubtasksCompleted ? true : task.isCompleted,
            };
          } else {
            const newCompletionState = !task.isCompleted;
            return { 
              ...task, 
              isCompleted: newCompletionState,
              subtasks: task.subtasks.map(s => ({ ...s, isCompleted: newCompletionState }))
            };
          }
        }
        return task;
      })
    );
  };

  const handleAddSubtask = (taskId: string, subtaskTitle: string) => {
    const newSubtask: Subtask = {
      id: uuidv4(),
      title: subtaskTitle,
      isCompleted: false,
    };
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, subtasks: [...task.subtasks, newSubtask] }
          : task
      )
    );
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, subtasks: task.subtasks.filter(s => s.id !== subtaskId) }
          : task
      )
    );
  };

  const priorityOrder = { high: 0, medium: 1, low: 2, none: 3 };

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority] || b.createdAt - a.createdAt;
    });
  }, [tasks]);

  const todayTasks = useMemo(() => {
    return sortedTasks.filter(task => 
      !task.isCompleted && task.dueDate && isToday(new Date(task.dueDate))
    )
  }, [sortedTasks]);
  
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
        <div className="max-w-3xl mx-auto">
          <SummaryHeader tasks={tasks} />
          
          <div className="flex justify-end items-center mb-6">
            <TaskForm 
              mode="add" 
              onTaskSubmit={handleAddTask}
            >
              <Button size="lg" className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Task
              </Button>
            </TaskForm>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <TaskList
                tasks={sortedTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onAddSubtask={handleAddSubtask}
                onDeleteSubtask={handleDeleteSubtask}
              />
            </TabsContent>
            <TabsContent value="today">
              <TaskList
                tasks={todayTasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
                onAddSubtask={handleAddSubtask}
                onDeleteSubtask={handleDeleteSubtask}
              />
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </div>
  );
}
