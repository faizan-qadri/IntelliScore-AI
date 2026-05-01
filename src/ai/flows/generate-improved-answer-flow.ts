'use server';
/**
 * @fileOverview An AI agent that suggests an improved version of an AI-generated answer based on evaluation scores and an explanation.
 *
 * - generateImprovedAnswer - A function that generates an improved version of an AI-generated answer.
 * - ImprovedAnswerInput - The input type for the generateImprovedAnswer function.
 * - ImprovedAnswerOutput - The return type for the generateImprovedAnswer function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImprovedAnswerInputSchema = z.object({
  question: z.string().describe('The original question posed to the AI.'),
  originalAnswer: z.string().describe('The original AI-generated answer to be improved.'),
  accuracyScore: z.number().min(1).max(10).describe('The accuracy score (1-10) of the original answer.'),
  clarityScore: z.number().min(1).max(10).describe('The clarity score (1-10) of the original answer.'),
  completenessScore: z.number().min(1).max(10).describe('The completeness score (1-10) of the original answer.'),
  explanation: z.string().describe('A detailed explanation of why the original answer received its scores, highlighting areas for improvement.'),
});
export type ImprovedAnswerInput = z.infer<typeof ImprovedAnswerInputSchema>;

const ImprovedAnswerOutputSchema = z.object({
  improvedAnswer: z.string().describe('The enhanced and refined version of the AI-generated answer.'),
});
export type ImprovedAnswerOutput = z.infer<typeof ImprovedAnswerOutputSchema>;

export async function generateImprovedAnswer(input: ImprovedAnswerInput): Promise<ImprovedAnswerOutput> {
  return generateImprovedAnswerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'improveAnswerPrompt',
  input: { schema: ImprovedAnswerInputSchema },
  output: { schema: ImprovedAnswerOutputSchema },
  prompt: `You are an expert AI assistant tasked with refining and enhancing AI-generated answers.

Given a question, an original AI-generated answer, its evaluation scores (accuracy, clarity, completeness), and a detailed explanation of its shortcomings, your goal is to provide a significantly improved version of the answer.

Focus on addressing all points raised in the explanation and improving the answer's quality based on the given scores. The improved answer should be concise, accurate, clear, and complete. Ensure the improved answer is well-structured and directly answers the original question.

### Original Question:
{{{question}}}

### Original AI-Generated Answer:
{{{originalAnswer}}}

### Evaluation Scores:
- Accuracy: {{{accuracyScore}}}/10
- Clarity: {{{clarityScore}}}/10
- Completeness: {{{completenessScore}}}/10

### Explanation of Improvements Needed:
{{{explanation}}}

### Improved Answer:
`,
});

const generateImprovedAnswerFlow = ai.defineFlow(
  {
    name: 'generateImprovedAnswerFlow',
    inputSchema: ImprovedAnswerInputSchema,
    outputSchema: ImprovedAnswerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
