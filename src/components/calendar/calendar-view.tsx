"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

export default function CalendarView() {
  const { tasks } = useTasks();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const tasksForSelectedDay = tasks.filter(
    (task) => task.dueDate && date && isSameDay(new Date(task.dueDate), date)
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      components={{
        DayContent: ({ date, ...props }) => {
          const tasksForDay = tasks.filter(
            (task) => task.dueDate && isSameDay(new Date(task.dueDate), date)
          );
          if (tasksForDay.length > 0) {
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative h-full w-full">
                    <span>{format(date, "d")}</span>
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                      {tasksForDay.slice(0, 3).map((task) => (
                        <div
                          key={task.id}
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                        ></div>
                      ))}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Tasks for {format(date, "PPP")}
                      </h4>
                    </div>
                    <div className="grid gap-2">
                      {tasksForDay.map((task) => (
                        <div
                          key={task.id}
                          className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                          <span
                            className={cn(
                              "flex h-2 w-2 translate-y-1 rounded-full",
                              task.isCompleted ? "bg-green-500" : "bg-primary"
                            )}
                          />
                          <div className="grid gap-1">
                            <p className="text-sm font-medium leading-none">
                              {task.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          }
          return <span>{format(date, "d")}</span>;
        },
      }}
    />
  );
}
