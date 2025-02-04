'use client';

import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-destructive/10 via-destructive/5 to-background p-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-full bg-destructive/10 p-3">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Something went wrong</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            onClick={onRetry}
            className="gap-2 bg-gradient-to-r from-destructive/20 to-destructive/10 hover:from-destructive/30 hover:to-destructive/20"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(220,38,38,0.1),transparent)]" />
    </div>
  );
}