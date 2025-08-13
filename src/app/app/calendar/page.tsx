
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from '@/components/calendar/calendar-view';
import DayView from "@/components/calendar/day-view";
import WeekView from "@/components/calendar/week-view";
import ThreeDayView from "@/components/calendar/three-day-view";
import { useTasks } from "@/hooks/use-tasks";
import { addDays, isSameDay } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks } = useTasks();

  const tasksForSelectedDay = tasks.filter(
    (task) => task.dueDate && isSameDay(new Date(task.dueDate), selectedDate)
  );

  const threeDayViewTasks = [
      tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), selectedDate)),
      tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), addDays(selectedDate, 1))),
      tasks.filter(t => t.dueDate && isSameDay(new Date(t.dueDate), addDays(selectedDate, 2))),
  ];
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Calendar</h1>
        <p className="text-muted-foreground">
          See your tasks at a glance.
        </p>
      </div>

      <Tabs defaultValue="week" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="three-day">3-Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <DayView date={selectedDate} tasks={tasksForSelectedDay} />
        </TabsContent>
        <TabsContent value="three-day">
            <ThreeDayView startDate={selectedDate} tasksPerDay={threeDayViewTasks} />
        </TabsContent>
        <TabsContent value="week">
            <WeekView startDate={selectedDate} />
        </TabsContent>
        <TabsContent value="month">
          <CalendarView selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
