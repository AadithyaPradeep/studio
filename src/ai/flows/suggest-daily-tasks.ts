'use server';

/**
 * @fileOverview A flow that suggests daily tasks based on previous habits and the current day's categories.
 *
 * - suggestDailyTasks - A function that suggests tasks for the day.
 * - SuggestDailyTasksInput - The input type for the suggestDailyTasks function.
 * - SuggestDailyTasksOutput - The return type for the suggestDailyTasks function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestDailyTasksInputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('The categories of tasks already planned for the day.'),
  previousTasks: z
    .array(z.string())
    .describe('A list of tasks from previous days.'),
  availableCategories: z
    .array(z.string())
    .describe('A list of all available categories to choose from for new tasks.'),
});
export type SuggestDailyTasksInput = z.infer<typeof SuggestDailyTasksInputSchema>;

const SuggestedTaskSchema = z.object({
  title: z.string().describe('The title of the suggested task.'),
  category: z.string().describe('The category for the suggested task.'),
});

const SuggestDailyTasksOutputSchema = z.object({
  suggestedTasks: z
    .array(SuggestedTaskSchema)
    .describe('A list of tasks suggested for the day, each with a title and a category.'),
});
export type SuggestDailyTasksOutput = z.infer<typeof SuggestDailyTasksOutputSchema>;

export async function suggestDailyTasks(input: SuggestDailyTasksInput): Promise<SuggestDailyTasksOutput> {
  // Handle the case where there's nothing to base suggestions on.
  if (input.categories.length === 0 && input.previousTasks.length === 0) {
    return { suggestedTasks: [] };
  }
  return suggestDailyTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDailyTasksPrompt',
  input: {schema: SuggestDailyTasksInputSchema},
  output: {schema: SuggestDailyTasksOutputSchema},
  prompt: `Based on the categories of tasks already planned for the day and a list of tasks from previous days, suggest new tasks that should be included in the day's schedule.

For each suggested task, you must also provide a relevant category from the list of available categories.

Today's Categories: {{categories}}
Previous Tasks: {{previousTasks}}
Available Categories for new tasks: {{availableCategories}}

Suggest tasks that are relevant to today's categories and similar to the previous tasks. Assign a suitable category to each new task.`,
});

const suggestDailyTasksFlow = ai.defineFlow(
  {
    name: 'suggestDailyTasksFlow',
    inputSchema: SuggestDailyTasksInputSchema,
    outputSchema: SuggestDailyTasksOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
