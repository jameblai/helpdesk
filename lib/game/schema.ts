import z from "zod";

export const judgeTicketInputSchema = z.object({
  ref: z.string().min(1).max(255),
  answer: z.string().min(1).max(1000),
});

export type JudgeTicketInput = z.infer<typeof judgeTicketInputSchema>;

export const judgeTicketOutputSchema = z.object({
  passed: z.boolean(),
  feedback: z.string(),
});

export type JudgeTicketOutput = z.infer<typeof judgeTicketOutputSchema>;
