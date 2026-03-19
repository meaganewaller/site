import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Snippet } from "@/types";
import { getAllPosts } from "./articles";

export interface Snippet {
  meta: {
    [key: string]: string;
  };
  slug: string;
  date: string;
  href: string;
  content: string;
  language: string;
}

export const getRegexForSlug = (slug: string): RegExp => {
  return new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${slug}.mdx$`);
};

const SNIPPETS_PATH = "content/snippets";
interface DateAndSlug {
  date: string;
  slug: string;
}

/**
 * Extracts date and slug from filename.
 * @param filename - The filename to extract data from.
 * @returns An object containing the date and slug, or null if the filename does not match the expected format.
 */
export const getDateAndSlugFromFilename = (filename: string): DateAndSlug | null => {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-(.*).mdx$/);
  if (match && typeof match[1] === "string" && typeof match[2] === "string") {
    return {
      date: match[1],
      slug: match[2],
    };
  }
  return null;
};

/**
 * Reads a file and returns its front matter and date and slug.
 * @param filename - The name of the file to read.
 * @returns An object containing the front matter, date, slug, and href, or null if the filename does not match the expected format.
 */
const getSnippetFromFile = (filename: string, isWork?: boolean): Snippet | null => {
  const fileContent = fs.readFileSync(path.join(SNIPPETS_PATH, filename), "utf-8");

  const { data: frontMatter, content } = matter(fileContent);

  const dateAndSlug = getDateAndSlugFromFilename(filename);

  if (!dateAndSlug) {
    return null;
  }

  const { date, slug } = dateAndSlug;

  return {
    meta: frontMatter,
    content,
    slug,
    date,
    href: `/${isWork ? "projects" : "posts"}/${slug}`,
  };
};

/**
 * Gets a post by its slug.
 * @param slug - The slug of the post to get.
 * @returns The post with the given slug, or null if no such post exists.
 */
export const getSnippetBySlug = (slug: string, isWork?: boolean): Snippet | null => {
  const files = fs.readdirSync(path.join(SNIPPETS_PATH));

  for (const filename of files) {
    if (getRegexForSlug(slug).test(filename)) {
      const snippet = getSnippetFromFile(filename, isWork);
      if (snippet) {
        return snippet;
      }
    }
  }

  return null;
};

/**
 * Gets all snippets.
 * @returns An array of all snippets, sorted by date in descending order.
 */
export const getAllSnippets = async ({
  includeDrafts,
  filePath,
  isWork,
}: {
  includeDrafts?: boolean;
  filePath?: string;
  isWork?: boolean;
}): Promise<Snippet[]> => {
  const files = fs.readdirSync(path.join(SNIPPETS_PATH));

  const snippets: Snippet[] = files.map(item => getSnippetFromFile(item, isWork)).filter((snippet): snippet is Snippet => snippet !== null);

  const filteredAndSortedSnippets = snippets.sort((a, b) => {
    if (new Date(a.date) > new Date(b.date)) {
      return -1;
    }
    return 1;
  });

  return filteredAndSortedSnippets;
};

/**
 * Generates an array of all the paths for the posts.
 * @returns An array of all the paths for the posts.
 */
export async function getAllSnippetPaths(isWork?: boolean) {
  const snippets = await getAllSnippets({ isWork });

  const paths = snippets.map(snippet => ({ slug: snippet.slug }));

  return paths;
}
