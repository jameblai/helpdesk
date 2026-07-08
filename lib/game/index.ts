import { create } from "zustand";
import { judgeTicket, randomTicket, Ticket, TicketStatus } from "./tickets";
import { Id } from "../id";
import { calculateReputation } from "./reputation";

export const TICKET_INTERVAL_MS = 20_000; // 20 seconds
export const TICKET_DUE_MS = 60_000; // 1 minute

export interface GameState {
  tickets: Ticket[];

  score: number; // total score of all tickets
  reputation: number; // percentage of successful tickets

  startedAt: number;
  now: number;

  nextTicketAt: number;
  ticketIntervalMs: number;

  isRunning: boolean;
  tick: () => void;

  submitAnswer: (ticketId: Id, answer: string) => void;
}

export const useGame = create<GameState>((set, get) => ({
  tickets: [],

  score: 0,
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
      const pastDue = now - ticket.dueAt >= TICKET_DUE_MS;

      if (isOpen && pastDue) {
        didFailTicket = true;
        return { ...ticket, status: "failed" } satisfies Ticket;
      }

      return ticket;
    });

    let nextTicketAt = state.nextTicketAt;

    // add new tiocket if it's time
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

  submitAnswer: (ticketId: Id, answer: string) => {
    const state = get();
    const ticket = state.tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const judgement = judgeTicket(ticket, answer);
    const status: TicketStatus = judgement.passed ? "success" : "failed";

    const tickets = state.tickets.map((t) =>
      t.id === ticketId ? ({ ...t, status, judgement } satisfies Ticket) : t,
    );

    set({ tickets });
  },
}));
