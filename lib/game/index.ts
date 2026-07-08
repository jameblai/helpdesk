import { create } from "zustand";
import { Ticket } from "./tickets";
import { Id } from "../id";

export interface GameState {
  tickets: Ticket[];

  score: number; // total score of all tickets
  reputation: number; // percentage of successful tickets

  startedAt: number;
  now: number;

  nextTicketAt: number;
  ticketIntervalMs: number;

  isRunning: boolean;

  startGame: () => void;
  pauseGame: () => void;
  tick: () => void;

  submitAnswer: (ticketId: Id, answer: string) => void;
}

export const TICKET_INTERVAL_MS = 20_000; // 20 seconds
export const TICKET_DUE_MS = 60_000; // 1 minute

const useGame = create<GameState>((set, get) => ({
  tickets: [],

  score: 0,
  reputation: 100,

  startedAt: Date.now(),
  now: Date.now(),

  nextTicketAt: Date.now() + TICKET_INTERVAL_MS,
  ticketIntervalMs: TICKET_INTERVAL_MS,

  isRunning: false,

  startGame: () => {
    throw new Error("Function not implemented.");
  },

  pauseGame: () => {
    throw new Error("Function not implemented.");
  },

  tick: () => {
    throw new Error("Function not implemented.");
  },

  submitAnswer: (ticketId: Id, answer: string) => {
    throw new Error("Function not implemented.");
  },
}));
