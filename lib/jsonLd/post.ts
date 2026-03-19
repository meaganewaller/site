import type { Post } from "@/lib/articles";

export const createPostJsonLd = (post: Post) => {
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
