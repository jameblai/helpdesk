import { Author, randomAuthor } from "./authors";
import { randomId, Id } from "../id";

export const TICKET_DUE_MS = 60_000; // 1 minute

export type TicketStatus = "open" | "success" | "failed";

export interface TicketJudgement {
  passed: boolean;
  score: number;
  feedback: string;
}

export interface BareTicket {
  ref: string;
  subject: string;
  body: string;
}

export type Ticket = BareTicket & {
  id: Id;
  author: Author;

  status: TicketStatus;

  createdAt: number;
  dueAt: number;

  answer?: string;
  judgement?: TicketJudgement;
};

export const ticketBank: BareTicket[] = [
  {
    ref: "2e63474b-44c5-4b41-9ae7-ebdb41bc2604",
    subject: "Translator outputting threatening poetry",
    body: "My universal translator keeps converting normal greetings into aggressive battle poems. I tried saying hello to a customs officer and it declared a blood feud with his moon. Please advise before I accidentally start a diplomatic incident.",
  },
  {
    ref: "df9a7864-adfd-4107-b75d-4dc50589c177",
    subject: "Spaceship door only opens for sandwiches",
    body: "The main airlock on my ship refuses to open unless I present it with a sandwich. I do not own bread, and my species absorbs nutrients through antennae. I need a workaround before my parking meter expires in orbit.",
  },
  {
    ref: "66cb0ced-bf95-44bf-ac77-730816720c0c",
    subject: "Pet slime duplicated after reboot",
    body: "After rebooting my habitat dome, my emotional support slime split into 47 smaller slimes. They are all technically adorable, but they keep submitting separate tax forms. How do I merge them back into one slime?",
  },
] as const;

export function randomTicket(): Ticket {
  const id = randomId();
  const author = randomAuthor();

  const bareTicket =
    ticketBank[Math.floor(Math.random() * ticketBank.length)];

  const now = Date.now();

  return {
    ...bareTicket,
    id,
    author,
    status: "open",
    createdAt: now,
    dueAt: now + TICKET_DUE_MS,
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function judgeTicket(_ticket: Ticket, _answer: string): TicketJudgement {
  return {
    passed: true,
    score: 100,
    feedback: "Well done",
  };
}
