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
  startTime: string | null;
  endTime: string | null;
  isCompleted: boolean;
  createdAt: number;
  priority: "low" | "medium" | "high" | "none";
  subtasks: Subtask[];
}

export interface Habit {
  id: string;
  title: string;
  completions: Record<string, boolean>;
}
