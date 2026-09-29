'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { PenLine, Trash2, Eye, EyeOff, PlusCircle, FileText, TrendingUp, Edit3 } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
  summary: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  const togglePublish = async (post: Post) => {
    await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    fetchPosts();
  };

  const deletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    fetchPosts();
    setDeleting(null);
  };

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Dashboard</h1>
          <p className="admin-page-subtitle">Manage your blog posts and content</p>
        </div>
        <Link href="/admin/new" className="admin-btn-primary">
          <PlusCircle size={18} />
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-icon stat-icon-blue">
            <FileText size={22} />
          </div>
          <div>
            <p className="stat-label">Total Posts</p>
            <p className="stat-value">{posts.length}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon stat-icon-green">
            <Eye size={22} />
          </div>
          <div>
            <p className="stat-label">Published</p>
            <p className="stat-value">{published}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon stat-icon-amber">
            <Edit3 size={22} />
          </div>
          <div>
            <p className="stat-label">Drafts</p>
            <p className="stat-value">{drafts}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-icon stat-icon-purple">
            <TrendingUp size={22} />
          </div>
          <div>
            <p className="stat-label">Categories</p>
            <p className="stat-value">{new Set(posts.map((p) => p.category)).size}</p>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">All Posts</h2>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="spinner-large" />
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="admin-empty">
            <FileText size={48} className="empty-icon" />
            <p>No posts yet. Create your first one!</p>
            <Link href="/admin/new" className="admin-btn-primary">
              <PlusCircle size={16} /> Create Post
            </Link>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <div className="post-title-cell">
                        <span className="post-title">{post.title}</span>
                        <span className="post-slug">/{post.slug}</span>
                      </div>
                    </td>
                    <td>
                      <span className="category-badge">{post.category}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${post.published ? 'status-published' : 'status-draft'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="date-cell">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <Link href={`/admin/edit/${post.id}`} className="action-btn action-edit" title="Edit">
                          <PenLine size={15} />
                        </Link>
                        <button
                          onClick={() => togglePublish(post)}
                          className={`action-btn ${post.published ? 'action-unpublish' : 'action-publish'}`}
                          title={post.published ? 'Unpublish' : 'Publish'}
                        >
                          {post.published ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="action-btn action-delete"
                          disabled={deleting === post.id}
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
