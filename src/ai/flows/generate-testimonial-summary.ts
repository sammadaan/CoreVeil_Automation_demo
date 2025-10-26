'use server';

/**
 * @fileOverview A Genkit flow for summarizing customer testimonials into concise, impactful statements.
 *
 * - generateTestimonialSummary - A function that handles the testimonial summarization process.
 * - GenerateTestimonialSummaryInput - The input type for the generateTestimonialSummary function.
 * - GenerateTestimonialSummaryOutput - The return type for the generateTestimonialSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTestimonialSummaryInputSchema = z.object({
  testimonial: z
    .string()
    .describe('The full text of the customer testimonial.'),
});
export type GenerateTestimonialSummaryInput = z.infer<
  typeof GenerateTestimonialSummaryInputSchema
>;

const GenerateTestimonialSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise and impactful summary of the customer testimonial, suitable for use on a landing page.'
    ),
});
export type GenerateTestimonialSummaryOutput = z.infer<
  typeof GenerateTestimonialSummaryOutputSchema
>;

export async function generateTestimonialSummary(
  input: GenerateTestimonialSummaryInput
): Promise<GenerateTestimonialSummaryOutput> {
  return generateTestimonialSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestimonialSummaryPrompt',
  input: {schema: GenerateTestimonialSummaryInputSchema},
  output: {schema: GenerateTestimonialSummaryOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing concise, impactful statements for customer testimonials on landing pages.

  Given the following customer testimonial, write a short, attention-grabbing summary that highlights the key benefits and results experienced by the customer.

  Testimonial: {{{testimonial}}}

  Summary:`,
});

const generateTestimonialSummaryFlow = ai.defineFlow(
  {
    name: 'generateTestimonialSummaryFlow',
    inputSchema: GenerateTestimonialSummaryInputSchema,
    outputSchema: GenerateTestimonialSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
