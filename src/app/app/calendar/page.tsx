
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalendarView from '@/components/calendar/calendar-view';
import DayView from "@/components/calendar/day-view";
import { useTasks } from "@/hooks/use-tasks";
import { isSameDay } from "date-fns";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks } = useTasks();

  const tasksForSelectedDay = tasks.filter(
    (task) => task.dueDate && isSameDay(new Date(task.dueDate), selectedDate)
  );
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Calendar</h1>
        <p className="text-muted-foreground">
          See your tasks at a glance.
        </p>
      </div>

      <Tabs defaultValue="month" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="day">Day</TabsTrigger>
        </TabsList>
        <TabsContent value="month">
          <CalendarView selectedDate={selectedDate} onDateChange={setSelectedDate} />
        </TabsContent>
        <TabsContent value="day">
          <DayView date={selectedDate} tasks={tasksForSelectedDay} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
