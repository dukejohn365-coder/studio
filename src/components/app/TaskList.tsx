import type { Task } from '@/lib/types';
import { TaskItem } from './TaskItem';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const TaskSkeleton = () => (
  <Card className="flex flex-col">
    <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Skeleton className="mt-1 h-5 w-5 rounded-sm" />
            <Skeleton className="h-6 w-3/4" />
          </div>
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-2 py-0">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </CardContent>
    <CardFooter className="mt-auto flex flex-wrap items-center gap-2 pt-4">
      <Skeleton className="h-6 w-16 rounded-full" />
      <Skeleton className="h-6 w-20 rounded-full" />
    </CardFooter>
  </Card>
);

export function TaskList({ tasks, isLoading, onUpdateTask, onDeleteTask, onToggleStatus }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center">
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
