export interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string | null;
  isCompleted: boolean;
  createdAt: number;
}
