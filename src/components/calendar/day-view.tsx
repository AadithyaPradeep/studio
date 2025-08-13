
"use client";

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Task } from '@/lib/types';
import TimelineView from './timeline-view';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { categoryColors } from './utils';

interface DayViewProps {
  date: Date;
  tasks: Task[];
}

export default function DayView({ date, tasks }: DayViewProps) {
  
  const timedTasks = tasks.filter(t => t.startTime && t.endTime);
  const allDayTasks = tasks.filter(t => !t.startTime || !t.endTime);

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
        <TimelineView tasks={timedTasks} />
      </CardContent>
    </Card>
  );
}
