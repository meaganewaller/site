import { compile, run } from "@mdx-js/mdx";
import type { MDXComponents } from "mdx/types";
import * as runtime from "react/jsx-runtime";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export async function compileMdx(content: string, components: MDXComponents = {}) {
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
    useMDXComponents: () => components,
  });

  return Component;
}
