import { Author, randomAuthor } from "./authors";
import { randomId, Id } from "../id";

export const TICKET_DUE_MS = 60_000; // 1 minute

type TicketStatus = "open" | "success" | "failed";

export interface TicketJudgement {
  passed: boolean;
  score: number;
  feedback: string;
}

export interface BareTicket {
  subject: string;
  body: string;
}

export type Ticket = BareTicket & {
  id: Id;
  author: Author;

  status: TicketStatus;

  createdAt: Date;
  dueAt: Date;

  answer?: string;
  judgement?: TicketJudgement;
};

export const ticketBank: BareTicket[] = [
  {
    subject: "Translator outputting threatening poetry",
    body: "My universal translator keeps converting normal greetings into aggressive battle poems. I tried saying hello to a customs officer and it declared a blood feud with his moon. Please advise before I accidentally start a diplomatic incident.",
  },
  {
    subject: "Spaceship door only opens for sandwiches",
    body: "The main airlock on my ship refuses to open unless I present it with a sandwich. I do not own bread, and my species absorbs nutrients through antennae. I need a workaround before my parking meter expires in orbit.",
  },
  {
    subject: "Pet slime duplicated after reboot",
    body: "After rebooting my habitat dome, my emotional support slime split into 47 smaller slimes. They are all technically adorable, but they keep submitting separate tax forms. How do I merge them back into one slime?",
  },
] as const;

export function randomTicket(): Ticket {
  const id = randomId();
  const author = randomAuthor();

  const { subject, body } =
    ticketBank[Math.floor(Math.random() * ticketBank.length)];

  const createdAt = new Date();
  const dueAt = new Date(createdAt.getTime() + TICKET_DUE_MS);

  return {
    id,
    author,
    subject,
    body,
    status: "open",
    createdAt,
    dueAt,
  };
}
