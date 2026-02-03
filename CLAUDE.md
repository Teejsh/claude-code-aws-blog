

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a blog about using Claude Code with AWS Bedrock. The blog teaches developers how to use Claude Code for AWS development, with posts covering:

- **AWS Bedrock Integration**: How to integrate Claude via AWS Bedrock into applications
- **MCP Servers**: Building and using Model Context Protocol servers for enhanced Claude capabilities
- **CI/CD**: Automating AWS deployments and workflows with Claude Code
- **Best Practices**: Patterns for AI-assisted development on AWS infrastructure

Built as a Next.js 14 application during the AWS Claude Code workshop, this blog demonstrates how to use Claude Code to build modern web applications with AWS branding and best practices.

**Tech Stack:**
- Next.js 14.2.22 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 4
- MDX processing: @next/mdx, @mdx-js/react, gray-matter, remark-gfm

## Design Requirements

### Color System
- **Primary Color**: AWS Orange (`#FF9900`) - Use for primary CTAs, active states, and key highlights
- **Secondary Color**: AWS Dark (`#232F3E`) - Use for headers, body text, and dark backgrounds
- **Supporting Colors**:
  - AWS Blue (`#146EB4`) - Links and informational elements
  - AWS Light Gray (`#F2F3F3`) - Light backgrounds and borders
  - AWS Dark Gray (`#545B64`) - Secondary text and muted elements

### Visual Style
- **Aesthetic**: Professional, technical design inspired by AWS documentation
- Clean, minimal layouts with clear information hierarchy
- Focus on readability and content comprehension
- Use whitespace generously for visual breathing room
- Technical diagrams and code blocks should be prominent and easy to scan

### Responsive Design
- **Mobile-First Approach**: Design and implement for mobile devices first, then scale up
- **Breakpoints**:
  - Mobile: < 768px (single column, larger touch targets)
  - Tablet: 768px - 1024px (2-column layouts where appropriate)
  - Desktop: > 1024px (3-column layouts, wider content containers)
- All interactive elements must have minimum 44x44px touch targets on mobile

### Rendering Architecture
- **Server-Side Rendering Only**: No client JavaScript required for core functionality
- All components are React Server Components by default
- Navigation, content display, and layouts must work without JavaScript
- Progressive enhancement: Site must be fully functional with JavaScript disabled
- Only add `"use client"` if absolutely necessary for interactivity (avoid if possible)

### Typography
- **Body Text**: System sans-serif fonts (ui-sans-serif, system-ui)
- **Code**: Monospace with Fira Code preferred
- **Line Height**: 1.6 for body text, 1.2 for headings
- **Font Sizes**: Scale appropriately across breakpoints

## Key Files

### Essential Configuration Files

**@package.json**
- Defines all project dependencies (Next.js 14.2.22, React 18, TypeScript, Tailwind, markdown libraries)
- Contains npm scripts for development, build, lint, and format
- Dev server configured to bind to `0.0.0.0` for network access via CloudFront proxy

**@next.config.mjs**
- MDX configuration with @next/mdx and remark-gfm support (ES module format)
- CloudFront proxy configuration with rewrites for `/proxy/3000/*` paths
- Security headers (X-Frame-Options, X-Content-Type-Options)
- Critical for CloudFront compatibility in workshop environment

**@app/layout.tsx**
- Root layout component with inline CSS in `<head>` section
- Inline styles bypass CloudFront MIME type issues with external stylesheets
- Contains AWS theme variables, utility classes, and base styles
- Includes footer with AWS branding
- All styles needed for the site to work are inlined here

### Core Application
- `app/page.tsx` - Home page with hero section and post list placeholders
- `app/globals.css` - Global styles and AWS theme variables (CSS custom properties)
- `tsconfig.json` - TypeScript configuration with `@/*` path alias

### Components & Utilities
- `app/components/ReadingTimeBadge.tsx` - AWS-styled reading time badge component
- `app/lib/readingTime.ts` - Reading time calculation utilities (200 WPM)
- `mdx-components.tsx` - Custom MDX component styling with AWS theme (headings, links, code blocks, tables)

### Content
- `content/posts/` - Blog post MDX files (currently empty, students will create)

### Configuration
- `.prettierrc` - Code formatting configuration
- `eslint.config.mjs` - ESLint configuration for Next.js
- `postcss.config.mjs` - PostCSS configuration for Tailwind

## Development Workflow

### Running the Application
```bash
npm install        # Install dependencies
npm run dev        # Start development server on localhost:3000
npm run build      # Build for production
npm run lint       # Run ESLint
```

### Code Style
- Use TypeScript for type safety
- Follow React Server Components pattern (Next.js App Router)
- Components are Server Components by default - only add "use client" for interactivity
- Use Tailwind CSS utility classes with AWS theme colors
- Keep components small and focused
- Add comments for complex logic
- Reading time: 200 words per minute (see `app/lib/readingTime.ts`)

## Architecture

### Styling Approach

This project uses a **hybrid styling approach** for CloudFront proxy compatibility:

1. **Inline styles in layout.tsx**: Critical AWS theme variables and utility classes are inlined in `<head>` to bypass MIME type issues with the CloudFront proxy
2. **globals.css**: Contains CSS custom properties for AWS colors and additional global styles
3. **Tailwind CSS 4**: Used for component styling with AWS theme integration

The inline styles ensure the app works correctly when accessed through CloudFront's `/proxy/3000/` path.

### Component Architecture

- **Server Components (default)**: All components render on the server unless they need interactivity
- **Client Components**: Only use `"use client"` for components with event handlers, hooks, or browser APIs
- **Reading time calculation**: Utility functions in `app/lib/readingTime.ts` calculate reading time at 200 WPM

### Blog Post System (To Be Built)

Students will build:
1. MDX parsing with frontmatter support (using gray-matter)
2. Dynamic routing for individual posts (`app/posts/[slug]/page.tsx`)
3. Post listing with metadata display
4. Reading time badges using the ReadingTimeBadge component

## AWS Theme Usage

When building components, always reference the AWS color palette:

```typescript
// Example: AWS-themed button
<button className="bg-aws-orange hover:bg-aws-blue text-white px-6 py-3 rounded">
  Call to Action
</button>

// Example: AWS-themed heading
<h1 className="text-aws-dark font-bold text-4xl">
  Heading Text
</h1>
```

## CloudFront Proxy Architecture

### CRITICAL: How the Proxy Works

This project runs behind a CloudFront proxy with specific path-stripping behavior that affects navigation:

**Public URL Structure:**
```
https://{cloudfront-url}/proxy/3000/
```

**Path Stripping Behavior:**
- User visits: `https://{cloudfront-url}/proxy/3000/posts/slug`
- CloudFront strips prefix and forwards to Next.js as: `/posts/slug`
- Next.js receives requests WITHOUT the `/proxy/3000/` prefix
- Next.js routes are defined without the prefix (e.g., `app/posts/[slug]/page.tsx`)

**Navigation Requirements:**
- ALL `Link` components must output full paths: `/proxy/3000/posts/slug`
- Use the `withBasePath()` helper from `app/lib/basePath.ts` (students will create this)
- Example: `<Link href={withBasePath('/posts/slug')}>`
- The helper adds `/proxy/3000/` to all internal navigation URLs
- Note: The basePath helper doesn't exist yet - students will create it in later exercises

**Configuration Approach:**
- ✅ DO use `next.config.mjs` rewrites for server-side routing
- ✅ DO use `withBasePath()` helper for all Link hrefs
- ❌ DO NOT use `basePath` in `next.config.mjs` (won't work with path stripping)
- ❌ DO NOT hardcode proxy path in route files

**Why This Approach:**
CloudFront strips the prefix before Next.js sees the request, so `basePath` doesn't work. Instead:
1. Server-side: Next.js routes handle requests at `/` and `/posts/[slug]`
2. Client-side: Links must include `/proxy/3000/` so browsers navigate to correct URLs
3. The `withBasePath()` helper bridges this gap

## CloudFront Proxy Setup

**Environment Details:**
- Local development: `http://localhost:3000`
- Workshop access: `https://{your-cloudfront-url}/proxy/3000/`
- Dev server binds to `0.0.0.0` for network accessibility
- Proxy rewrites configured in `next.config.mjs`
- Inline styles in layout bypass MIME type issues

## Blog Post Structure

Blog posts are written in **MDX** format (`.mdx` files), which allows embedding React components directly in markdown content. Posts should use frontmatter with the following structure:

```mdx
---
title: "Getting Started with Claude on AWS Bedrock"
date: "2025-10-22"
author: "Author Name"
excerpt: "Learn how to integrate Claude via AWS Bedrock into your applications"
category: "AWS Bedrock"
tags: ["AWS", "Bedrock", "Claude", "Integration"]
published: false
---

Post content here...

You can use standard markdown and embed React components:
<CustomComponent prop="value" />
```

**MDX Features:**
- Standard markdown syntax (headings, lists, links, code blocks)
- Frontmatter metadata (parsed by gray-matter)
- Import and use React components within content
- Custom component styling via `mdx-components.tsx`
- GitHub Flavored Markdown support (tables, task lists, strikethrough)

**Content Focus**: All blog posts should relate to using Claude Code with AWS, covering topics such as:
- AWS Bedrock integration and API usage
- Building MCP servers for AWS services
- CI/CD automation with Claude Code
- Infrastructure as Code with Claude assistance
- Security and best practices for AI-assisted AWS development

## Workshop Context

This project is built progressively through workshop exercises:
- **Exercise 004**: Context management with `/init` and memory mode
- **Exercise 005**: Visual development with screenshots and Plan Mode
- **Exercise 006**: Conversation control and component building
- **Exercise 007**: Custom commands for blog post generation
- **Exercise 008**: MCP servers for visual testing
- **Exercise 009**: GitHub integration and collaboration
- **Exercise 010-012**: Hooks for automation
- **Exercise 013**: Multiple hooks composition
- **Exercise 014**: Claude Code SDK integration

## Common Development Tasks

### Development Server

```bash
# Start dev server (binds to 0.0.0.0 for network access)
npm run dev

# Access locally
http://localhost:3000

# Access via CloudFront (workshop environment)
https://{your-cloudfront-url}/proxy/3000/
```

### Debugging

**Port conflicts:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules package-lock.json
npm install
```

**Styling issues:**
- Check that `globals.css` is imported in `layout.tsx`
- Verify AWS theme colors are defined in both inline styles and CSS variables
- Restart dev server after major CSS changes

### Adding a New Blog Post
<!-- Students will create a custom command for this in Exercise 007 -->

### Testing Visual Changes
<!-- Students will use Playwright MCP server for this in Exercise 008 -->

### Git Workflow
- Make frequent commits with descriptive messages
- Use branches for features
- Let Claude help with commit messages
- Branch: `main` (default)

## Hooks Implementation

### Critical Details for Creating Hooks

**JSON Structure Received by Hooks:** Hooks receive JSON via stdin with this
structure:

```json
{
  "session_id": "...",
  "tool_name": "Read",
  "tool_input": {
    "file_path": "/path/to/file"
  },
  "hook_event_name": "PreToolUse",
  "cwd": "/project/path"
}
```

**Key Implementation Details:**

- **Extract file path**: Use `.tool_input.file_path` when parsing the JSON
- **Read input**: Use `cat` to read JSON from stdin in bash scripts
- **Exit codes**:
  - Exit code `0` = Allow operation to proceed
  - Exit code `2` = Block operation (stderr message shown to Claude)
  - Other codes = Show error to user but continue
- **Configuration file**: Place hooks configuration in `.claude/settings.json`
- **Script location**: Place hook scripts in the `hooks/` directory
- **Matcher patterns**: Use `"Read|Grep"` to match both Read and Grep tools
- **Command format**: Simple format works best: `"bash hooks/script_name.sh"`
- **Make executable**: Remember to `chmod +x` hook scripts

**Example Configuration Structure:**

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Grep",
        "hooks": [
          {
            "type": "command",
            "command": "bash hooks/your_hook_script.sh"
          }
        ]
      }
    ]
  }
}
```

### Environment Variables

Available in hook commands:

- `$CLAUDE_PROJECT_DIR`: Project root directory
- `$CLAUDE_EDITED_FILE`: File that was edited/written (for Edit/Write tools)
- `$CLAUDE_TOOL_NAME`: Name of the tool that triggered the hook


## Important Conventions

### Component Development
- **Server-Side Rendering Only**: All components must be React Server Components
- **No Client JavaScript**: The site must work completely without JavaScript - do NOT add `"use client"` unless absolutely unavoidable
- **Props interfaces**: Define TypeScript interfaces for all component props
- **AWS styling**: Always use AWS theme colors (bg-aws-orange for primary, text-aws-dark for secondary)
- **Mobile-First Responsive**: Design for mobile first, then enhance for larger screens
- Test on mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

### File Organization
- Components go in `app/components/`
- Utility functions go in `app/lib/`
- Blog posts go in `content/posts/` as MDX files
- Use kebab-case for MDX filenames: `my-post-title.mdx`

### TypeScript Usage
- Enable strict mode (already configured)
- Use type inference where possible
- Define explicit return types for exported functions
- Use the `@/*` path alias for imports from project root

### Accessibility
- Use semantic HTML elements (header, nav, main, article, footer)
- Include alt text for images
- Ensure sufficient color contrast (AWS colors already meet WCAG AA)
- Support keyboard navigation

### CloudFront Proxy Considerations
- Never hardcode the `/proxy/3000/` prefix in route files or API routes
- Server-side: Next.js sees requests without the prefix (handled by rewrites)
- Client-side: Links must include the prefix (use `withBasePath()` helper when created)
- Images and static assets: Use relative paths or Next.js Image component

## Notes for Claude

When working on this project:
- **Blog Topic Focus**: This blog is specifically about Claude Code + AWS Bedrock development
- Blog posts should cover topics like Bedrock integration, MCP servers, CI/CD automation, and AWS best practices
- **Design System**: Primary color is AWS Orange (#FF9900), secondary is AWS Dark (#232F3E)
- **Professional Aesthetic**: Follow AWS documentation style - clean, technical, focused on content
- **Server-Side Only**: Do NOT use client JavaScript - all components must be Server Components
- **Mobile-First**: Design for mobile screens first, then scale up to tablet and desktop
- Ensure responsive design works on all breakpoints
- Use semantic HTML elements
- Keep accessibility in mind
- The inline styles in layout.tsx are intentional (CloudFront MIME type workaround)
- Add comments for complex logic
- Follow Next.js App Router conventions
- Site must be fully functional without JavaScript enabled

## Memory Mode Instructions

<!-- Students will add custom instructions here in Exercise 004 -->
<!-- Example: "Always use AWS orange (#FF9900) for primary buttons" -->
