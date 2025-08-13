"use client";

import { useCallback } from "react";
import type { Habit } from "@/lib/types";
import { useLocalStorage } from "./use-local-storage";
import { v4 as uuidv4 } from "uuid";

export function useHabits(initialHabits: Habit[] = []) {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", initialHabits);

  const addHabit = useCallback(
    (title: string) => {
      const newHabit: Habit = {
        id: uuidv4(),
        title,
        completions: {},
      };
      setHabits((prev) => [...prev, newHabit]);
    },
    [setHabits]
  );

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
    },
    [setHabits]
  );

  const toggleHabit = useCallback(
    (id: string, date: string) => {
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id === id) {
            const newCompletions = { ...habit.completions };
            if (newCompletions[date]) {
              delete newCompletions[date];
            } else {
              newCompletions[date] = true;
            }
            return { ...habit, completions: newCompletions };
          }
          return habit;
        })
      );
    },
    [setHabits]
  );

  return { habits, addHabit, deleteHabit, toggleHabit };
}
