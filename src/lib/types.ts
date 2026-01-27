export type Task = {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
  deadline: Date | null;
  status: 'todo' | 'in-progress' | 'done';
};
