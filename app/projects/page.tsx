import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header";
import { getAll } from "@/lib/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects",
  alternates: {
    canonical: "https://meaganwaller.com/projects",
  },
  openGraph: {
    url: "https://meaganwaller.com/projects",
  },
};

export default async function ProjectsPage() {
  const projects = getAll("projects").filter(project => {
    if (project.meta?.draft && process.env.NODE_ENV !== "development") return false;
    return true;
  });

  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Projects" />
      <section className="divide-y dark:divide-white/10">
        {projects.map(project => (
          <ArticleLink
            key={project.slug}
            href={project.href}
            title={project.meta.title ?? "Untitled"}
            summary={project.meta.summary ?? ""}
            date={project.date ?? ""}
          />
        ))}
      </section>
    </main>
  );
}
