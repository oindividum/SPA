import React from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/Post';

interface FeedSectionProps {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

export const FeedSection = ({ posts, loading, error }: FeedSectionProps) => (
  <section className="flex flex-row gap-8 w-full">
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-black mb-2 text-left">Лента</h2>
      <div className="flex gap-2 mb-4">
        <button className="bg-white rounded-[10px] px-4 py-2 text-base font-medium border border-[#eaeaea]">Сделать пост</button>
        <button className="bg-white rounded-[10px] px-4 py-2 text-base font-medium border border-[#eaeaea]">Мой блог</button>
        <button className="bg-white rounded-[10px] px-4 py-2 text-base font-medium border border-[#eaeaea]">Настроить интересы</button>
        <button className="bg-white rounded-[10px] px-4 py-2 text-base font-medium border border-[#eaeaea]">Увеличить хранилище</button>
      </div>
      {loading && <div className="text-center text-gray-500">Загрузка...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <div className="text-center text-gray-400">Нет постов для отображения</div>
      )}
      <div className="flex flex-col gap-6 w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
    <aside className="w-[260px] shrink-0 bg-white rounded-[10px] p-4 h-fit flex flex-col gap-4">
      <div className="font-semibold text-lg mb-2">Рекомендуем блоги</div>
      {/* Заглушка для списка блогов */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-base text-black"><span>@Fidd_dev</span><span>2000</span></div>
        <div className="flex items-center justify-between text-base text-black"><span>@Tech_lead</span><span>1456</span></div>
        <div className="flex items-center justify-between text-base text-black"><span>@DableArt</span><span>117</span></div>
        <div className="flex items-center justify-between text-base text-black"><span>@toy_trainee</span><span>67</span></div>
      </div>
    </aside>
  </section>
);

export default FeedSection;
