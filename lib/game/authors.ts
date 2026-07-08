export const authorNames = [
  "Alice",
  "Bob",
  "Charlie",
  "David",
  "Eve",
  "Frank",
  "Grace",
] as const;

export const authorVariants = ["grob0", "grob1", "kindor0", "kindor1", "rulix0", "rulix1"] as const;

export type AuthorName = (typeof authorNames)[number];
export type AuthorVariant = (typeof authorVariants)[number];

export interface Author {
  name: AuthorName;
  variant: AuthorVariant;
  image: string;
}

function randomAuthorName(): AuthorName {
  return authorNames[Math.floor(Math.random() * authorNames.length)];
}

function randomAuthorVariant(): AuthorVariant {
  return authorVariants[Math.floor(Math.random() * authorVariants.length)];
}

export function randomAuthor(): Author {
  const name = randomAuthorName();
  const variant = randomAuthorVariant();
  const image = `/${variant}.png`;

  return {
    name: name,
    variant: variant,
    image: image,
  };
}
