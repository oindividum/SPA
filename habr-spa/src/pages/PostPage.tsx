import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllPosts } from '../services/fiddApi';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import ReactPlayer from 'react-player';
import type { Post } from '../types/Post';

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

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

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['mp3', 'wav', 'ogg'].includes(ext || '')) return '🎵';
    if (['mp4', 'webm', 'mov'].includes(ext || '')) return '🎥';
    if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext || '')) return '🖼️';
    return '📄';
  };

  const isDirectory = !post.content && post.files && post.files.length > 0;
  const [fiddId, messageNumber] = post.id.split('_');

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 mt-8 px-4 items-start pb-12">
      
     
      {post.files && post.files.length > 0 && (
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-8">
            <div className="flex items-center justify-between mb-4 pb-2">
              <h3 className="text-xl font-medium text-gray-900">Директория</h3>
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            
            <div className="flex flex-col gap-2 mb-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {post.files.map(file => {
                const fileUrl = `/fidds/v1/${fiddId}/${messageNumber}/${encodeURIComponent(file)}`;
                return (
                  <a 
                    key={file} 
                    href={fileUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex text-left items-center justify-between group hover:bg-gray-50 p-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="text-gray-800 flex-shrink-0">
                       
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-800 group-hover:text-black truncate">{file}</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                );
              })}
            </div>
            
            <div className="border-t border-gray-200 mt-2 pt-4">
              <button 
                className="w-full text-center text-gray-400 font-medium hover:text-gray-600 transition-colors py-1"
              >
                Открыть локально
              </button>
            </div>
          </div>
        </aside>
      )}

     
      <article className="flex-1 w-full bg-white rounded-xl shadow-md p-8 min-w-0">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{post.title}</h1>
        <div className="flex items-center gap-2 text-xs mb-6 text-gray-500">
          <span className="font-bold text-gray-700">@{post.author}</span>
          <span>●</span>
          <span>{post.createdAt}</span>
        </div>
        
        {isDirectory ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
            </svg>
            <p className="text-lg">Выберите файл из директории слева</p>
          </div>
        ) : (
          <div className="prose max-w-none break-words overflow-hidden">
            <ReactMarkdown 
            
              remarkPlugins={[remarkGfm]}
              components={{
              pre: ({node, ...props}) => <pre className="whitespace-pre-wrap break-words overflow-x-auto bg-gray-100 p-4 rounded-lg my-4" {...props} />,
              img: ({node, src, alt, ...props}) => {
                if (!src) return null;
                
                let fullSrc = src;
                if (!src.startsWith('http')) {
                  fullSrc = `/fidds/v1/${fiddId}/${messageNumber}/${encodeURIComponent(src)}`;
                }

                const ext = src.split('.').pop()?.toLowerCase();
                if (ext === 'mp4' || ext === 'webm' || ext === 'ogg' || ext === 'mov') {
                  return (
                    <div className="my-4 rounded-lg overflow-hidden bg-black">
                      <video controls src={fullSrc} className="w-full h-auto" />
                    </div>
                  );
                }
                if (ext === 'mp3' || ext === 'wav') {
                  return (
                    <div className="my-4">
                      <audio controls src={fullSrc} className="w-full" />
                    </div>
                  );
                }

                return <img src={fullSrc} alt={alt} className="rounded-lg my-4 max-w-full" {...props} />;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      )}
    </article>
  </div>
  );
};

export default PostPage;
