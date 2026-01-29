'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Rocket } from 'lucide-react';
import { Authenticated, Unauthenticated } from 'convex/react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Logo />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Unauthenticated>
            <Button variant="ghost" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">
                Get Started
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Unauthenticated>
          <Authenticated>
            <Button asChild>
              <Link href="/dashboard">
                Go to Dashboard
                <Rocket className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Authenticated>
        </div>
      </div>
    </header>
  );
}
