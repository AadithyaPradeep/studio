"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import type { Task } from "@/lib/types";

interface SummaryHeaderProps {
  tasks: Task[];
}

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function SummaryHeader({ tasks }: SummaryHeaderProps) {
  const { completedCount, totalCount, progress, tasksByCategory } = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const progressValue = total > 0 ? (completed / total) * 100 : 0;

    const categoryMap = tasks.reduce((acc, task) => {
        if (!acc[task.category]) {
            acc[task.category] = { completed: 0, total: 0 };
        }
        acc[task.category].total++;
        if (task.isCompleted) {
            acc[task.category].completed++;
        }
        return acc;
    }, {} as Record<string, { completed: number, total: number }>);
    
    const categoryData = Object.entries(categoryMap).map(([name, counts]) => ({
        name,
        completed: counts.completed,
        pending: counts.total - counts.completed,
    }));

    return { 
        completedCount: completed, 
        totalCount: total, 
        progress: progressValue,
        tasksByCategory: categoryData
    };
  }, [tasks]);

  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-3xl font-black">
          {format(new Date(), "MMMM d, yyyy")}
        </CardTitle>
        <CardDescription>
          Welcome back! Here's your progress for today.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center gap-4">
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-bold text-foreground">
                {completedCount}/{totalCount} Tasks
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </div>
        {tasksByCategory.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Category Breakdown</h4>
            <ChartContainer config={chartConfig} className="w-full" style={{ height: `${Math.max(100, tasksByCategory.length * 40)}px` }}>
              <BarChart
                accessibilityLayer
                data={tasksByCategory}
                layout="vertical"
                margin={{
                  left: -20,
                  top: 0,
                  right: 20,
                  bottom: 0,
                }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="completed" stackId="a" fill="var(--color-completed)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="pending" stackId="a" fill="var(--color-pending)" radius={[4, 4, 4, 4]}/>
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
