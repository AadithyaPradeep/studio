"use client";

import { useState, useMemo, useEffect } from "react";
import type { Task } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import LoadingSkeleton from "@/components/dayflow/loading-skeleton";
import SummaryHeader from "@/components/dayflow/summary-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("dayflow:tasks", []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingSkeleton />;
  }

  return (
      <div className="max-w-4xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold font-headline">Home</h1>
            <p className="text-muted-foreground">Welcome back! Here's your daily summary.</p>
        </div>
        <div className="mt-6">
            <SummaryHeader tasks={tasks} />
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
