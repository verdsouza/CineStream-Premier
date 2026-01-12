import React, { useEffect, useRef, useState } from 'react';

// Declare global YT type for TypeScript
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | null;
  }
}

interface VideoPlayerProps {
  videoId: string;
  title: string;
  autoplay?: boolean;
}

export default function VideoPlayer({ videoId, title, autoplay = false }: VideoPlayerProps) {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [playerReady, setPlayerReady] = useState(false);

  useEffect(() => {
    // Function to initialize player
    const initializePlayer = () => {
      if (!videoId || !playerRef.current) return;

      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy();
      }

      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 0,
          'showinfo': 0,
          'controls': 1,
          'loop': 1,
          'mute': 1,
          'enablejsapi': 1,
          'origin': typeof window !== 'undefined' ? window.location.origin : '',
          'fs': 1,
          'autoplay': 1,
          'playlist': videoId
        },
        events: {
          'onReady': () => {
            setPlayerReady(true);
            console.log('YouTube Player Ready for video:', videoId);
          },
          'onStateChange': (event: any) => {
            // Handle player state changes if needed
          },
          'onError': (event: any) => {
            console.error('YouTube Player Error:', event.data);
          }
        }
      });
    };

    // Check if YouTube API is ready
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      // Wait for API to load
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerInstanceRef.current) {
        try {
            playerInstanceRef.current.destroy();
        } catch(e) {
            console.warn("Player destroy failed", e);
        }
      }
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId, autoplay]);

  return (
    <div className="relative w-full pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl border border-dark-700" itemScope itemType="https://schema.org/VideoObject">
      <meta itemProp="name" content={title} />
      <meta itemProp="embedUrl" content={`https://www.youtube.com/embed/${videoId}`} />
      
      <div 
        ref={playerRef}
        className="absolute top-0 left-0 w-full h-full"
        aria-label={`YouTube video player for ${title}`}
      ></div>
      
      {!playerReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-800 z-10">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400 text-sm">Loading Trailer...</p>
        </div>
      )}
    </div>
  );
}