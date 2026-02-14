import { z } from "zod";

/**
 * Schema for a single interaction within a chapter.
 */
export const InteractionSchema = z.object({
  id: z.string(),
  question: z.string(),
  type: z.enum(['multiple-choice', 'text', 'slider', 'rating', 'ranking', 'conditional']),
  options: z.array(z.string()).optional(),
  leftLabel: z.string().optional(),
  rightLabel: z.string().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  followUps: z.record(z.string()).optional(),
});

/**
 * Schema for a chapter's data.
 */
export const ChapterDataSchema = z.object({
  id: z.number(),
  title: z.string(),
  message: z.string(),
  photo: z.string().optional(),
  interactions: z.array(InteractionSchema),
});

/**
 * Schema for the response data of a chapter.
 */
export const ResponseDataSchema = z.object({
  answers: z.array(z.object({
    question: z.string(),
    answer: z.any(),
  })),
  timestamp: z.string().datetime().or(z.string()), // Allow ISO string
});

/**
 * Schema for the user's progress stored in localStorage.
 */
export const ProgressSchema = z.object({
  gatePassed: z.boolean(),
  wrongAttempts: z.number(),
  currentChapter: z.number(),
  unlockedChapters: z.array(z.number()),
  responses: z.record(z.string().regex(/^\d+$/), ResponseDataSchema),
  completedAt: z.string().datetime().nullable(),
  dateConfirmed: z.boolean(),
});

export type Interaction = z.infer<typeof InteractionSchema>;
export type ChapterData = z.infer<typeof ChapterDataSchema>;
export type ResponseData = z.infer<typeof ResponseDataSchema>;
export type Progress = z.infer<typeof ProgressSchema>;
