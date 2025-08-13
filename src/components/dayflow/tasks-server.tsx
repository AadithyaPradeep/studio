
import { 
  collection, 
  getDocs, 
  Timestamp,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase-admin';
import type { Task } from "@/lib/types";
import TasksClient from './tasks-client';

async function getTasks(): Promise<Task[]> {
  const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  
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
        dueDateISO = new Date(data.dueDate).toISOString();
      }
    }

    return {
      id: doc.id,
      title: data.title,
      category: data.category,
      isCompleted: data.isCompleted,
      priority: data.priority,
      subtasks: data.subtasks || [],
      dueDate: dueDateISO,
      createdAt: createdAtMillis,
    } as Task;
  });

  return tasksData;
}


export default async function TasksServer() {
  const initialTasks = await getTasks();

  return <TasksClient initialTasks={initialTasks} />
}
