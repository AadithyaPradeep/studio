"use server";

import { suggestDailyTasks } from "@/ai/flows/suggest-daily-tasks";

export async function getSuggestedTasks(
  categories: string[],
  previousTasks: string[]
): Promise<string[]> {
  // If there are no categories or previous tasks, don't call the AI.
  if (categories.length === 0 && previousTasks.length === 0) {
    return ["Add a task with a category to get suggestions!"];
  }

  try {
    const result = await suggestDailyTasks({ categories, previousTasks });
    return result.suggestedTasks;
  } catch (error) {
    console.error("Error suggesting tasks:", error);
    // Return a user-friendly error message.
    return ["Sorry, we couldn't generate suggestions at this time."];
  }
}
