import type { Metadata } from "next";
import { ArticleLink } from "@/app/components/article-link";
import { PageHeader } from "@/app/components/page-header"
import { getAllPosts } from "@/lib/articles"

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Posts",
  alternates: {
    canonical: "https://meaganwaller.com/posts",
  },
  openGraph: {
    url: "https://meaganwaller.com/posts",
  },
};

export default async function Page() {
  const posts = await getAllPosts({
    includeDrafts: process.env.NODE_ENV === "development"
  });

  const filteredPosts = posts.filter(post => {
    if (post.meta?.draft && process.env.NODE_ENV !== "development") {
      return false;
    }
    return true;
  });
  return (
    <main className="px-6 md:px-0">
      <PageHeader title="Writing" />
      <section className="divide-y dark:divide-white/10">
        {filteredPosts.map(post => {
          const title = post.meta.title ?? "Untitled";

          return (
            <ArticleLink
              key={title}
              href={post.href}
              title={title}
              summary={post.meta.summary ?? ""}
              date={post.date}
            />
          );
        })}
      </section>
    </main>
  )
}
