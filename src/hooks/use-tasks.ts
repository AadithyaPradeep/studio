
"use client";

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Task, Subtask } from '@/lib/types';
import { v4 as uuidv4 } from "uuid";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => {
        const data = doc.data();
        
        let createdAtMillis: number;
        if (data.createdAt instanceof Timestamp) {
            createdAtMillis = data.createdAt.toMillis();
        } else if (typeof data.createdAt === 'number') {
            createdAtMillis = data.createdAt;
        } else {
            createdAtMillis = Date.now();
        }

        let dueDateISO: string | null = null;
        if (data.dueDate) {
          if (data.dueDate instanceof Timestamp) {
            dueDateISO = data.dueDate.toDate().toISOString();
          } else if (typeof data.dueDate === 'string') {
            dueDateISO = data.dueDate;
          }
        }

        return {
          id: doc.id,
          ...data,
          dueDate: dueDateISO,
          createdAt: createdAtMillis,
        } as Task;
      });
      setTasks(tasksData);
    }, (error) => {
      console.error("Error fetching tasks:", error);
    });

    return () => unsubscribe();
  }, []);

  const addTask = useCallback(async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        createdAt: Timestamp.now(),
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null
      });
    } catch (error) {
      console.error('Error adding task: ', error);
    }
  }, []);

  const updateTask = useCallback(async (task: Task) => {
    try {
      const taskRef = doc(db, 'tasks', task.id);
      const { id, ...taskData } = task;
      await updateDoc(taskRef, {
        ...taskData,
        dueDate: taskData.dueDate ? new Date(taskData.dueDate) : null
      });
    } catch (error) {
      console.error('Error updating task: ', error);
    }
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  }, []);

  const toggleComplete = useCallback(async (id: string, subtaskId?: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (subtaskId) {
      const updatedSubtasks = task.subtasks.map(sub => 
        sub.id === subtaskId ? { ...sub, isCompleted: !sub.isCompleted } : sub
      );
      const allSubtasksCompleted = updatedSubtasks.every(s => s.isCompleted);
      await updateTask({ 
        ...task, 
        subtasks: updatedSubtasks,
        isCompleted: allSubtasksCompleted ? true : task.isCompleted,
      });
    } else {
      const newCompletionState = !task.isCompleted;
      await updateTask({ 
        ...task, 
        isCompleted: newCompletionState,
        subtasks: task.subtasks.map(s => ({ ...s, isCompleted: newCompletionState }))
      });
    }
  }, [tasks, updateTask]);

  const addSubtask = useCallback(async (taskId: string, subtaskTitle: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newSubtask: Subtask = {
      id: uuidv4(),
      title: subtaskTitle,
      isCompleted: false,
    };
    
    await updateTask({
      ...task,
      subtasks: [...task.subtasks, newSubtask]
    });
  }, [tasks, updateTask]);

  const deleteSubtask = useCallback(async (taskId: string, subtaskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    await updateTask({
      ...task,
      subtasks: task.subtasks.filter(s => s.id !== subtaskId)
    });
  }, [tasks, updateTask]);

  return { tasks, addTask, updateTask, deleteTask, toggleComplete, addSubtask, deleteSubtask };
}
