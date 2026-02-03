import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "AWS Claude Code Blog",
  description: "A blog about building AI-powered applications with Claude Code on AWS",
  keywords: ["AWS", "Claude Code", "AI", "Machine Learning", "Bedrock", "Development"],
  authors: [{ name: "AWS Workshop" }],
  openGraph: {
    title: "AWS Claude Code Blog",
    description: "Learn to build AI-powered applications with Claude Code on AWS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* AWS Theme Variables - Inline to bypass MIME type issues with CloudFront proxy */
            :root {
              --aws-orange: #FF9900;
              --aws-dark: #232F3E;
              --aws-blue: #146EB4;
              --aws-light-gray: #F2F3F3;
              --aws-dark-gray: #545B64;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: ui-sans-serif, system-ui, sans-serif;
              background: #ffffff;
              color: #232F3E;
              line-height: 1.6;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }

            .bg-aws-orange { background-color: var(--aws-orange); }
            .bg-aws-dark { background-color: var(--aws-dark); }
            .bg-aws-blue { background-color: var(--aws-blue); }
            .text-white { color: white; }
            .text-aws-dark { color: var(--aws-dark); }
            .text-aws-dark-gray { color: var(--aws-dark-gray); }
            .text-aws-light-gray { color: var(--aws-light-gray); }

            .container { max-width: 1200px; margin: 0 auto; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
            .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .p-12 { padding: 3rem; }
            .mb-16 { margin-bottom: 4rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-auto { margin-top: auto; }

            .text-center { text-align: center; }
            .text-5xl { font-size: 3rem; line-height: 1.2; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }

            .rounded-lg { border-radius: 0.5rem; }
            .rounded-xl { border-radius: 1rem; }
            .flex-1 { flex: 1 1 0%; }
            .inline-block { display: inline-block; }
            .max-w-4xl { max-width: 56rem; }

            button, .btn {
              cursor: pointer;
              border: none;
              transition: all 0.3s ease;
              display: inline-block;
              text-decoration: none;
              font-weight: 600;
            }

            button:hover, .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .bg-aws-dark:hover { background-color: var(--aws-blue); }

            /* Responsive hero text */
            .text-hero-heading {
              font-size: 2rem;        /* Mobile: 32px */
              line-height: 1.2;
            }

            .text-hero-subtitle {
              font-size: 1rem;        /* Mobile: 16px */
              line-height: 1.5;
            }

            @media (min-width: 768px) {
              .text-hero-heading { font-size: 3rem; }      /* Tablet: 48px */
              .text-hero-subtitle { font-size: 1.25rem; }  /* Tablet: 20px */
            }

            @media (min-width: 1024px) {
              .text-hero-heading { font-size: 3.75rem; }   /* Desktop: 60px */
              .text-hero-subtitle { font-size: 1.5rem; }   /* Desktop: 24px */
            }

            /* Responsive hero padding */
            .hero-padding {
              padding: 3rem 1.5rem;   /* Mobile: py-12 px-6 */
            }

            @media (min-width: 768px) {
              .hero-padding {
                padding: 4rem 2rem;   /* Tablet+: py-16 px-8 */
              }
            }

            /* Animation keyframes */
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
            }

            .animation-delay-100 {
              animation-delay: 0.1s;
            }

            .animation-delay-200 {
              animation-delay: 0.2s;
            }

            /* Enhanced button styles */
            .btn-primary {
              display: inline-block;
              background-color: var(--aws-dark);
              color: white;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              font-weight: 600;
              font-size: 1rem;
              text-decoration: none;
              transition: all 250ms ease-out;
              min-width: 44px;        /* Accessibility: touch target */
              min-height: 44px;
              cursor: pointer;
              border: none;
            }

            .btn-primary:hover {
              background-color: var(--aws-blue);
              transform: translateY(-2px);
              box-shadow: 0 10px 25px -5px rgba(255, 153, 0, 0.3),
                          0 4px 6px -2px rgba(255, 153, 0, 0.05);
            }

            .btn-primary:active {
              background-color: #0F5A8F;   /* Darker blue for press state */
              transform: translateY(-1px);
            }

            .btn-primary:focus-visible {
              outline: 2px solid var(--aws-orange);
              outline-offset: 2px;
            }

            @media (min-width: 768px) {
              .btn-primary {
                padding: 1rem 2rem;      /* Larger on tablet+ */
                font-size: 1.125rem;
              }
            }

            /* Post Grid - Responsive */
            .post-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }

            @media (min-width: 768px) {
              .post-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }

            @media (min-width: 1024px) {
              .post-grid {
                grid-template-columns: repeat(3, 1fr);
              }
            }

            /* Post Card */
            .post-card {
              background: white;
              border: 1px solid var(--aws-light-gray);
              border-radius: 0.75rem;
              padding: 1.5rem;
              transition: all 250ms ease-out;
              display: block;
              text-decoration: none;
              height: 100%;
            }

            .post-card:hover {
              transform: translateY(-4px);
              box-shadow: 0 12px 24px -6px rgba(0, 0, 0, 0.1),
                          0 4px 8px -2px rgba(0, 0, 0, 0.05);
              border-color: var(--aws-orange);
            }

            /* Category Badge */
            .category-badge {
              display: inline-block;
              background-color: var(--aws-orange);
              color: white;
              font-size: 0.75rem;
              font-weight: 700;
              letter-spacing: 0.05em;
              padding: 0.375rem 0.875rem;
              border-radius: 9999px;
              text-transform: uppercase;
            }

            /* Tag Badge */
            .tag-badge {
              display: inline-block;
              background-color: var(--aws-light-gray);
              color: var(--aws-dark-gray);
              font-size: 0.875rem;
              font-weight: 500;
              padding: 0.25rem 0.75rem;
              border-radius: 0.375rem;
            }

            /* Line Clamp Utility */
            .line-clamp-3 {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            /* Prose Styles for MDX Content */
            .prose {
              color: var(--aws-dark);
              max-width: 65ch;
            }

            .prose-lg {
              font-size: 1.125rem;
              line-height: 1.75;
            }

            .max-w-none {
              max-width: none;
            }

            /* Additional utility classes */
            .flex {
              display: flex;
            }

            .flex-wrap {
              flex-wrap: wrap;
            }

            .gap-2 {
              gap: 0.5rem;
            }

            .gap-4 {
              gap: 1rem;
            }

            .items-center {
              align-items: center;
            }

            .mb-3 {
              margin-bottom: 0.75rem;
            }

            .mb-12 {
              margin-bottom: 3rem;
            }

            .mt-6 {
              margin-top: 1.5rem;
            }

            .italic {
              font-style: italic;
            }

            .block {
              display: block;
            }

            .transition-colors {
              transition-property: color;
              transition-duration: 200ms;
            }

            /* Header Navigation */
            .header-nav {
              background-color: var(--aws-dark);
              border-bottom: 3px solid var(--aws-orange);
              position: sticky;
              top: 0;
              z-index: 50;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .header-flex {
              display: flex;
              flex-direction: column;
              gap: 1rem;
              align-items: center;
            }

            @media (min-width: 768px) {
              .header-flex {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
              }
            }

            /* Logo Area */
            .logo-area {
              display: flex;
              align-items: center;
            }

            .logo-link {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              text-decoration: none;
              transition: opacity 0.2s ease;
            }

            .logo-link:hover {
              opacity: 0.9;
            }

            .logo-aws {
              background-color: var(--aws-orange);
              color: white;
              font-weight: 700;
              font-size: 1.25rem;
              padding: 0.5rem 0.75rem;
              border-radius: 0.375rem;
              letter-spacing: 0.05em;
            }

            .logo-text {
              color: white;
              font-weight: 600;
              font-size: 1.125rem;
            }

            @media (min-width: 768px) {
              .logo-text {
                font-size: 1.25rem;
              }
            }

            /* Navigation Links */
            .nav-links {
              display: flex;
              gap: 0.5rem;
              flex-wrap: wrap;
              justify-content: center;
            }

            @media (min-width: 768px) {
              .nav-links {
                gap: 1rem;
                justify-content: flex-end;
              }
            }

            .nav-link {
              color: white;
              text-decoration: none;
              font-weight: 500;
              font-size: 1rem;
              padding: 0.625rem 1rem;
              border-radius: 0.375rem;
              transition: all 0.2s ease;
              min-width: 44px;
              min-height: 44px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
            }

            .nav-link:hover {
              background-color: var(--aws-blue);
              color: white;
            }

            .nav-link:focus-visible {
              outline: 2px solid var(--aws-orange);
              outline-offset: 2px;
            }
          `
        }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-aws-dark text-aws-light-gray py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Built with Claude Code on AWS | Workshop Exercise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
