import type { MDXComponents } from 'mdx/types';

/**
 * Custom MDX components with AWS theme styling
 * This file customizes how MDX elements are rendered across the blog
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings with AWS styling
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-aws-dark mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-aws-dark mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-aws-dark mb-3 mt-5">
        {children}
      </h3>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="text-aws-dark mb-4 leading-relaxed">
        {children}
      </p>
    ),

    // Links with AWS blue
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-aws-blue hover:text-aws-orange underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),

    // Code blocks
    code: ({ children, className }) => {
      const isInline = !className;
      if (isInline) {
        return (
          <code className="bg-aws-light-gray text-aws-dark px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className={`block bg-aws-dark text-white p-4 rounded-lg overflow-x-auto mb-4 ${className || ''}`}>
          {children}
        </code>
      );
    },

    // Pre blocks (wraps code blocks)
    pre: ({ children }) => (
      <pre className="bg-aws-dark text-white p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 text-aws-dark space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 text-aws-dark space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">
        {children}
      </li>
    ),

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-aws-orange pl-4 py-2 mb-4 italic text-aws-dark-gray bg-aws-light-gray">
        {children}
      </blockquote>
    ),

    // Horizontal rule
    hr: () => (
      <hr className="border-t-2 border-aws-light-gray my-8" />
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-aws-light-gray">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-aws-dark text-white px-4 py-2 text-left font-semibold border border-aws-light-gray">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border border-aws-light-gray">
        {children}
      </td>
    ),

    // Allow custom components to be passed in
    ...components,
  };
}
