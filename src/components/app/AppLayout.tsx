'use client';

import React, { useMemo } from 'react';
import type { Task } from '@/lib/types';
import { AppHeader } from '@/components/app/Header';
import { TaskList } from '@/components/app/TaskList';
import { Progress } from '@/components/ui/progress';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';

export function AppLayout() {
  const convexTasks = useQuery(api.tasks.get);
  const isLoading = convexTasks === undefined;
  const addTaskMutation = useMutation(api.tasks.add);
  const updateTaskMutation = useMutation(api.tasks.update);
  const deleteTaskMutation = useMutation(api.tasks.remove);
  const toggleTaskStatusMutation = useMutation(api.tasks.toggleStatus);

  const tasks: Task[] = useMemo(() => {
    if (!convexTasks) return [];
    return convexTasks.map((task) => ({
      ...task,
      id: task._id,
      deadline: task.deadline ? new Date(task.deadline) : null,
    }));
  }, [convexTasks]);

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    addTaskMutation({
      ...task,
      deadline: task.deadline ? task.deadline.getTime() : null,
    });
  };

  const updateTask = (updatedTask: Task) => {
    const { id, title, description, tags, priority, deadline } = updatedTask;
    updateTaskMutation({
      id: id as Id<'tasks'>,
      title,
      description,
      tags,
      priority,
      deadline: deadline ? deadline.getTime() : null,
    });
  };

  const deleteTask = (taskId: string) => {
    deleteTaskMutation({ id: taskId as Id<'tasks'> });
  };

  const toggleTaskStatus = (taskId: string) => {
    toggleTaskStatusMutation({ id: taskId as Id<'tasks'> });
  };
  
  const progress = useMemo(() => {
    if (!tasks || tasks.length === 0) return 0;
    const doneTasks = tasks.filter((task) => task.status === 'done').length;
    return (doneTasks / tasks.length) * 100;
  }, [tasks]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader onAddTask={addTask} />
      <main className="flex-1 p-4 md:p-8 container mx-auto flex flex-col">
        {!isLoading && tasks.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Your Progress</h2>
              <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        <div className={cn('flex-1 flex', !isLoading && tasks.length > 0 && 'items-start')}>
          <TaskList
            tasks={tasks}
            isLoading={isLoading}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
        </div>
      </main>
    </div>
  );
}
