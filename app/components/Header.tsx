import Link from 'next/link';
import { withBasePath } from '../lib/basePath';

/**
 * Navigation header with AWS branding
 * Server-side rendered component with no client JavaScript
 */
export default function Header() {
  return (
    <header className="header-nav">
      <div className="container mx-auto px-4 py-4">
        <div className="header-flex">
          {/* Logo Area */}
          <div className="logo-area">
            <Link href={withBasePath('/')} className="logo-link">
              <span className="logo-aws">AWS</span>
              <span className="logo-text">Claude Code Blog</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="nav-links">
            <Link href={withBasePath('/')} className="nav-link">
              Home
            </Link>
            <Link href={withBasePath('/posts')} className="nav-link">
              Posts
            </Link>
            <Link href={withBasePath('/about')} className="nav-link">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
