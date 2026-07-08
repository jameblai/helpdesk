export type Id = string; // uuid

export function generateId(): Id {
    return crypto.randomUUID();
}