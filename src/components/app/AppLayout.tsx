'use client';

import React, { useState, useMemo } from 'react';
import type { Task } from '@/lib/types';
import { initialTasks } from '@/lib/data';
import { AppHeader } from '@/components/app/Header';
import { TaskList } from '@/components/app/TaskList';
import { Progress } from '@/components/ui/progress';

export function AppLayout() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      status: 'todo',
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
          : task
      )
    );
  };
  
  const progress = useMemo(() => {
    const doneTasks = tasks.filter((task) => task.status === 'done').length;
    return tasks.length > 0 ? (doneTasks / tasks.length) * 100 : 0;
  }, [tasks]);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader onAddTask={addTask} />
      <main className="flex-1 p-4 md:p-8 container mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Your Progress</h2>
            <span className="text-lg font-bold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        <TaskList
          tasks={tasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleStatus={toggleTaskStatus}
        />
      </main>
    </div>
  );
}
