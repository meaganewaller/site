import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header"
import { getAllSnippets } from "@/lib/snippets"

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Snippets",
  alternates: {
    canonical: "https://meaganwaller.com/snippets",
  },
  openGraph: {
    url: "https://meaganwaller.com/snippets",
  },
};

export default async function SnippetsPage() {
  const snippets = await getAllSnippets({
    includeDrafts: process.env.NODE_ENV === "development"
  });

  const filteredSnippes = snippets.filter(snippet => {
    if (snippet.meta?.draft && process.env.NODE_ENV !== "development") {
      return false;
    }
    return true;
  });
  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Snippets" />
      <section className="divide-y dark:divide-white/10">
        {filteredSnippes.map(snippet => {
          const title = snippet.meta.title ?? "Untitled";

          return (
            <ArticleLink
              key={title}
              href={snippet.href}
              title={title}
              summary={snippet.meta.summary ?? ""}
              date={snippet.meta.date}
            />
          );
        })}
      </section>
    </main>
  )
}
