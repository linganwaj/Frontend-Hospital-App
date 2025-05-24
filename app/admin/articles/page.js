'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TiptapEditor from '../../components/TiptapEditor';

export default function AdminArticlesPage() {
  const [articleList, setArticleList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [existingImageId, setExistingImageId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      fetchArticles();
    }
  }, [router]);

  const fetchArticles = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles?populate=coverImage`);
    const data = await res.json();
    setArticleList(data.data || []);
  };

  const uploadImage = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('files', image);

    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      body: formData,
    });

    if (!res.ok) {
      console.error('❌ Image upload failed:', await res.text());
      return null;
    }

    const data = await res.json();
    return data[0]?.id || null;
  };

  const deleteImage = async (imageId) => {
    if (!imageId) return;
    await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload/files/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });
  };

  const generateSlug = (text) => `${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}-${Date.now()}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageId = await uploadImage();
      const slug = generateSlug(title);

      if (editingId && imageId && existingImageId) {
        await deleteImage(existingImageId);
      }

      const payload = {
        id: editingId,
        title,
        content,
        slug,
        ...(imageId && { coverImage: imageId }),
      };

      const url = editingId
      ? '/api/update-article'
      : '/api/add-article'; // ✅ Go through your own route

         const method = 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (res.ok) {
        resetForm();
        fetchArticles();
        alert(editingId ? 'Article updated' : 'Article added');
      } else {
        console.error('❌ Failed to submit article:', responseData);
        alert(`Failed: ${responseData?.error?.message || 'Unknown error occurred'}`);
      }
    } catch (error) {
      console.error('❌ Caught error during submission:', error);
      alert('Unexpected error. Please check your connection or console.');
    }

    setLoading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setImage(null);
    setExistingImageUrl(null);
    setExistingImageId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;

    await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    });

    fetchArticles();
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setTitle(article.title || '');
    setContent(article.content || '');
    const imageUrl = article.coverImage?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${article.coverImage.url}`
      : null;
    setExistingImageUrl(imageUrl);
    setExistingImageId(article.coverImage?.id || null);
    setImage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Article Management</h1>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Article
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-white border p-6 rounded shadow-sm">
          <h2 className="text-xl font-semibold">{editingId ? 'Edit Article' : 'Add Article'}</h2>

          <input
            type="text"
            placeholder="Article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <TiptapEditor value={content} onChange={setContent} />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block"
          />

          {existingImageUrl && !image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">Current Cover Image:</p>
              <img
                src={existingImageUrl}
                alt="Current cover"
                className="w-48 h-auto mt-1 rounded border"
              />
              <button
                type="button"
                onClick={async () => {
                  await deleteImage(existingImageId);
                  setExistingImageUrl(null);
                  setExistingImageId(null);
                }}
                className="mt-2 text-sm text-red-500 hover:underline"
              >
                Remove current image
              </button>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? 'Saving...' : editingId ? 'Update Article' : 'Add Article'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="bg-white shadow rounded-lg overflow-hidden border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">Published Articles</h2>
            <p className="text-sm text-gray-500">Manage hospital articles and posts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr className="text-gray-600 uppercase text-xs">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articleList.map((article, idx) => (
                  <tr key={article.id} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 font-medium text-gray-900">{article.title}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="bg-white border p-2 rounded hover:bg-gray-100"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
