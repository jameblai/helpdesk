import { create } from "zustand";
import { randomTicket, Ticket, TicketJudgement, TicketStatus } from "./tickets";
import { Id } from "../id";
import { judgeTicket } from "./server";
import { TICKET_INTERVAL_MS } from "./constants";

export interface GameStats {
  totalTickets: number;
  successfulTickets: number;
  failedTickets: number;
  reputation: number;
}

interface TicketDerivations {
  openTicketIds: Id[];
  closedTicketIds: Id[];
  stats: GameStats;
}

export interface GameState {
  ticketsById: Record<Id, Ticket>;
  ticketIds: Id[];
  openTicketIds: Id[];
  closedTicketIds: Id[];
  stats: GameStats;

  startedAt: number;
  now: number;

  nextTicketAt: number;
  ticketIntervalMs: number;

  isRunning: boolean;

  selectedTicketId: Id | null;

  assignInitialTicket: () => void;
  tick: () => void;

  submitAnswer: (ticketId: Id, answer: string) => Promise<void>;

  selectTicket: (ticketId: Id | null) => void;
}

function deriveTickets(
  ticketIds: Id[],
  ticketsById: Record<Id, Ticket>,
): TicketDerivations {
  const openTicketIds: Id[] = [];
  const closedTicketIds: Id[] = [];
  let successfulTickets = 0;
  let failedTickets = 0;

  for (const ticketId of ticketIds) {
    const ticket = ticketsById[ticketId];
    if (!ticket) continue;

    if (ticket.status === "open") {
      openTicketIds.push(ticketId);
      continue;
    }

    closedTicketIds.push(ticketId);

    if (ticket.status === "success") {
      successfulTickets += 1;
    } else {
      failedTickets += 1;
    }
  }

  const totalTickets = ticketIds.length;
  const resolvedTickets = successfulTickets + failedTickets;

  return {
    openTicketIds,
    closedTicketIds,
    stats: {
      totalTickets,
      successfulTickets,
      failedTickets,
      reputation:
        resolvedTickets === 0
          ? 100
          : Math.floor((successfulTickets / resolvedTickets) * 100),
    },
  };
}

export const useGame = create<GameState>((set, get) => ({
  ticketsById: {},
  ticketIds: [],
  openTicketIds: [],
  closedTicketIds: [],
  stats: {
    totalTickets: 0,
    successfulTickets: 0,
    failedTickets: 0,
    reputation: 100,
  },

  startedAt: 0,
  now: 0,

  nextTicketAt: Number.POSITIVE_INFINITY,
  ticketIntervalMs: TICKET_INTERVAL_MS,

  isRunning: true,

  selectedTicketId: null,

  assignInitialTicket: () => {
    const state = get();
    if (state.ticketIds.length > 0) return;

    const now = Date.now();
    const ticket = randomTicket();
    const ticketIds = [ticket.id];
    const ticketsById = { [ticket.id]: ticket };
    const derivations = deriveTickets(ticketIds, ticketsById);

    set({
      startedAt: now,
      now,
      nextTicketAt: now + TICKET_INTERVAL_MS,
      ticketIds,
      ticketsById,
      ...derivations,
    });
  },

  tick: () => {
    const state = get();
    if (!state.isRunning) return;

    const now = Date.now();
    let ticketIds = state.ticketIds;
    let ticketsById = state.ticketsById;
    let nextTicketAt = state.nextTicketAt;
    let didChangeTickets = false;

    for (const ticketId of state.openTicketIds) {
      const ticket = ticketsById[ticketId];
      if (!ticket || now <= ticket.dueAt) continue;

      if (!didChangeTickets) {
        ticketsById = { ...ticketsById };
        didChangeTickets = true;
      }

      ticketsById[ticketId] = {
        ...ticket,
        status: "failed",
      } satisfies Ticket;
    }

    // add new ticket if it's time
    if (now >= state.nextTicketAt) {
      const ticket = randomTicket();
      if (!didChangeTickets) {
        ticketsById = { ...ticketsById };
        didChangeTickets = true;
      }

      ticketIds = [...ticketIds, ticket.id];
      ticketsById[ticket.id] = ticket;
      nextTicketAt = now + TICKET_INTERVAL_MS;
    }

    if (!didChangeTickets) {
      set({ now });
      return;
    }

    const derivations = deriveTickets(ticketIds, ticketsById);

    set({
      now,
      nextTicketAt,
      ticketIds,
      ticketsById,
      ...derivations,
    });
  },

  submitAnswer: async (ticketId: Id, answer: string) => {
    const ticket = get().ticketsById[ticketId];
    if (!ticket) return;
    if (ticket.status !== "open") return;

    const { passed, feedback } = await judgeTicket({
      ref: ticket.ref,
      answer,
    });
    const latestState = get();
    const latestTicket = latestState.ticketsById[ticketId];
    if (!latestTicket) return;
    if (latestTicket.status !== "open") return;

    const judgement = {
      passed,
      feedback,
    } satisfies TicketJudgement;
    const status: TicketStatus = passed ? "success" : "failed";

    const ticketsById = {
      ...latestState.ticketsById,
      [ticketId]: {
        ...latestTicket,
        answer,
        status,
        judgement,
      } satisfies Ticket,
    };

    const derivations = deriveTickets(latestState.ticketIds, ticketsById);

    set({
      ticketsById,
      ...derivations,
    });
  },

  selectTicket: (ticketId: Id | null) => {
    set({ selectedTicketId: ticketId });
  },
}));
