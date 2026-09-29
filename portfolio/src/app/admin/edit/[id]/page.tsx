'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

const CATEGORIES = ['AI Architecture', 'Research', 'MLOps', 'LLMs', 'Python', 'Tutorial', 'Opinion'];

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: CATEGORIES[0],
    readingTime: '5 min read',
    published: false,
    coverImage: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setForm({
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        category: data.category,
        readingTime: data.readingTime,
        published: data.published,
        coverImage: data.coverImage || '',
      });
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          published: publish !== undefined ? publish : form.published,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <div className="spinner-large" />
          <p>Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="admin-back-btn">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="admin-page-title">Edit Post</h1>
            <p className="admin-page-subtitle">Update your blog article</p>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={() => handleSave()} className="admin-btn-secondary" disabled={saving}>
            <Save size={16} /> Save Changes
          </button>
          <button onClick={() => handleSave(!form.published)} className="admin-btn-primary" disabled={saving}>
            <Eye size={16} /> {form.published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      <div className="post-editor-layout">
        <div className="post-editor-main">
          <div className="admin-card">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input id="title" type="text" name="title" value={form.title} onChange={handleChange} className="admin-input title-input" />
            </div>
            <div className="form-group">
              <label htmlFor="slug">Slug</label>
              <div className="slug-wrapper">
                <span className="slug-prefix">/blog/</span>
                <input id="slug" type="text" name="slug" value={form.slug} onChange={handleChange} className="admin-input" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <textarea id="summary" name="summary" value={form.summary} onChange={handleChange} className="admin-input admin-textarea" rows={3} />
            </div>
          </div>

          <div className="admin-card editor-card">
            <label className="editor-label">Content</label>
            <RichTextEditor
              content={form.content}
              onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            />
          </div>
        </div>

        <div className="post-editor-sidebar">
          <div className="admin-card">
            <h3 className="sidebar-section-title">Post Settings</h3>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select id="category" name="category" value={form.category} onChange={handleChange} className="admin-input admin-select">
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="readingTime">Reading Time</label>
              <input id="readingTime" type="text" name="readingTime" value={form.readingTime} onChange={handleChange} className="admin-input" />
            </div>
            <div className="form-group">
              <label htmlFor="coverImage">Cover Image URL</label>
              <input id="coverImage" type="text" name="coverImage" value={form.coverImage} onChange={handleChange} className="admin-input" />
            </div>
            <div className="publish-toggle">
              <label htmlFor="published" className="toggle-label">Published</label>
              <input id="published" type="checkbox" name="published" checked={form.published} onChange={handleChange} className="admin-toggle" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
