import { Container } from "@/components/Container";
import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
  title: "Manual | Alien Helpdesk",
  description: "Reference manual for Alien Helpdesk tickets",
};

async function getManualMarkdown() {
  return readFile(path.join(process.cwd(), "manual.md"), "utf8");
}

const markdownComponents: Components = {
  table({ children }) {
    return (
      <div className="not-prose bg-card my-8 overflow-x-auto border">
        <table className="w-full min-w-2xl border-collapse text-sm">
          {children}
        </table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="bg-muted text-foreground border-b px-3 py-2 text-left align-bottom font-semibold">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="text-card-foreground border-b px-3 py-2 align-top last:border-r-0">
        {children}
      </td>
    );
  },
};

export default async function ManualPage() {
  const markdown = await getManualMarkdown();

  return (
    <Container className="py-4 md:py-8">
      <article className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </Container>
  );
}
