import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/Post';
import { buildFlatTree } from '../utils/fileTree';

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();
    const isDirectory = !post.content && post.files && post.files.length > 0;
    
  const getFileIconSvg = (filename: string, isFolder: boolean) => {
    if (isFolder) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="12" rx="3" fill="transparent" />
          <path d="M3 12h18" />
          <path d="M6 15h3" />
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
        <path d="M9 13h6" />
        <path d="M9 17h3" />
      </svg>
    );
  };

  const flatTree = buildFlatTree(post.files || []);

  const directoryPreviewList = (
    <div 
      className="mt-4 bg-white rounded-[16px] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] border border-gray-100 p-5 font-sans"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[20px] font-medium text-black tracking-tight">Директория</h3>
        <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </div>
      
      <div className="flex flex-col gap-3">
        <div className="flex text-left items-start justify-between" style={{ paddingLeft: '0px' }}>
          <div className="flex items-start gap-3 overflow-hidden">
            <div className="text-black flex-shrink-0 mt-0.5">
              {getFileIconSvg('root', true)}
            </div>
            <span className="text-[14px] font-medium text-black leading-snug line-clamp-2 break-words">{post.title}</span>
          </div>
          <svg className="w-5 h-5 text-black flex-shrink-0 ml-2 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {flatTree.slice(0, 3).map((node, index) => {
          const isFolder = node.isDirectory;
          return (
            <div key={`${node.path}-${index}`} className="flex text-left items-start justify-between" style={{ paddingLeft: `${(node.depth + 1) * 16}px` }}>
              <div className="flex items-start gap-3 overflow-hidden">
                <div className="text-black flex-shrink-0 mt-0.5">
                  {getFileIconSvg(node.name, isFolder)}
                </div>
                <span className="text-[14px] font-medium text-black leading-snug line-clamp-2 break-words">{node.name}</span>
              </div>
              {isFolder && (
                <svg className="w-5 h-5 text-black flex-shrink-0 ml-2 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-200 mt-4 pt-4">
        <button className="w-full text-center text-[#8C8C8C] text-[15px] font-medium transition-colors">
          {flatTree.length > 3 ? `Открыть (ещё ${flatTree.length - 3} файлов/папок)` : 'Открыть локально'}
        </button>
      </div>
    </div>
  );

    return (
        <div
            className="bg-white mb-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left cursor-pointer overflow-hidden rounded-sm"
            onClick={() => navigate(`/post/${post.id}`)}
        >
            {}
            {post.imageUrl && (
                <div className="w-full h-48 overflow-hidden">
                    <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                </div>
            )}
            
            <div className="p-6">
                <div className="flex items-center gap-2 text-xs mb-3 text-gray-500">
                    <span className="font-bold text-gray-700">@{post.author}</span>
                    <span>●</span>
                    <span>{post.createdAt}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                </h2>
                <div className="flex gap-2 mb-3">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-xs text-blue-500 hover:underline cursor-pointer">#{tag}</span>
                    ))}
                </div>
                
                {isDirectory ? directoryPreviewList : (
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                        {post.summary}
                    </p>
                )}

                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-4 text-gray-400 text-xs">
                    <span>{post.views} views</span>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
