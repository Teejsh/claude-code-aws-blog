import { getAllPosts } from './lib/posts';
import PostCard from './components/PostCard';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="bg-aws-orange rounded-xl text-center hero-padding">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-hero-heading font-bold text-white mb-6 animate-fade-in-up">
              Build AI-Powered Applications with Claude Code on AWS
            </h1>
            <p className="text-hero-subtitle text-white mb-8 animate-fade-in-up animation-delay-100">
              Learn how to leverage Claude Code with AWS Bedrock to build intelligent applications.
              Discover integration patterns, MCP servers, CI/CD workflows, and industry best practices
              for AI-powered development.
            </p>
            <a
              href="#bedrock"
              className="btn-primary animate-fade-in-up animation-delay-200"
            >
              Explore AWS Bedrock
            </a>
          </div>
        </div>
      </section>

      {/* Post List */}
      <section>
        <h2 className="text-2xl font-bold text-aws-dark mb-6">Recent Posts</h2>
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
