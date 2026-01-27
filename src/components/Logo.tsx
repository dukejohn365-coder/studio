import { CheckSquare } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="FocusFlow Home">
      <CheckSquare className="h-7 w-7 text-primary" />
      <span className="text-2xl font-bold font-headline text-foreground">
        FocusFlow
      </span>
    </Link>
  );
}
