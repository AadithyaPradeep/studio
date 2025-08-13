
"use client";

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FilePlus2 } from 'lucide-react';

interface DayViewProps {
  date: Date;
  tasks: Task[];
}

const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = i + 7;
  return `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 || hour === 24 ? 'AM' : 'PM'}`;
});

const categoryColors: { [key: string]: string } = {
  Work: 'bg-blue-500/20 border-blue-500 text-blue-800',
  Personal: 'bg-purple-500/20 border-purple-500 text-purple-800',
  Errands: 'bg-yellow-500/20 border-yellow-500 text-yellow-800',
  Health: 'bg-green-500/20 border-green-500 text-green-800',
  Social: 'bg-pink-500/20 border-pink-500 text-pink-800',
  Finance: 'bg-indigo-500/20 border-indigo-500 text-indigo-800',
  Home: 'bg-orange-500/20 border-orange-500 text-orange-800',
  Learn: 'bg-teal-500/20 border-teal-500 text-teal-800',
};

export default function DayView({ date, tasks }: DayViewProps) {
  // Simple layout logic: distribute tasks throughout the day based on creation order.
  // This is a placeholder until tasks have actual start/end times.
  const getTaskPosition = (task: Task, index: number) => {
    const totalSlots = timeSlots.length * 2; // Assuming 30-min slots for positioning
    const position = (task.createdAt % totalSlots) / 2;
    const top = Math.floor(position);
    const duration = 2; // Default to 1 hour (2 * 30 mins)
    return {
      top,
      height: duration,
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {format(date, 'EEEE, MMMM d')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[800px] overflow-y-auto">
          {/* Time-slot lines */}
          <div className="grid grid-cols-[auto_1fr] h-full">
            <div className="flex flex-col">
              {timeSlots.map((time, index) => (
                <div key={time} className="h-20 flex-shrink-0 text-right pr-4">
                  <span className="text-xs text-muted-foreground relative -top-2">{time}</span>
                </div>
              ))}
            </div>
            <div className="relative border-l">
              {timeSlots.map((_, index) => (
                <div key={index} className="h-20 border-t"></div>
              ))}

              {/* Task rendering */}
              {tasks.length > 0 ? (
                 tasks.map((task, index) => {
                  const { top, height } = getTaskPosition(task, index);
                  return (
                    <div
                      key={task.id}
                      className="absolute w-full pr-4"
                      style={{
                        top: `${top * 5}rem`, // 5rem = h-20
                        height: `${height * 2.5}rem`,
                      }}
                    >
                      <div className={cn("p-2 rounded-lg h-full border-l-4", categoryColors[task.category] || 'bg-gray-500/20 border-gray-500')}>
                        <p className="font-bold text-sm">{task.title}</p>
                        <Badge variant="outline" className="mt-1">{task.category}</Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground/30" />
                    <h3 className="mt-4 text-lg font-semibold text-foreground">No tasks scheduled for this day</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Select another day or add tasks.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
