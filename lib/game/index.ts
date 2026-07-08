import { create } from "zustand";
import { randomTicket, Ticket, TicketJudgement, TicketStatus } from "./tickets";
import { Id } from "../id";
import { calculateReputation } from "./reputation";
import { judgeTicket } from "./server";
import { TICKET_DUE_MS, TICKET_INTERVAL_MS } from "./constants";

export interface GameState {
  tickets: Ticket[];

  reputation: number; // percentage of successful tickets

  startedAt: number;
  now: number;

  nextTicketAt: number;
  ticketIntervalMs: number;

  isRunning: boolean;
  tick: () => void;

  submitAnswer: (ticketId: Id, answer: string) => Promise<void>;
}

export const useGame = create<GameState>((set, get) => ({
  tickets: [],

  reputation: 100,

  startedAt: Date.now(),
  now: Date.now(),

  nextTicketAt: Date.now() + TICKET_INTERVAL_MS,
  ticketIntervalMs: TICKET_INTERVAL_MS,

  isRunning: true,
  tick: () => {
    const state = get();
    if (!state.isRunning) return;

    const now = Date.now();
    let didFailTicket = false;

    // fail open tickets that are past due
    const tickets = state.tickets.map((ticket) => {
      const isOpen = ticket.status === "open";
      const pastDue = now > ticket.dueAt;

      if (isOpen && pastDue) {
        didFailTicket = true;
        return { ...ticket, status: "failed" } satisfies Ticket;
      }

      return ticket;
    });

    let nextTicketAt = state.nextTicketAt;

    // add new ticket if it's time
    if (now >= state.nextTicketAt) {
      const ticket = randomTicket();
      tickets.push(ticket);
      nextTicketAt = now + TICKET_INTERVAL_MS;
    }

    // calculate reputation if the ticket failed
    const reputation = didFailTicket
      ? calculateReputation(tickets)
      : state.reputation;

    set({
      now,
      tickets,
      nextTicketAt,
      reputation,
    });
  },

  submitAnswer: async (ticketId: Id, answer: string) => {
    const state = get();
    const ticket = state.tickets.find((t) => t.id === ticketId);
    if (!ticket) return;
    if (ticket.status !== "open") return;

    const { passed, feedback } = await judgeTicket({ ref: ticket.ref, answer });
    const judgement = {
      passed,
      feedback,
    } satisfies TicketJudgement;
    const status: TicketStatus = passed ? "success" : "failed";

    const tickets = state.tickets.map((t) =>
      t.id === ticketId
        ? ({ ...t, answer, status, judgement } satisfies Ticket)
        : t,
    );

    set({ tickets });
  },
}));
