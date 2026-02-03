'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: number;
}

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const storageKey = `blog-comments-${postId}`;

  // Load comments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setComments(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing comments:', error);
      }
    }
  }, [storageKey]);

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    }
  }, [comments, storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newComment: Comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: Date.now(),
    };

    setComments([newComment, ...comments]);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <section className="comments-section">
      <div className="comments-header">
        <h2 className="comments-title">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="comment-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              maxLength={50}
              className="form-input"
              placeholder="Your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message <span className="required">*</span>
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            minLength={10}
            maxLength={1000}
            rows={4}
            className="form-textarea"
            placeholder="Share your thoughts..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !name.trim() || !email.trim() || !message.trim()}
          className="submit-button"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </button>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="comments-list">
          {comments.map((comment) => (
            <article key={comment.id} className="comment-card">
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="comment-meta">
                  <h3 className="comment-author">{comment.name}</h3>
                  <time className="comment-time">
                    {formatTimestamp(comment.timestamp)}
                  </time>
                </div>
              </div>
              <p className="comment-message">{comment.message}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="no-comments">
          <p>No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}

      <style jsx>{`
        .comments-section {
          max-width: 56rem;
          margin: 4rem auto 0;
          padding-top: 3rem;
          border-top: 2px solid #F2F3F3;
        }

        .comments-header {
          margin-bottom: 2rem;
        }

        .comments-title {
          font-size: 2rem;
          font-weight: 700;
          color: #232F3E;
          margin: 0;
        }

        /* Comment Form Styles */
        .comment-form {
          background: white;
          border: 2px solid #F2F3F3;
          border-radius: 0.75rem;
          padding: 2rem;
          margin-bottom: 3rem;
          transition: border-color 0.2s ease;
        }

        .comment-form:focus-within {
          border-color: #FF9900;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #232F3E;
        }

        .required {
          color: #FF9900;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #F2F3F3;
          border-radius: 0.5rem;
          font-size: 1rem;
          color: #232F3E;
          background: white;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #FF9900;
          box-shadow: 0 0 0 3px rgba(255, 153, 0, 0.1);
        }

        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #545B64;
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .submit-button {
          background: #FF9900;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 44px;
          min-height: 44px;
        }

        .submit-button:hover:not(:disabled) {
          background: #146EB4;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 153, 0, 0.3);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          background: #545B64;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .submit-button:focus-visible {
          outline: 2px solid #FF9900;
          outline-offset: 2px;
        }

        /* Comments List Styles */
        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .comment-card {
          background: white;
          border: 1px solid #F2F3F3;
          border-radius: 0.75rem;
          padding: 1.5rem;
          transition: all 0.2s ease;
        }

        .comment-card:hover {
          border-color: #FF9900;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .comment-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .comment-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #FF9900 0%, #146EB4 100%);
          color: white;
          font-weight: 700;
          font-size: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .comment-meta {
          flex: 1;
          min-width: 0;
        }

        .comment-author {
          font-size: 1rem;
          font-weight: 600;
          color: #232F3E;
          margin: 0 0 0.25rem 0;
        }

        .comment-time {
          font-size: 0.875rem;
          color: #545B64;
        }

        .comment-message {
          color: #232F3E;
          line-height: 1.6;
          margin: 0;
          word-wrap: break-word;
        }

        .no-comments {
          background: #F2F3F3;
          border-radius: 0.75rem;
          padding: 3rem 2rem;
          text-align: center;
        }

        .no-comments p {
          color: #545B64;
          font-size: 1.125rem;
          margin: 0;
        }

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .comments-section {
            padding-top: 2rem;
            margin-top: 3rem;
          }

          .comment-form {
            padding: 1.5rem;
          }

          .comments-title {
            font-size: 1.5rem;
          }

          .submit-button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}

export function getCommentCount(postId: string): number {
  if (typeof window === 'undefined') return 0;

  const storageKey = `blog-comments-${postId}`;
  const stored = localStorage.getItem(storageKey);

  if (!stored) return 0;

  try {
    const comments = JSON.parse(stored);
    return Array.isArray(comments) ? comments.length : 0;
  } catch {
    return 0;
  }
}
