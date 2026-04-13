import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../services/fiddApi';
import ReactMarkdown from 'react-markdown';
import type { Post } from '../types/Post';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    // Получаем только нужный пост (оптимизация: можно сделать отдельный сервис getPostById)
    getAllPosts(20)
      .then(posts => {
        const found = posts.find(p => p.id === id);
        if (found) setPost(found);
        else setError('Пост не найден');
      })
      .catch(e => setError(e.message || 'Ошибка загрузки'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center text-gray-500 mt-8">Загрузка...</div>;
  if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
  if (!post) return null;

  return (
    <article className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
      <div className="flex items-center gap-2 text-xs mb-6 text-gray-500">
        <span className="font-bold text-gray-700">@{post.author}</span>
        <span>●</span>
        <span>{post.createdAt}</span>
      </div>
      <div className="prose max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
};

export default PostPage;