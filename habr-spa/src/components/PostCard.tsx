// каждый пост будет отображаться в виде карточки, которая будет показывать заголовок, краткое описание и дату публикации. При клике на карточку пользователь будет перенаправляться на страницу с полным текстом поста.
// список постов feddMessasges каждый отображается как карточка postCard 

// post - проп
import type { Post } from '../types/Post';

interface PostCardProps {
    post: Post; //передавемый пропс должен быть объетом типа Post
}

import { useNavigate } from 'react-router-dom';
const PostCard = ({ post }: PostCardProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-white mb-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left cursor-pointer overflow-hidden rounded-sm"
            onClick={() => navigate(`/post/${post.id}`)}
        >
            {/* Обложка поста */}
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
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-4 text-gray-400 text-xs">
                    <span>{post.views} views</span>
                </div>
            </div>
        </div>
    );
};





export default PostCard;