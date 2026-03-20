import type { ContentItem } from "@/lib/content";

export const createPostJsonLd = (post: ContentItem) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    url: `https://meaganwaller.com/posts/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: [
      {
        "@type": "Person",
        name: "Meagan Waller",
        url: "https://meaganwaller.com",
      },
    ],
  };
};
