/**
 * Strip markdown syntax to get plain text word count
 */
function stripMarkdown(markdown: string): string {
  return markdown
    // Remove frontmatter
    .replace(/^---[\s\S]*?---/, '')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]*`/g, '')
    // Remove images
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove headings markers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate estimated reading time for content
 * @param content - The text content to analyze
 * @returns Reading time in minutes
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200; // Average reading speed
  const plainText = stripMarkdown(content);
  const words = plainText.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = words / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes)); // Minimum 1 minute, round up
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string (e.g., "5 min read")
 */
export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
