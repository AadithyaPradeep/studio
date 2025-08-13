
"use client";

import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FilePlus2, Clock } from 'lucide-react';
import { Badge } from '../ui/badge';
import { timeSlots, categoryColors, getTaskPosition } from './utils';

interface TimelineViewProps {
  tasks: Task[];
  showTime?: boolean;
}

export default function TimelineView({ tasks, showTime = true }: TimelineViewProps) {
  
  const timedTasks = tasks.filter(t => t.startTime && t.endTime);

  return (
    <div className="relative h-[840px] overflow-y-auto">
        <div className={cn("grid h-full", showTime ? "grid-cols-[auto_1fr]" : "grid-cols-1")}>
        {showTime && (
            <div className="flex flex-col">
            {timeSlots.map((time) => (
                <div key={time} className="h-20 flex-shrink-0 text-right pr-4">
                <span className="text-xs text-muted-foreground relative -top-2">{time}</span>
                </div>
            ))}
            </div>
        )}
        <div className="relative border-l">
            {timeSlots.slice(0, -1).map((_, index) => (
                <div key={index} className="h-20 border-t"></div>
            ))}

            {/* Task rendering */}
            {timedTasks.length > 0 ? (
                timedTasks.map((task) => {
                const { top, height } = getTaskPosition(task);
                return (
                    <div
                    key={task.id}
                    className="absolute w-full pr-2"
                    style={{
                        top: `${top}rem`,
                        height: `${height}rem`,
                        left: showTime ? 0 : '0.5rem',
                    }}
                    >
                    <div className={cn(
                        "p-2 rounded-lg h-full border-l-4 overflow-hidden text-xs",
                        categoryColors[task.category] || 'bg-gray-200/50 border-gray-500 text-gray-800'
                    )}>
                        <p className="font-bold">{task.title}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3"/>
                            {task.startTime} - {task.endTime}
                        </p>
                        <Badge variant="outline" className="mt-1">{task.category}</Badge>
                    </div>
                    </div>
                );
            })
            ) : (
                showTime && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground/30" />
                        <h3 className="mt-4 text-lg font-semibold text-foreground">No tasks scheduled</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Add tasks with a time to see them here.</p>
                    </div>
                )
            )}
        </div>
        </div>
    </div>
  );
}
