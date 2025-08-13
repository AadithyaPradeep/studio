export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string | null;
  isCompleted: boolean;
  createdAt: number;
  priority: "low" | "medium" | "high" | "none";
  subtasks: Subtask[];
}
