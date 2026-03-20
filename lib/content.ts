import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type ContentType = "pages" | "posts" | "snippets" | "projects" | "logs" | "resources";

export interface ContentItem {
  meta: Record<string, string>;
  slug: string;
  content: string;
  date?: string;
  href: string;
}

const CONTENT_DIR = "content";

function contentPath(type: ContentType): string {
  return path.join(CONTENT_DIR, type);
}

function ensureDir(type: ContentType): void {
  const dir = contentPath(type);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

const DATED_FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-(.*).mdx$/;

function parseDatedFilename(filename: string): { date: string; slug: string } | null {
  const match = filename.match(DATED_FILENAME_RE);
  if (match?.[1] && match?.[2]) {
    return { date: match[1], slug: match[2] };
  }
  return null;
}

function parseSimpleFilename(filename: string): string | null {
  const match = filename.match(/^(.+)\.mdx$/);
  return match?.[1] ?? null;
}

function hrefForType(type: ContentType, slug: string): string {
  if (type === "pages") return `/${slug}`;
  return `/${type}/${slug}`;
}

function readContentFile(type: ContentType, filename: string): ContentItem | null {
  const filePath = path.join(contentPath(type), filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data: frontMatter, content } = matter(fileContent);

  if (type === "pages") {
    const slug = parseSimpleFilename(filename);
    if (!slug) return null;
    return {
      meta: frontMatter as Record<string, string>,
      slug,
      content,
      href: hrefForType(type, slug),
    };
  }

  const parsed = parseDatedFilename(filename);
  if (!parsed) return null;

  return {
    meta: frontMatter as Record<string, string>,
    slug: parsed.slug,
    date: parsed.date,
    content,
    href: hrefForType(type, parsed.slug),
  };
}

export function getBySlug(type: ContentType, slug: string): ContentItem | null {
  ensureDir(type);
  const files = fs.readdirSync(contentPath(type));

  if (type === "pages") {
    const filename = `${slug}.mdx`;
    if (files.includes(filename)) {
      return readContentFile(type, filename);
    }
    return null;
  }

  const re = new RegExp(`^\\d{4}-\\d{2}-\\d{2}-${slug}\\.mdx$`);
  for (const filename of files) {
    if (re.test(filename)) {
      return readContentFile(type, filename);
    }
  }
  return null;
}

export function getAll(type: ContentType): ContentItem[] {
  ensureDir(type);
  const dir = contentPath(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith(".mdx"));
  const items = files
    .map(f => readContentFile(type, f))
    .filter((item): item is ContentItem => item !== null);

  if (type !== "pages") {
    items.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date) > new Date(a.date) ? 1 : -1;
    });
  }

  return items;
}

export function getAllSlugs(type: ContentType): { slug: string }[] {
  return getAll(type).map(item => ({ slug: item.slug }));
}
