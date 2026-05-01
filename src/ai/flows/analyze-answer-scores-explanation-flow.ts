'use server';
/**
 * @fileOverview A Genkit flow for analyzing an AI-generated answer based on a given question.
 * It provides scores for accuracy, clarity, and completeness, a detailed explanation, and an improved version of the answer.
 *
 * - analyzeAnswerForScoresAndExplanation - The main function to call the flow.
 * - AnalyzeAnswerScoresExplanationInput - The input type for the analysis.
 * - AnalyzeAnswerScoresExplanationOutput - The output type of the analysis results.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeAnswerScoresExplanationInputSchema = z.object({
  question: z.string().describe('The original question asked to the AI.'),
  aiAnswer: z.string().describe('The AI-generated answer to be analyzed.'),
});
export type AnalyzeAnswerScoresExplanationInput = z.infer<typeof AnalyzeAnswerScoresExplanationInputSchema>;

const AnalyzeAnswerScoresExplanationOutputSchema = z.object({
  accuracy: z
    .number()
    .min(1)
    .max(10)
    .describe('A score from 1 to 10 indicating how accurate the AI answer is.'),
  clarity: z
    .number()
    .min(1)
    .max(10)
    .describe('A score from 1 to 10 indicating how clear and understandable the AI answer is.'),
  completeness: z
    .number()
    .min(1)
    .max(10)
    .describe('A score from 1 to 10 indicating how complete the AI answer is, covering all aspects of the question.'),
  explanation: z
    .string()
    .describe(
      'A detailed explanation justifying each score (accuracy, clarity, completeness) and providing constructive feedback.'
    ),
  improvedAnswer: z
    .string()
    .describe('An improved version of the AI answer, addressing any identified shortcomings.'),
});
export type AnalyzeAnswerScoresExplanationOutput = z.infer<typeof AnalyzeAnswerScoresExplanationOutputSchema>;

export async function analyzeAnswerForScoresAndExplanation(
  input: AnalyzeAnswerScoresExplanationInput
): Promise<AnalyzeAnswerScoresExplanationOutput> {
  return analyzeAnswerScoresExplanationFlow(input);
}

const analyzeAnswerPrompt = ai.definePrompt({
  name: 'analyzeAnswerPrompt',
  input: {schema: AnalyzeAnswerScoresExplanationInputSchema},
  output: {schema: AnalyzeAnswerScoresExplanationOutputSchema},
  prompt: `You are an expert AI response analyzer. Your task is to evaluate an AI-generated answer against a given question.

Critically assess the AI answer for its accuracy, clarity, and completeness. Provide a score for each aspect on a scale of 1 to 10, where 1 is very poor and 10 is excellent.

After scoring, provide a detailed explanation for your assessment, justifying each score and offering specific feedback on how the answer could be improved. Finally, generate an improved version of the AI answer that rectifies any identified issues.

Return the output in JSON format with the following keys:
- accuracy (number, 1-10)
- clarity (number, 1-10)
- completeness (number, 1-10)
- explanation (string)
- improvedAnswer (string)

Question: {{{question}}}

AI Answer: {{{aiAnswer}}}`,
});

const analyzeAnswerScoresExplanationFlow = ai.defineFlow(
  {
    name: 'analyzeAnswerScoresExplanationFlow',
    inputSchema: AnalyzeAnswerScoresExplanationInputSchema,
    outputSchema: AnalyzeAnswerScoresExplanationOutputSchema,
  },
  async input => {
    const {output} = await analyzeAnswerPrompt(input);
    return output!;
  }
);
