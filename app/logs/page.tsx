import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header";
import { getAll } from "@/lib/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Logs",
  alternates: {
    canonical: "https://meaganwaller.com/logs",
  },
  openGraph: {
    url: "https://meaganwaller.com/logs",
  },
};

export default async function LogsPage() {
  const logs = getAll("logs").filter(log => {
    if (log.meta?.draft && process.env.NODE_ENV !== "development") return false;
    return true;
  });

  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Logs" />
      <section className="divide-y dark:divide-white/10">
        {logs.map(log => (
          <ArticleLink
            key={log.slug}
            href={log.href}
            title={log.meta.title ?? "Untitled"}
            summary={log.meta.summary ?? ""}
            date={log.date ?? ""}
          />
        ))}
      </section>
    </main>
  );
}
