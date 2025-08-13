"use client";

import { useMemo } from "react";
import type { Task } from "@/lib/types";
import { useTasks } from "@/hooks/use-tasks";
import SummaryHeader from "@/components/dayflow/summary-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ProgressMascot from "@/components/dayflow/progress-mascot";

export default function HomePage() {
  const { tasks } = useTasks();

    const progress = useMemo(() => {
        const total = tasks.length;
        if (total === 0) return 0;
        const completed = tasks.filter(t => t.isCompleted).length;
        return (completed / total) * 100;
    }, [tasks]);


  return (
      <div className="max-w-4xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold font-headline">Home</h1>
            <p className="text-muted-foreground">Welcome back! Here's your daily summary.</p>
        </div>

        <div className="mt-6 grid md:grid-cols-[1fr_200px] gap-8 items-center">
            <SummaryHeader tasks={tasks} />
            <ProgressMascot progress={progress} />
        </div>
        
        <div className="text-center mt-8">
            <Button asChild size="lg">
                <Link href="/app/tasks">
                    Go to Tasks <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
  );
}
