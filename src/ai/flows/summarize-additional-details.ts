'use server';

/**
 * @fileOverview Summarizes the additional details provided in the contact form.
 *
 * - summarizeAdditionalDetails - A function that summarizes the additional details.
 * - SummarizeAdditionalDetailsInput - The input type for the summarizeAdditionalDetails function.
 * - SummarizeAdditionalDetailsOutput - The return type for the summarizeAdditionalDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAdditionalDetailsInputSchema = z.object({
  additionalDetails: z
    .string()
    .describe('The additional details provided by the user in the contact form.'),
});
export type SummarizeAdditionalDetailsInput = z.infer<typeof SummarizeAdditionalDetailsInputSchema>;

const SummarizeAdditionalDetailsOutputSchema = z.object({
  summary: z.string().describe('A summary of the additional details.'),
});
export type SummarizeAdditionalDetailsOutput = z.infer<typeof SummarizeAdditionalDetailsOutputSchema>;

export async function summarizeAdditionalDetails(
  input: SummarizeAdditionalDetailsInput
): Promise<SummarizeAdditionalDetailsOutput> {
  return summarizeAdditionalDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeAdditionalDetailsPrompt',
  input: {schema: SummarizeAdditionalDetailsInputSchema},
  output: {schema: SummarizeAdditionalDetailsOutputSchema},
  prompt: `Summarize the following additional details provided by the user in the contact form into key points:\n\n{{{additionalDetails}}}`,
});

const summarizeAdditionalDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeAdditionalDetailsFlow',
    inputSchema: SummarizeAdditionalDetailsInputSchema,
    outputSchema: SummarizeAdditionalDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
