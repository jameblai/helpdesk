"use server";

import { generateText, Output } from "ai";
import { ticketBank } from "./tickets";
import { openai } from "@ai-sdk/openai";
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
    model: openai("gpt-5.4-mini"),
    output: Output.object({
      schema: judgeTicketOutputSchema,
    }),
    prompt: `Judge whether the following ticket is resolved: ${ticket.body}\n\nAnswer: ${answer}`,
  });

  return result.output;
}
