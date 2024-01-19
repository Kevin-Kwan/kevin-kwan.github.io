// Unfinished, just a simple look of the page

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleClear = () => {
    setTitle('');
    setContent('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API request to create a new post
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    if (response.ok) {
      // Redirect to the home page after a successful post creation
      router.push('/');
    } else {
      // Handle error
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-2"
      style={{ paddingTop: '5rem' }}
    >
      <form
        className="max-w-7xl w-full mx-auto p-6 space-y-2 rounded-lg shadow-md bg-white"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-black">
          New Blog Post
        </h2>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black"
          placeholder="Content"
          rows="24"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="flex justify-between">
          <div>
            <button
              type="button"
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setContent((prev) => `**${prev}**`)}
            >
              Bold
            </button>
            <button
              type="button"
              className="ml-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setContent((prev) => `*${prev}*`)}
            >
              Italic
            </button>
            <button
              type="button"
              className="ml-2 px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => setContent((prev) => `<u>${prev}</u>`)}
            >
              Underline
            </button>
          </div>
          <div>
            <button
              type="button"
              className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="submit"
              className="ml-2 px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
