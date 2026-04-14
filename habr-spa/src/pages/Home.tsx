import { useEffect, useState } from 'react';
import type { Post } from '../types/Post';
import { getAllPosts } from '../services/fiddApi';
import HeaderSection from '../components/HeaderSection';
import SidebarSection from '../components/SidebarSection';
import FeedSection from '../components/FeedSection';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPosts(10)
      .then((data) => {
        setPosts(data);
      })
      .catch((e) => {
        setError(e.message || 'Ошибка загрузки');
      })
      .finally(() => setLoading(false));
  }, []);


  return (
    <div className="w-full min-h-screen bg-[#F5F5F5]">
      <HeaderSection />
      <div className="flex justify-center w-full">
        <div className="max-w-[1440px] w-full flex gap-6 px-12 py-8 mt-[70px]">
          <SidebarSection />
          <FeedSection posts={posts} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
  
};


export default Home;