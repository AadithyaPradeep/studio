
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Task, Subtask } from '@/lib/types';
import { useLocalStorage } from './use-local-storage';
import { v4 as uuidv4 } from "uuid";

export function useTasks(initialTasks: Task[] = []) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', initialTasks);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
        ...taskData,
        id: uuidv4(),
        createdAt: Date.now(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  const updateTask = useCallback((updatedTask: Task) => {
    setTasks(prevTasks => 
        prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  const toggleComplete = useCallback((id: string, subtaskId?: string) => {
    setTasks(prevTasks => {
        const newTasks = prevTasks.map(task => {
            if (task.id === id) {
                if (subtaskId) {
                    const updatedSubtasks = task.subtasks.map(sub =>
                        sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub
                    );
                    const allSubtasksCompleted = updatedSubtasks.every(s => s.isCompleted);
                    return { ...task, subtasks: updatedSubtasks, isCompleted: allSubtasksCompleted };
                }
                const newCompletionState = !task.isCompleted;
                return {
                    ...task,
                    isCompleted: newCompletionState,
                    subtasks: task.subtasks.map(s => ({ ...s, isCompleted: newCompletionState }))
                };
            }
            return task;
        });
        return newTasks;
    });
  }, [setTasks]);

  const addSubtask = useCallback((taskId: string, subtaskTitle: string) => {
    const newSubtask: Subtask = {
      id: uuidv4(),
      title: subtaskTitle,
      isCompleted: false,
    };
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, subtasks: [...task.subtasks, newSubtask] } : task
      )
    );
  }, [setTasks]);

  const deleteSubtask = useCallback((taskId: string, subtaskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, subtasks: task.subtasks.filter(s => s.id !== subtaskId) } : task
      )
    );
  }, [setTasks]);

  return { tasks, loading, addTask, updateTask, deleteTask, toggleComplete, addSubtask, deleteSubtask };
}
