"use client";

import clsx from "clsx";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { isValidElement, useState } from "react";

interface CodeBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  children?: React.ReactNode;
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return "";
}

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCopy = async () => {
    const textContent = extractText(children);

    if (textContent) {
      try {
        setIsAnimating(true);

        const nav = navigator as Navigator & {
          clipboard?: { writeText: (text: string) => Promise<void> };
        };

        if (nav.clipboard?.writeText) {
          await nav.clipboard.writeText(textContent);
        } else {
          const doc = (globalThis as {
            document?: {
              createElement: (tag: string) => {
                value: string;
                setAttribute: (name: string, value: string) => void;
                style: { position: string; left: string };
                select: () => void;
              };
              body: {
                appendChild: (node: unknown) => void;
                removeChild: (node: unknown) => void;
              };
              execCommand?: (commandId: string) => boolean;
            };
          }).document;

          if (!doc) throw new Error("Clipboard API is unavailable");

          const textarea = doc.createElement("textarea");
          textarea.value = textContent;
          textarea.setAttribute("readonly", "");
          textarea.style.position = "absolute";
          textarea.style.left = "-9999px";
          doc.body.appendChild(textarea);
          textarea.select();
          doc.execCommand?.("copy");
          doc.body.removeChild(textarea);
        }

        // Small delay for the animation effect
        setTimeout(() => {
          setCopied(true);
          setIsAnimating(false);
          // Reset after 2 seconds
          setTimeout(() => setCopied(false), 2000);
        }, 150);
      } catch (err) {
        console.error("Failed to copy text: ", err);
        setIsAnimating(false);
      }
    }
  };

  return (
    <div className="relative group">
      <pre className={className} {...props}>
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-slate-800/80 hover:bg-slate-700/80 transition-all duration-200 opacity-0 group-hover:opacity-100 border border-slate-600/30 text-slate-300 hover:text-white z-10"
        aria-label="Copy code to clipboard"
        type="button"
      >
        <div className="relative w-4 h-4">
          {/* Copy Icon */}
          <svg
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 w-4 h-4 text-slate-300 transition-all duration-150",
              copied || isAnimating ? "opacity-0 scale-50 blur-sm" : "opacity-100 scale-100 blur-0"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>

          {/* Success Icon */}
          <svg
            aria-hidden="true"
            className={clsx(
              "absolute inset-0 w-4 h-4 text-green-400 transition-all duration-150",
              copied ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-50 blur-sm"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </button>
    </div>
  );
}
