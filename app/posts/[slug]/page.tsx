import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getAllPosts, getPostBySlug, formatDate } from '@/app/lib/posts';
import ReadingTimeBadge from '@/app/components/ReadingTimeBadge';
import Comments from '@/app/components/Comments';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.frontmatter.title} | AWS Claude Code Blog`,
    description: post.frontmatter.excerpt,
    keywords: post.frontmatter.tags.join(', '),
    authors: [{ name: post.frontmatter.author }],
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  return (
    <div className="container mx-auto px-4 py-16">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="category-badge">
              {frontmatter.category.toUpperCase()}
            </span>
            <ReadingTimeBadge minutes={readingTime} />
          </div>

          <h1 className="text-5xl font-bold text-aws-dark mb-6">
            {frontmatter.title}
          </h1>

          <p className="text-xl text-aws-dark-gray mb-6">
            {frontmatter.excerpt}
          </p>

          <div className="flex items-center gap-4 text-aws-dark-gray">
            <span>{formatDate(frontmatter.date)}</span>
            <span>•</span>
            <span className="italic">by {frontmatter.author}</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose prose-lg max-w-none">
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Comments Section */}
        <Comments postId={slug} />
      </article>
    </div>
  );
}
