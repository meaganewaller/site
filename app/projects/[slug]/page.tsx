import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/app/components/code-block";
import { getBySlug, getAllSlugs } from "@/lib/content";
import { compileMdx } from "@/lib/mdx";
import { calculateReadingTime } from "@/lib/estimate-time";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllSlugs("projects");
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const project = getBySlug("projects", slug);
  if (!project) return {};

  const parentMeta = await parent;

  return {
    title: project.meta.title,
    description: project.meta.summary,
    alternates: {
      canonical: `https://meaganwaller.com/projects/${slug}`,
    },
    openGraph: {
      ...parentMeta?.openGraph,
      title: project.meta.title || parentMeta?.openGraph?.title,
      description: project.meta.summary || parentMeta?.openGraph?.description,
      url: `https://meaganwaller.com/projects/${slug}`,
      images: [
        {
          url: `https://meaganwaller.com/api/og?title=${project.meta.title}`,
          width: 1200,
          height: 630,
          alt: "Meagan Waller - Software Engineer",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getBySlug("projects", slug);

  if (!project) return notFound();
  if (project.meta.draft && process.env.NODE_ENV !== "development") return notFound();

  const readingTime = calculateReadingTime(project.content);
  const MdxContent = await compileMdx(project.content, { pre: CodeBlock });

  return (
    <main className="px-6 md:px-0 overflow-x-hidden">
      <section>
        <h1 className="font-semibold tracking-tight text-4xl text-slate-900 dark:text-slate-100">
          {project.meta.title}
        </h1>
        {project.date && (
          <span className="text-slate-500 dark:text-slate-400 text-sm tracking-tight font-mono block mt-4">
            Published on{" "}
            <time dateTime={project.date}>
              {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                new Date(project.date)
              )}
            </time>
          </span>
        )}
        <span className="text-slate-500 dark:text-slate-400 text-sm tracking-tight font-mono block mt-1">
          {readingTime} minute read
        </span>
      </section>
      <section className="py-5">
        <article className="prose prose-lg prose-slate dark:prose-invert text-justify w-full max-w-none">
          <MdxContent />
        </article>
      </section>
    </main>
  );
}
