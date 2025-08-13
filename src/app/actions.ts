"use server";

import { suggestDailyTasks } from "@/ai/flows/suggest-daily-tasks";
import { TASK_CATEGORIES } from "@/components/dayflow/constants";

export interface SuggestedTask {
  title: string;
  category: string;
}

export async function getSuggestedTasks(
  categories: string[],
  previousTasks: string[]
): Promise<SuggestedTask[]> {
  // If there are no categories or previous tasks, don't call the AI.
  if (categories.length === 0 && previousTasks.length === 0) {
    return [{ title: "Add a task with a category to get suggestions!", category: "Personal" }];
  }

  try {
    const result = await suggestDailyTasks({ 
      categories, 
      previousTasks,
      availableCategories: TASK_CATEGORIES
    });
    return result.suggestedTasks;
  } catch (error) {
    console.error("Error suggesting tasks:", error);
    // Return a user-friendly error message.
    return [{ title: "Sorry, we couldn't generate suggestions at this time.", category: "Personal" }];
  }
}
