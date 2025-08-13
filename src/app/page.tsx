import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BrainCircuit, CheckSquare, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans">
      <header className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-7 w-7 text-primary" />
            <span className="text-xl font-black font-headline tracking-tight">
              DayFlow
            </span>
          </div>
          <Button asChild>
            <Link href="/app">Get Started</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 text-sm font-semibold tracking-wider text-primary bg-primary/10 rounded-full">
                Productivity, Perfected
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-headline text-foreground leading-tight mb-6">
              Organize Your Life, One Task at a Time.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
              DayFlow is the smart, intuitive, and beautiful task manager designed to help you reclaim your day. Plan, prioritize, and achieve your goals with ease.
            </p>
            <Button size="lg" asChild className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40">
              <Link href="/app">Start Planning for Free</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} DayFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
