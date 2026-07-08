"use server";

import { generateText, Output } from "ai";
import { ticketBank } from "./tickets";
import {
  JudgeTicketInput,
  judgeTicketInputSchema,
  judgeTicketOutputSchema,
} from "./schema";

export async function judgeTicket(input: JudgeTicketInput) {
  const { data, error } = judgeTicketInputSchema.safeParse(input);
  if (error) {
    throw new Error(error.message);
  }

  const { ref, answer } = data;

  const ticket = ticketBank.find((t) => t.ref === ref);
  if (!ticket) {
    throw new Error("Ticket not found");
  }

  const result = await generateText({
    model: "gpt-5.4-mini",
    output: Output.object({
      schema: judgeTicketOutputSchema,
    }),
    prompt: `You are grading a helpdesk answer against a canonical answer.

Question:
${ticket.question}

Canonical answer:
${ticket.expectedAnswer}

Submitted answer:
${answer}

Return passed=true only when the submitted answer is semantically equivalent to the canonical answer for this question.
Accept paraphrases, casing differences, minor spelling mistakes, and extra polite wording.
Reject answers that name the wrong place, code meaning, permission status, action, or yes/no value.
Feedback must be one short sentence for the player.`,
  });

  return result.output;
}
