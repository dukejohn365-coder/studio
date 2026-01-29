'use client';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="mt-4">Something went wrong</CardTitle>
          <CardDescription>
            We couldn't load your tasks. Please try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Error: {error.message}
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => reset()} className="w-full">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
