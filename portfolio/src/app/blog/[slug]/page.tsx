import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, published: true },
  });

  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <Link
        href="/blog"
        className="inline-flex items-center text-secondary hover:text-primary mb-12 transition-colors font-mono text-sm"
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to Blog
      </Link>

      <article>
        <header className="mb-12">
          {post.coverImage && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-mono text-sm">{post.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-heading leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-secondary font-mono text-sm">
            <time>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric',
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
