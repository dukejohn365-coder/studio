import { CheckSquare } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-12 text-center">
      <div className="relative flex items-center justify-center">
        <CheckSquare className="h-16 w-16 text-primary" />
        <div className="absolute h-24 w-24 animate-ping rounded-full border-2 border-primary" />
      </div>
      <p className="mt-6 text-lg font-medium text-muted-foreground">Loading your tasks...</p>
    </div>
  );
}
