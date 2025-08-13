import { Skeleton } from "@/components/ui/skeleton";
import { ListTodo, BrainCircuit } from "lucide-react";

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
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ListTodo className="h-6 w-6 text-primary" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Skeleton className="h-10 w-28" />
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
