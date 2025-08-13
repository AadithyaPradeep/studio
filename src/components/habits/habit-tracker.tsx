"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/use-habits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from "date-fns";

export default function HabitTracker() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useHabits();
  const [newHabit, setNewHabit] = useState("");

  const week = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      addHabit(newHabit.trim());
      setNewHabit("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              placeholder="Add a new habit (e.g., Read for 15 minutes)"
              onKeyDown={(e) => e.key === "Enter" && handleAddHabit()}
            />
            <Button onClick={handleAddHabit}>
              <Plus className="h-4 w-4 mr-2" /> Add Habit
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {habits.map((habit) => (
          <Card key={habit.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
                <span className="font-medium">{habit.title}</span>
              </div>
              <div className="flex gap-2">
                {week.map((day) => {
                  const dayStr = format(day, "yyyy-MM-dd");
                  const isCompleted = habit.completions[dayStr];
                  return (
                    <div key={day.toString()} className="text-center">
                      <span className="text-xs text-muted-foreground">{format(day, "eee")}</span>
                      <button
                        onClick={() => toggleHabit(habit.id, dayStr)}
                        className={cn(
                          "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors mt-1",
                          isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80",
                          isSameDay(day, new Date()) && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        )}
                      >
                        {isCompleted && <Check className="h-4 w-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
