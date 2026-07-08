export type Id = string; // uuid

export function randomId(): Id {
    return crypto.randomUUID();
}