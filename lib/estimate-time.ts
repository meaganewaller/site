export function calculateReadingTime(content: string): number {
  // Remove HTML tables
  const contentWithoutTables = content.replace(/<table[\s\S]*?<\/table>/gi, "");

  // More accurate Markdown table removal (entire rows)
  const contentWithoutMarkdownTables = contentWithoutTables.replace(/^\|.*\|.*$/gm, "");

  // Remove HTML tags
  const textContent = contentWithoutMarkdownTables.replace(/<[^>]*>/g, " ");

  // Normalize spaces and split into words
  const words = textContent
    .replace(/[\r\n]+/g, " ") // Convert newlines to spaces
    .replace(/[.,!?;:(){}[\]"]/g, "") // Remove punctuation
    .split(/\s+/) // Split by spaces
    .filter(Boolean).length;

  // Words per minute (average adult reading speed)
  const averageWPM = 250;

  // Calculate reading time
  const readingTime = words / averageWPM;

  // Ensure minimum reading time is 1 minute for small texts
  return Math.max(1, Math.floor(readingTime));
}
