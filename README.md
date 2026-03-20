# meaganwaller.com

My personal website — built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [MDX](https://mdxjs.com/).

## Getting Started

Requires [Bun](https://bun.sh/).

```sh
bun install
bun run dev
```

The site will be available at `http://localhost:3000`.

## Scripts

| Command            | Description              |
| ------------------ | ------------------------ |
| `bun run dev`      | Start development server |
| `bun run build`    | Production build         |
| `bun run start`    | Start production server  |
| `bun run lint`     | Lint with Biome          |
| `bun run format`   | Format with Biome        |

## Content

All content lives in the `content/` directory as MDX files.

| Directory            | Route              | Description                |
| -------------------- | ------------------ | -------------------------- |
| `content/posts/`     | `/posts/:slug`     | Blog posts                 |
| `content/snippets/`  | `/snippets/:slug`  | Code snippets              |
| `content/projects/`  | `/projects/:slug`  | Projects                   |
| `content/resources/` | `/resources/:slug` | Resources                  |
| `content/logs/`      | —                  | Changelog entries (index)  |
| `content/pages/`     | `/:slug`           | Static pages (about, etc.) |

Posts, snippets, projects, resources, and logs use dated filenames: `YYYY-MM-DD-slug.mdx`. Pages use simple filenames: `slug.mdx`.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: Bun
- **Styling**: Tailwind CSS 4
- **Content**: MDX with gray-matter frontmatter
- **Linting/Formatting**: Biome
- **Animations**: Framer Motion
