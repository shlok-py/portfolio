'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import Link from 'next/link';

const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), { ssr: false });

const CATEGORIES = ['AI Architecture', 'Research', 'MLOps', 'LLMs', 'Python', 'Tutorial', 'Opinion'];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugify(title),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async (publish: boolean) => {
    if (!form.title || !form.slug || !form.summary || !form.content) {
      setError('Please fill in all required fields (Title, Slug, Summary, Content).');
      return;
    }
    setSaving(true);
    setError('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, published: publish }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to save post.');
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

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="admin-back-btn">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="admin-page-title">New Post</h1>
            <p className="admin-page-subtitle">Create and publish a new blog article</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => handleSave(false)}
            className="admin-btn-secondary"
            disabled={saving}
          >
            <Save size={16} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            className="admin-btn-primary"
            disabled={saving}
          >
            <Eye size={16} />
            Publish
          </button>
        </div>
      </div>

      {error && <div className="admin-error-banner">{error}</div>}

      <div className="post-editor-layout">
        {/* Main Editor */}
        <div className="post-editor-main">
          <div className="admin-card">
            <div className="form-group">
              <label htmlFor="title">Title <span className="required">*</span></label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Enter article title..."
                className="admin-input title-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">Slug <span className="required">*</span></label>
              <div className="slug-wrapper">
                <span className="slug-prefix">/blog/</span>
                <input
                  id="slug"
                  type="text"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="auto-generated-from-title"
                  className="admin-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="summary">Summary <span className="required">*</span></label>
              <textarea
                id="summary"
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="A brief description shown on the blog listing page..."
                className="admin-input admin-textarea"
                rows={3}
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="admin-card editor-card">
            <label className="editor-label">Content <span className="required">*</span></label>
            <RichTextEditor
              content={form.content}
              onChange={(content) => setForm((prev) => ({ ...prev, content }))}
            />
          </div>
        </div>

        {/* Sidebar Meta */}
        <div className="post-editor-sidebar">
          <div className="admin-card">
            <h3 className="sidebar-section-title">Post Settings</h3>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="admin-input admin-select"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="readingTime">Reading Time</label>
              <input
                id="readingTime"
                type="text"
                name="readingTime"
                value={form.readingTime}
                onChange={handleChange}
                placeholder="5 min read"
                className="admin-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="coverImage">Cover Image URL</label>
              <input
                id="coverImage"
                type="text"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="admin-input"
              />
            </div>

            <div className="publish-toggle">
              <label htmlFor="published" className="toggle-label">
                Publish immediately
              </label>
              <input
                id="published"
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="admin-toggle"
              />
            </div>
          </div>

          <div className="admin-card">
            <h3 className="sidebar-section-title">Writing Tips</h3>
            <ul className="writing-tips">
              <li>Use <strong>H2</strong> for main sections</li>
              <li>Use <strong>H3</strong> for subsections</li>
              <li>Add code blocks for examples</li>
              <li>Keep paragraphs concise</li>
              <li>Add a compelling summary</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
