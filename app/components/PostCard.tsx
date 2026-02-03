import Link from 'next/link';
import { withBasePath } from '@/app/lib/basePath';
import { formatDate, type Post } from '@/app/lib/posts';
import ReadingTimeBadge from './ReadingTimeBadge';
import CommentCount from './CommentCount';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { slug, frontmatter, readingTime } = post;
  const { title, date, author, excerpt, category, tags } = frontmatter;

  return (
    <Link href={withBasePath(`/posts/${slug}`)} className="block">
      <article className="post-card">
        {/* Category and Reading Time Badges */}
        <div className="mb-4 flex items-center gap-2 flex-wrap">
          <span className="category-badge">
            {category.toUpperCase()}
          </span>
          <ReadingTimeBadge minutes={readingTime} />
          <CommentCount postId={slug} />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-aws-dark mb-3 hover:text-aws-blue transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-aws-dark-gray mb-4 line-clamp-3">
          {excerpt}
        </p>

        {/* Date and Author */}
        <p className="text-sm text-aws-dark-gray mb-4">
          {formatDate(date)} <span className="italic">by {author}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
