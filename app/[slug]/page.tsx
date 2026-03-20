import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/app/components/code-block";
import { getBySlug, getAllSlugs } from "@/lib/content";
import { compileMdx } from "@/lib/mdx";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return getAllSlugs("pages");
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const page = getBySlug("pages", slug);
  if (!page) return {};

  const parentMeta = await parent;
  const { meta } = page;

  return {
    title: `${meta.title} - Meagan Waller`,
    description: meta.description,
    openGraph: {
      ...parentMeta?.openGraph,
      title: meta.title || parentMeta?.openGraph?.title,
      description: meta.description || parentMeta?.openGraph?.description,
      url: `https://meaganwaller.com/${slug}`,
      siteName: "Meagan Waller",
      images: meta.ogImage
        ? [
            {
              url: `https://meaganwaller.com${meta.ogImage}`,
              width: 1200,
              height: 630,
              alt: "Photo of Meagan Waller",
            },
          ]
        : parentMeta?.openGraph?.images,
      locale: "en-US",
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = getBySlug("pages", slug);

  if (!page) return notFound();

  const MdxContent = await compileMdx(page.content, { pre: CodeBlock });

  return (
    <article
      id="page-content"
      className="prose xl:prose-2xl lg:prose-xl md:prose-lg mx-auto"
    >
      <MdxContent />
    </article>
  );
}
