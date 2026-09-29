import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Blog() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4 text-heading">
          Research &amp; <span className="text-primary">Writing</span>
        </h1>
        <p className="text-secondary text-lg font-sans">
          Deep dives into AI architecture, machine learning engineering, and production pipelines.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-secondary text-lg">No posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="group border-b border-secondary/10 pb-10">
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-3">
                <span className="text-primary font-mono text-sm">{post.category}</span>
                <span className="text-secondary/50 hidden md:inline">•</span>
                <time className="text-secondary text-sm font-mono">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'long', day: 'numeric', year: 'numeric',
                  })}
                </time>
                <span className="text-secondary/50 hidden md:inline">•</span>
                <span className="text-secondary text-sm font-mono">{post.readingTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-heading font-serif mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </Link>
              <p className="text-secondary mb-6 leading-relaxed">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary font-bold hover:underline"
              >
                Read Article <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
