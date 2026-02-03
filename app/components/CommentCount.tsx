'use client';

import { useState, useEffect } from 'react';

interface CommentCountProps {
  postId: string;
}

export default function CommentCount({ postId }: CommentCountProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storageKey = `blog-comments-${postId}`;
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      try {
        const comments = JSON.parse(stored);
        setCount(Array.isArray(comments) ? comments.length : 0);
      } catch {
        setCount(0);
      }
    }

    // Listen for storage changes (when comments are added in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const comments = JSON.parse(e.newValue);
          setCount(Array.isArray(comments) ? comments.length : 0);
        } catch {
          setCount(0);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [postId]);

  return (
    <span className="comment-count-badge">
      💬 {count}
      <style jsx>{`
        .comment-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          padding: 0.375rem 0.75rem;
          background: #FF9900;
          border-radius: 9999px;
          letter-spacing: 0.025em;
          transition: all 0.2s ease;
        }

        .comment-count-badge:hover {
          background: #146EB4;
          transform: scale(1.05);
        }
      `}</style>
    </span>
  );
}
