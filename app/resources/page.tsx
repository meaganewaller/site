import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header";
import { getAll } from "@/lib/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resources",
  alternates: {
    canonical: "https://meaganwaller.com/resources",
  },
  openGraph: {
    url: "https://meaganwaller.com/resources",
  },
};

export default async function ResourcesPage() {
  const resources = getAll("resources").filter(resource => {
    if (resource.meta?.draft && process.env.NODE_ENV !== "development") return false;
    return true;
  });

  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Resources" />
      <section className="divide-y dark:divide-white/10">
        {resources.map(resource => (
          <ArticleLink
            key={resource.slug}
            href={resource.href}
            title={resource.meta.title ?? "Untitled"}
            summary={resource.meta.summary ?? ""}
            date={resource.date ?? ""}
          />
        ))}
      </section>
    </main>
  );
}
