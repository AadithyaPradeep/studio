import { Skeleton } from "@/components/ui/skeleton";
import { BrainCircuit } from "lucide-react";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-headline tracking-tight">
                DayFlow
              </span>
            </div>
            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-12 w-48 mb-2" />
            <Skeleton className="h-8 w-full" />
          </div>

          <div className="flex justify-end items-center mb-6">
            <Skeleton className="h-12 w-36 rounded-lg" />
          </div>

          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
