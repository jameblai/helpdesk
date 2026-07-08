"use server";

import { checkRateLimit } from "@vercel/firewall";
import { generateText, Output } from "ai";
import { headers } from "next/headers";
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

  const rateLimit = await checkRateLimit("judge-ticket", {
    headers: await headers(),
  });
  if (rateLimit.rateLimited) {
    throw new Error(
      "Too many ticket judgements. Please wait before trying again.",
    );
  }
  if (rateLimit.error === "not-found") {
    throw new Error("Ticket judgement rate limit is not configured.");
  }

  const result = await generateText({
    model: "gpt-5.4-mini",
    output: Output.object({
      schema: judgeTicketOutputSchema,
    }),
    system: `Grade helpdesk replies.
Pass if the reply gives the expected answer, including as a harmless superset.
Allow paraphrase, typos, politeness, brief reasons/context, and extra non-conflicting details.
Fail if it omits or contradicts the expected answer, or changes a place, code meaning, permit status, action, or yes/no.
Feedback: one short sentence to the player.`,
    prompt: `Question:
${ticket.question}

Expected:
${ticket.expectedAnswer}

Reply:
${answer}`,
  });

  return result.output;
}
