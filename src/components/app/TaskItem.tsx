'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Flag, Calendar, Tag, Trash2, Pencil } from 'lucide-react';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { TaskForm } from './TaskForm';

interface TaskItemProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const priorityMap: Record<Task['priority'], { label: string; className: string; icon: React.ReactNode }> = {
  low: { label: 'Low', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-300', icon: <Flag className="h-3 w-3" /> },
  medium: { label: 'Medium', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-300', icon: <Flag className="h-3 w-3" /> },
  high: { label: 'High', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-300', icon: <Flag className="h-3 w-3" /> },
};

export function TaskItem({ task, onUpdateTask, onDeleteTask, onToggleStatus }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { title, description, tags, priority, deadline, status, id } = task;
  const isDone = status === 'done';

  const handleSave = (updatedTaskData: Omit<Task, 'id' | 'status'>) => {
    onUpdateTask({ ...updatedTaskData, id, status });
    setIsEditing(false);
  };

  return (
    <>
      <Card className={cn('flex flex-col transition-all hover:shadow-md', isDone && 'bg-muted/50')}>
        <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Checkbox
                  id={`task-${id}`}
                  checked={isDone}
                  onCheckedChange={() => onToggleStatus(id)}
                  className="mt-1"
                  aria-label={`Mark "${title}" as ${isDone ? 'not done' : 'done'}`}
                />
                <CardTitle className={cn('text-lg font-semibold leading-tight', isDone && 'line-through text-muted-foreground')}>
                  {title}
                </CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditing(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDeleteTask(id)} className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        {description && (
          <CardContent className="py-0">
            <CardDescription className={cn(isDone && 'line-through')}>
              {description}
            </CardDescription>
          </CardContent>
        )}
        <CardFooter className="flex flex-wrap items-center gap-2 pt-4 mt-auto">
            <Badge variant="outline" className={cn('flex items-center gap-1', priorityMap[priority].className)}>
                {priorityMap[priority].icon}
                {priorityMap[priority].label}
            </Badge>
            {deadline && (
                <Badge variant="outline" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(deadline, 'MMM d')}
                </Badge>
            )}
            {tags.map((tag) => (
                <Badge variant="secondary" key={tag} className="flex items-center gap-1">
                    <Tag className="h-3 w-3"/>
                    {tag}
                </Badge>
            ))}
        </CardFooter>
      </Card>
      <TaskForm
        isOpen={isEditing}
        onOpenChange={setIsEditing}
        onSave={handleSave}
        task={task}
      />
    </>
  );
}
