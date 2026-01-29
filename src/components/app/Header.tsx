import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { TaskForm } from '@/components/app/TaskForm';
import type { Task } from '@/lib/types';
import { Plus } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';

interface AppHeaderProps {
  onAddTask: (task: Omit<Task, 'id' | 'status'>) => void;
}

export function AppHeader({ onAddTask }: AppHeaderProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleTaskSave = (taskData: Omit<Task, 'id' | 'status'>) => {
    onAddTask(taskData);
    setIsFormOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <Logo />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <TaskForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleTaskSave}
      />
    </>
  );
}
