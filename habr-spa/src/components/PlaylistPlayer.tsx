import { useState, useEffect, useRef } from 'react';

interface PlaylistPlayerProps {
  m3uUrl: string;
  basePath: string;
}

export const PlaylistPlayer = ({ m3uUrl, basePath }: PlaylistPlayerProps) => {
  const [tracks, setTracks] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaRef = useRef<HTMLMediaElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(m3uUrl)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => {
        const lines = text.split('\n')
          .map(l => l.trim())
          .filter(l => l.length > 0 && !l.startsWith('#'));
        
        const resolvedTracks = lines.map(line => {
          if (line.startsWith('http://') || line.startsWith('https://')) {
            return line;
          }
          const cleanBase = basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
          const cleanLine = line.startsWith('/') ? line.slice(1) : line;
          return `${cleanBase}/${encodeURIComponent(cleanLine)}`;
        });
        
        setTracks(resolvedTracks);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to load playlist", err);
        setError("Ошибка загрузки плейлиста");
      });
  }, [m3uUrl, basePath]);

  useEffect(() => {
    if (mediaRef.current && currentIndex > 0) {
      mediaRef.current.play().catch(e => console.log('Autoplay prevented', e));
    }
  }, [currentIndex, tracks]);

  if (error) {
    return <div className="text-red-500 text-sm p-4 bg-red-50 rounded-lg">{error}</div>;
  }

  if (tracks.length === 0) return null;

  const handleEnded = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getTrackName = (url: string) => {
    try {
      const parts = url.split('/');
      const last = parts[parts.length - 1];
      // Try to remove query params if any
      const cleanLast = last.split('?')[0];
      return decodeURIComponent(cleanLast);
    } catch {
      return url;
    }
  };

  const currentTrack = tracks[currentIndex];
  // Basic heuristic to detect video formats from URL
  const isVideo = currentTrack?.match(/\.(mp4|webm|mov|ogg)($|\?)/i);

  return (
    <div className="bg-white border border-gray-100 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] p-5 rounded-2xl my-4 w-full font-sans">
      <div className="flex items-center gap-2 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
          <polygon points="14 2 18 6 7 16.5 3 17 3.5 13 14 2" />
          <line x1="3" y1="22" x2="21" y2="22" />
        </svg>
        <h4 className="text-[18px] font-medium text-black tracking-tight">Медиа Плейлист</h4>
        <span className="text-[13px] text-[#8C8C8C] ml-auto font-medium">
          {currentIndex + 1} / {tracks.length}
        </span>
      </div>
      
      {isVideo ? (
        <video 
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={currentTrack} 
          controls 
          onEnded={handleEnded}
          className="w-full bg-black rounded-lg mb-4 h-auto aspect-video object-contain"
        />
      ) : (
        <audio 
          ref={mediaRef as React.RefObject<HTMLAudioElement>}
          src={currentTrack} 
          controls 
          onEnded={handleEnded}
          className="w-full mb-4 outline-none"
        />
      )}
      
      <div className="max-h-48 overflow-y-auto pr-2 custom-scrollbar">
        {tracks.map((track, i) => {
          const isActive = i === currentIndex;
          return (
            <div 
              key={i} 
              className={`p-2.5 cursor-pointer rounded-xl mb-1 flex items-center gap-3 transition-colors ${
                isActive ? 'bg-blue-50/50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setCurrentIndex(i)}
            >
              <div className="flex-shrink-0">
                {isActive ? (
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-gray-400 transition-colors"></div>
                )}
              </div>
              <span className={`text-[14px] leading-snug truncate ${isActive ? 'text-black font-semibold' : 'text-gray-700 font-medium'}`}>
                {getTrackName(track)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
