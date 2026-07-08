import { Author } from "@/lib/game/authors";
import Image from "next/image";

export function AuthorLine({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={author.image}
        alt={author.name}
        className="size-10 rounded-full border bg-muted"
        width={4000}
        height={4000}
        sizes="40px"
      />
      <div className="flex flex-col gap-0.5">
        <p className="font-medium leading-none">{author.name}</p>
        <p className="text-sm text-muted-foreground leading-none">{author.variant}</p>
      </div>
    </div>
  );
}
