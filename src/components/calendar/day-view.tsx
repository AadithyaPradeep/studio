
"use client";

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { FilePlus2, Clock } from 'lucide-react';
import { Separator } from '../ui/separator';

interface DayViewProps {
  date: Date;
  tasks: Task[];
}

const timeSlots = Array.from({ length: 17 }, (_, i) => {
  const hour = i + 7;
  return `${hour.toString().padStart(2, '0')}:00`;
});

const categoryColors: { [key: string]: string } = {
  Work: 'bg-blue-500/20 border-blue-500',
  Personal: 'bg-purple-500/20 border-purple-500',
  Errands: 'bg-yellow-500/20 border-yellow-500',
  Health: 'bg-green-500/20 border-green-500',
  Social: 'bg-pink-500/20 border-pink-500',
  Finance: 'bg-indigo-500/20 border-indigo-500',
  Home: 'bg-orange-500/20 border-orange-500',
  Learn: 'bg-teal-500/20 border-teal-500',
};

const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

export default function DayView({ date, tasks }: DayViewProps) {
  
  const timedTasks = tasks.filter(t => t.startTime && t.endTime);
  const allDayTasks = tasks.filter(t => !t.startTime || !t.endTime);

  const getTaskPosition = (task: Task) => {
    if (!task.startTime || !task.endTime) return { top: 0, height: 0 };
    
    const startMinutes = timeToMinutes(task.startTime) - (7 * 60); // Start at 7:00 AM
    const endMinutes = timeToMinutes(task.endTime) - (7 * 60);
    const duration = endMinutes - startMinutes;
    
    const top = (startMinutes / 60) * 5; // 5rem per hour (h-20)
    const height = (duration / 60) * 5;

    return { top, height };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-headline">
          {format(date, 'EEEE, MMMM d')}
        </CardTitle>
      </CardHeader>
      <CardContent>
         {allDayTasks.length > 0 && (
            <div className='mb-4'>
                <CardDescription className='mb-2'>All-day tasks</CardDescription>
                <div className='flex flex-wrap gap-2'>
                    {allDayTasks.map(task => (
                        <Badge key={task.id} variant='outline' className={cn('py-1 px-3', categoryColors[task.category])}>{task.title}</Badge>
                    ))}
                </div>
                <Separator className='my-4'/>
            </div>
        )}
        <div className="relative h-[840px] overflow-y-auto">
          <div className="grid grid-cols-[auto_1fr] h-full">
            <div className="flex flex-col">
              {timeSlots.map((time) => (
                <div key={time} className="h-20 flex-shrink-0 text-right pr-4">
                  <span className="text-xs text-muted-foreground relative -top-2">{time}</span>
                </div>
              ))}
            </div>
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
                      className="absolute w-full pr-4"
                      style={{
                        top: `${top}rem`,
                        height: `${height}rem`,
                      }}
                    >
                      <div className={cn("p-2 rounded-lg h-full border-l-4 overflow-hidden", categoryColors[task.category] || 'bg-gray-500/20 border-gray-500')}>
                        <p className="font-bold text-sm">{task.title}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3"/>
                            {task.startTime} - {task.endTime}
                        </p>
                        <Badge variant="outline" className="mt-1 text-xs">{task.category}</Badge>
                      </div>
                    </div>
                  );
                })
              ) : (
                allDayTasks.length === 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground/30" />
                        <h3 className="mt-4 text-lg font-semibold text-foreground">No tasks scheduled for this day</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Select another day or add tasks.</p>
                    </div>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
