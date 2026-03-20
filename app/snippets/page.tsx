import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header";
import { getAll } from "@/lib/content";

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
  const snippets = getAll("snippets").filter(snippet => {
    if (snippet.meta?.draft && process.env.NODE_ENV !== "development") return false;
    return true;
  });

  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Snippets" />
      <section className="divide-y dark:divide-white/10">
        {snippets.map(snippet => (
          <ArticleLink
            key={snippet.slug}
            href={snippet.href}
            title={snippet.meta.title ?? "Untitled"}
            summary={snippet.meta.summary ?? ""}
            date={snippet.date ?? ""}
          />
        ))}
      </section>
    </main>
  );
}
