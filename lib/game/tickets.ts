import { Author, randomAuthor } from "./authors";
import { randomId, Id } from "../id";
import { TICKET_DUE_MS } from "./constants";

export type TicketStatus = "open" | "success" | "failed";

export interface TicketJudgement {
  passed: boolean;
  feedback: string;
}

export interface BareTicket {
  ref: string;
  subject: string;
  question: string;
  expectedAnswer: string;
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
    ref: "32abb9c4-1305-4099-80fd-decdb38dd18c",
    subject: "Fuel stop needed",
    question:
      "Mayday! Mayday! We are on our way to Orphion Lux from Zenthara Expanse but we are running out of fuel. Where can we stop to refuel our spaceship?",
    expectedAnswer: "Crysalune Abyss",
  },
  {
    ref: "00c2f9a5-2294-4cf5-a13c-9c314dc6eac5",
    subject: "Missing hot-wind pet",
    question:
      "My space pet Bort is missing, he's super unfriendly and I think he might attack someone! He LOVES hot winds, which planet might he be on!?",
    expectedAnswer: "Mackelvie",
  },
  {
    ref: "c2b7ae73-3b8d-46ca-ac12-d2a75f342355",
    subject: "Code 1011 emergency",
    question:
      "My steering wheel isn't working, there's a code 1011, what does it mean???? There's an asteroid in front of me and I NEED help ASAP!!!!",
    expectedAnswer: "Eject your vehicle",
  },
  {
    ref: "5c6db0ad-c8c3-44d5-b7a3-bac9c66bacdf",
    subject: "Alien fish allergy",
    question:
      "I'm severely allergic to alien fish and I just swallowed it. WHERE SHOULD I GO???",
    expectedAnswer: "Taurino",
  },
  {
    ref: "9a9d57c9-bb1d-4e54-a3eb-fb09c0bf49b8",
    subject: "Biggest planet check",
    question:
      "My grandma hasn't responded to me in 5 minutes, she lives on the biggest planet and I forgot what it's called pls help!!!",
    expectedAnswer: "Feradris",
  },
  {
    ref: "43bd9566-e91b-426a-b4a3-0eda0863768d",
    subject: "Vehicle code 0000",
    question:
      "Late for work and my vehicle isn't working. There's a code 0000 on the dashboard, help?",
    expectedAnswer: "Your vehicle is off",
  },
  {
    ref: "853f101e-f5e3-4421-ba86-5335adb12393",
    subject: "Replacement engine part",
    question:
      "The engine broke down mid transport, I need to order a new part asap or I'll miss my wedding. Where should I order it?",
    expectedAnswer: "Feradris",
  },
  {
    ref: "72a864cb-170a-4110-bc43-916d6cedac09",
    subject: "Spacemail travel warning",
    question:
      "My flight is in 10 minutes and I just realized I got a spacemail. What the heck does a curve with a dot inside mean???",
    expectedAnswer: "You are not permitted to travel",
  },
  {
    ref: "09e47f34-9b42-4b9a-b9f5-f537e8c7d871",
    subject: "Rulix retirement planet",
    question:
      "My mom and dad are retiring soon. They're Rulix and they love sunbathing. Which planet would be most suitable for them?",
    expectedAnswer: "Nautilus",
  },
  {
    ref: "bd882d81-9564-4ead-88d7-8ce7d37443bf",
    subject: "Lowest Grob population",
    question:
      "I hate Grobs, I need a planet with the least amount of them, suggestions?",
    expectedAnswer: "Taurino",
  },
  {
    ref: "78276c57-8aa9-463a-9299-81ea49c6e8f4",
    subject: "Grob friendliness",
    question: "Are Grobs friendly?",
    expectedAnswer: "No",
  },
  {
    ref: "9dd396a9-5a22-4253-b16f-4386cc8a79ce",
    subject: "Nautilus weather",
    question: "What's the weather like in Nautilus?",
    expectedAnswer: "Clear",
  },
  {
    ref: "01eca55e-366c-438a-81ad-0126dee051ae",
    subject: "Grob moving to Asperion",
    question: "I'm a Grob, is Asperion a good choice for me to move?",
    expectedAnswer: "No",
  },
  {
    ref: "60b95d72-4d19-4404-86dd-a88c5b8a3752",
    subject: "Feradris rainfall",
    question: "Is it true that Feradris always rains?",
    expectedAnswer: "yes",
  },
  {
    ref: "69cbe2fd-5898-413f-be3f-911ae1405d5e",
    subject: "Rocket code 0100",
    question: "There's a code 0100 on my rocket. What does it mean?",
    expectedAnswer: "Your seatbelt is off",
  },
  {
    ref: "07105368-0234-48a5-b7b3-d54df6aedc8d",
    subject: "Medical career planet",
    question:
      "I love medicine and looking to work in the medical field. Where should I go?",
    expectedAnswer: "Taurino",
  },
  {
    ref: "23cd0cce-78ce-472f-8642-5566bf41d9bf",
    subject: "Taurus permit symbol",
    question:
      "I applied to visit Taurus, they sent me a spacemail with two squiggly lines, what does it mean?",
    expectedAnswer: "You are permitted to travel there",
  },
  {
    ref: "87ae7904-2102-429e-a12b-d2bcd384a457",
    subject: "Right-angle spacemail",
    question:
      "Got a spacemail of a right angle and a dot under it. What do i do?",
    expectedAnswer:
      "Wait for further instructions and information via spacemail",
  },
  {
    ref: "64fac210-d4ae-4aff-bd30-d0ae191d5cb0",
    subject: "Incomplete-circle spacemail",
    question:
      "Got a spacemail of an incomplete circle, almost like a 'u'. What do I do?",
    expectedAnswer: "Visit www.myspacetravel-permits.glc",
  },
  {
    ref: "560f0fff-2f7b-4419-8cc7-fdba2647f14c",
    subject: "Aggressive human report",
    question:
      "There's an aggresive human and I've managed to lock them in my basement, who should I contact?",
    expectedAnswer: "Call security personnel at $$$",
  },
  {
    ref: "6569317c-9b7e-44de-8d64-31f385493ec6",
    subject: "Human handling policy",
    question: "What do we do with humans?",
    expectedAnswer: "Immediately dispose",
  },
];

export function randomTicket(): Ticket {
  const id = randomId();
  const author = randomAuthor();

  const bareTicket = ticketBank[Math.floor(Math.random() * ticketBank.length)];

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
