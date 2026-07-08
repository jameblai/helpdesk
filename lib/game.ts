import { create } from 'zustand'

const authors = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
] as const;

type Author = typeof authors[number]

type TicketStatus = "open" | "success" | "failed"

type Id = string; // uuid

export interface TicketJudgement {
    passed: boolean;
    score: number;
    feedback: string;
}

export interface Ticket {
    id: Id,
    author: Author;
    subject: string;
    body: string;

    status: TicketStatus;

    createdAt: Date;
    dueAt: Date;

    answer?: string;
    judgement?: TicketJudgement;
}

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

    submitAnswer: (ticketId: string, answer: string) => void;
}

export const TICKET_INTERVAL_MS = 20_000; // 20 seconds

function calculateReputation(tickets: Ticket[]): number {
    const totalTickets = tickets.length;
    if (totalTickets === 0) return 100; // no tickets yet, full reputation

    const successfulTickets = tickets.filter(ticket => ticket.status === "success").length;
    return Math.floor((successfulTickets / totalTickets) * 100);
}

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

    submitAnswer: (ticketId: string, answer: string) => {
        throw new Error("Function not implemented.");
    }
}))