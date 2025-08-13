
"use client";

import { useTasks } from "@/hooks/use-tasks";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function CalendarView({ selectedDate, onDateChange }: CalendarViewProps) {
  const { tasks } = useTasks();

  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={(date) => onDateChange(date || new Date())}
      className="rounded-md border"
      components={{
        DayContent: ({ date }) => {
          const tasksForDay = tasks.filter(
            (task) => task.dueDate && isSameDay(new Date(task.dueDate), date)
          );
          if (tasksForDay.length > 0) {
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "relative flex items-center justify-center h-full w-full",
                      isSameDay(date, new Date()) && "font-bold"
                    )}
                  >
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
          return (
            <div
              className={cn(
                "relative flex items-center justify-center h-full w-full",
                isSameDay(date, new Date()) && "font-bold"
              )}
            >
              {format(date, "d")}
            </div>
          );
        },
      }}
    />
  );
}
