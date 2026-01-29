import type { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { LoadingAnimation } from './LoadingAnimation';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function TaskList({ tasks, isLoading, onUpdateTask, onDeleteTask, onToggleStatus }: TaskListProps) {
  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
        <h3 className="text-xl font-medium text-muted-foreground">You're all caught up!</h3>
        <p className="mt-2 text-sm text-muted-foreground">Add a new task to get started.</p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'done' && b.status !== 'done') return 1;
    if (a.status !== 'done' && b.status === 'done') return -1;
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sortedTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
