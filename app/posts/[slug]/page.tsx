import { compile, run } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/app/components/code-block";
import { getAllPostPaths, getPostBySlug } from "@/lib/articles";
import { calculateReadingTime } from "@/lib/estimate-time";
import { createPostJsonLd } from "@/lib/jsonLd/post";

export async function generateStaticParams() {
  const paths = getAllPostPaths();

  return paths;
}

export const dynamic = "force-static";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  const parentMeta = await parent;

  return {
    title: post?.meta.title,
    description: post?.meta.summary,
    publisher: "Meagan Waller",
    creator: "Meagan Waller",
    alternates: {
      canonical: `https://meaganwaller.com/posts/${params.slug}`,
    },

    openGraph: {
      ...parentMeta?.openGraph,
      title: post?.meta?.title || parentMeta?.openGraph?.title,
      description: post?.meta?.summary || parentMeta?.openGraph?.description,
      url: `https://meaganwaller.com/posts/${params.slug}`,
      images: [
        {
          url: `https://meaganwaller.com/api/og?title=${post?.meta?.title}`,
          width: 1200,
          height: 630,
          alt: "Meagan Waller - Software Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image"
    },
  };
}

type Params = {
  slug: string;
};

async function compileMdx(content: string, mdxComponents: MDXComponents) {
  const compiled = await compile(content, {
    outputFormat: "function-body",
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "poimandres",
          keepBackground: false,
          defaultLang: "plaintext",
        },
      ],
    ],
    providerImportSource: "@mdx-js/react",
  });

  const { default: Component } = await run(compiled, {
    ...runtime,
    baseUrl: import.meta.url,
    useMDXComponents: () => mdxComponents,
  });

  return Component;
}

export default async function Post({ params }: { params: Params }) {
  const post = getPostBySlug(params.slug);

  if (!post) return notFound();

  if (post.meta.draft && process.env.NODE_ENV !== "development") {
    return notFound();
  }

  const { meta, content } = post;

  const readingTime = calculateReadingTime(content);
  const postJsonLd = createPostJsonLd(post);

  const mdxComponents = {
    pre: CodeBlock,
  };
  const MdxContent = await compileMdx(content, mdxComponents);

  return (
    <>
      <main className="px-6 md:px-0 overflow-x-hidden">
        <section>
          <h1 className="font-semibold tracking-tight text-4xl text-slate-900 dark:text-slate-100">{meta.title}</h1>
          <span className="text-slate-500 dark:text-slate-400 text-sm tracking-tight font-mono block mt-4">
            Published on{" "}
            <time dateTime={post.date}>
              {new Intl.DateTimeFormat("en-GB", {
                dateStyle: "medium",
              }).format(new Date(post.date))}
            </time>
          </span>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }} />
    </>
  );
}
