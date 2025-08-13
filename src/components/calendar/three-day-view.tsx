
"use client";

import { addDays, format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Task } from '@/lib/types';
import TimelineView from './timeline-view';
import { timeSlots } from './utils';
import { cn } from '@/lib/utils';

interface ThreeDayViewProps {
  startDate: Date;
  tasksPerDay: Task[][];
}

export default function ThreeDayView({ startDate, tasksPerDay }: ThreeDayViewProps) {
    const days = [startDate, addDays(startDate, 1), addDays(startDate, 2)];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">
                    3-Day View: {format(startDate, 'MMMM d')} - {format(addDays(startDate, 2), 'd')}
                </CardTitle>
                <CardDescription>
                    Your next three days.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[auto_1fr] relative">
                    {/* Timeline grid */}
                    <div className="col-start-2 grid grid-cols-3">
                        {days.map((day, index) => (
                           <div key={day.toString()} className={cn("border-r", index === 2 && "border-r-0")}>
                               {timeSlots.slice(0, -1).map((_, timeIndex) => (
                                   <div key={timeIndex} className="h-20 border-t"></div>
                               ))}
                           </div>
                        ))}
                    </div>

                    <div className="col-start-1 col-end-3 row-start-1 grid grid-cols-[auto_1fr]">
                        {/* Time slots */}
                        <div className="flex flex-col">
                            {timeSlots.map((time) => (
                                <div key={time} className="h-20 flex-shrink-0 text-right pr-4">
                                <span className="text-xs text-muted-foreground relative -top-2">{time}</span>
                                </div>
                            ))}
                        </div>

                        {/* Days with tasks */}
                        <div className="grid grid-cols-3 relative">
                            {days.map((day, index) => (
                                <div key={day.toISOString()} className="relative border-r">
                                    <h3 className="text-center font-semibold text-sm p-2 sticky top-0 bg-background z-10 border-b">
                                        {format(day, 'eee d')}
                                    </h3>
                                    <TimelineView
                                        tasks={tasksPerDay[index] || []}
                                        showTime={false}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
