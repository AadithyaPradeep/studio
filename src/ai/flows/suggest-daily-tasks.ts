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
});
export type SuggestDailyTasksInput = z.infer<typeof SuggestDailyTasksInputSchema>;

const SuggestDailyTasksOutputSchema = z.object({
  suggestedTasks: z
    .array(z.string())
    .describe('A list of tasks suggested for the day.'),
});
export type SuggestDailyTasksOutput = z.infer<typeof SuggestDailyTasksOutputSchema>;

export async function suggestDailyTasks(input: SuggestDailyTasksInput): Promise<SuggestDailyTasksOutput> {
  return suggestDailyTasksFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDailyTasksPrompt',
  input: {schema: SuggestDailyTasksInputSchema},
  output: {schema: SuggestDailyTasksOutputSchema},
  prompt: `Based on the categories of tasks already planned for the day and a list of tasks from previous days, suggest tasks that should be included in the day's schedule.

Categories: {{categories}}
Previous Tasks: {{previousTasks}}

Suggest tasks that are relevant to the categories and similar to the previous tasks.`,
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
