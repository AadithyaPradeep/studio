
"use client";

import { useState } from 'react';
import { eachDayOfInterval, startOfWeek, endOfWeek, format, isSameDay, addDays } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTasks } from '@/hooks/use-tasks';
import TimelineView from './timeline-view';
import { cn } from '@/lib/utils';
import { timeSlots } from './utils';

interface WeekViewProps {
    startDate: Date;
}

export default function WeekView({ startDate }: WeekViewProps) {
    const { tasks } = useTasks();
    const week = eachDayOfInterval({
        start: startOfWeek(startDate, { weekStartsOn: 1 }),
        end: endOfWeek(startDate, { weekStartsOn: 1 }),
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-headline">
                    Week of {format(startOfWeek(startDate, { weekStartsOn: 1 }), 'MMMM d')}
                </CardTitle>
                <CardDescription>
                    Your weekly schedule at a glance.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-[auto_1fr] relative">
                     {/* Timeline grid */}
                    <div className="col-start-2 grid grid-cols-7">
                        {week.map((day, index) => (
                           <div key={day.toString()} className={cn("border-r", index === 6 && "border-r-0")}>
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
                        <div className="grid grid-cols-7 relative">
                            {week.map((day) => (
                                <div key={day.toISOString()} className="relative border-r">
                                    <h3 className="text-center font-semibold text-sm p-2 sticky top-0 bg-background z-10 border-b">
                                        {format(day, 'eee d')}
                                    </h3>
                                    <TimelineView
                                        tasks={tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), day))}
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
