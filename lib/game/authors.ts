export const authors = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
] as const;

export type Author = (typeof authors)[number];

export function randomAuthor(): Author {
  return authors[Math.floor(Math.random() * authors.length)];
}
