import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/app/components/code-block";
import { getBySlug, getAllSlugs } from "@/lib/content";
import { compileMdx } from "@/lib/mdx";
import { calculateReadingTime } from "@/lib/estimate-time";
import { createPostJsonLd } from "@/lib/jsonLd/post";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllSlugs("posts");
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = getBySlug("posts", slug);
  if (!post) return {};

  const parentMeta = await parent;

  return {
    title: post.meta.title,
    description: post.meta.summary,
    publisher: "Meagan Waller",
    creator: "Meagan Waller",
    alternates: {
      canonical: `https://meaganwaller.com/posts/${slug}`,
    },
    openGraph: {
      ...parentMeta?.openGraph,
      title: post.meta.title || parentMeta?.openGraph?.title,
      description: post.meta.summary || parentMeta?.openGraph?.description,
      url: `https://meaganwaller.com/posts/${slug}`,
      images: [
        {
          url: `https://meaganwaller.com/api/og?title=${post.meta.title}`,
          width: 1200,
          height: 630,
          alt: "Meagan Waller - Software Engineer",
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const post = getBySlug("posts", slug);

  if (!post) return notFound();
  if (post.meta.draft && process.env.NODE_ENV !== "development") return notFound();

  const readingTime = calculateReadingTime(post.content);
  const postJsonLd = createPostJsonLd(post);
  const MdxContent = await compileMdx(post.content, { pre: CodeBlock });

  return (
    <>
      <main className="px-6 md:px-0 overflow-x-hidden">
        <section>
          <h1 className="font-semibold tracking-tight text-4xl text-slate-900 dark:text-slate-100">
            {post.meta.title}
          </h1>
          {post.date && (
            <span className="text-slate-500 dark:text-slate-400 text-sm tracking-tight font-mono block mt-4">
              Published on{" "}
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(
                  new Date(post.date)
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
    </>
  );
}
