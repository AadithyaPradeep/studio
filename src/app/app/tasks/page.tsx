
"use client";

import { useMemo } from "react";
import type { Task } from "@/lib/types";
import { useTasks } from "@/hooks/use-tasks";
import TaskList from "@/components/dayflow/task-list";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskForm from "@/components/dayflow/task-form";
import { isToday } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DayflowHeader from "@/components/dayflow/dayflow-header";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/dayflow/loading-skeleton";

export default function TasksPage() {
  const { 
    tasks,
    loading,
    addTask, 
    updateTask, 
    deleteTask, 
    toggleComplete, 
    addSubtask, 
    deleteSubtask,
  } = useTasks([]);

  const handleAddTask = (taskData: Omit<Task, "id" | "isCompleted" | "createdAt" | "subtasks">) => {
    const newTask: Omit<Task, "id" | "createdAt"> = {
      ...taskData,
      isCompleted: false,
      subtasks: [],
    };
    addTask(newTask);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    updateTask(updatedTask);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleToggleComplete = (id: string, subtaskId?: string) => {
    toggleComplete(id, subtaskId);
  };

  const handleAddSubtask = (taskId: string, subtaskTitle: string) => {
    addSubtask(taskId, subtaskTitle);
  };

  const handleDeleteSubtask = (taskId: string, subtaskId: string) => {
    deleteSubtask(taskId, subtaskId);
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

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
      <div className="max-w-4xl mx-auto">
        <DayflowHeader 
            onTaskCreate={handleAddTask}
            previousTaskTitles={previousTaskTitles}
            todaysCategories={todaysCategories}
        />
        
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
  );
}
