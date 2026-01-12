import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from '../services/store';
import { ContentItem } from '../types';
import { ArrowLeft, Server, AlertCircle } from 'lucide-react';

const FreeWatch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [activeServer, setActiveServer] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
        const c = Store.getContentById(id);
        if (c) {
            setContent(c);
            // Auto-select first available server
            if (c.streamUrls) {
                if (c.streamUrls.server1) setActiveServer(c.streamUrls.server1);
                else if (c.streamUrls.server2) setActiveServer(c.streamUrls.server2);
                else if (c.streamUrls.server3) setActiveServer(c.streamUrls.server3);
                else if (c.streamUrls.server4) setActiveServer(c.streamUrls.server4);
            }
        }
    }
  }, [id]);

  if (!content) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black flex flex-col">
        {/* Header */}
        <div className="bg-dark-900 border-b border-dark-800 p-4 flex items-center gap-4">
            <button 
                onClick={() => navigate(`/content/${id}`)} 
                className="text-gray-400 hover:text-white flex items-center gap-2"
                aria-label="Back to movie details"
            >
                <ArrowLeft className="h-6 w-6" /> <span className="hidden sm:inline">Back to Details</span>
            </button>
            <div>
                <h1 className="text-white font-bold">{content.title}</h1>
                <span className="text-xs text-green-500 font-bold uppercase border border-green-500/30 px-2 rounded">Free Stream</span>
            </div>
        </div>

        {/* Player Container */}
        <div className="flex-grow bg-black relative flex items-center justify-center">
            {activeServer ? (
                 <iframe 
                    src={activeServer}
                    className="w-full h-full absolute inset-0 border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                 />
            ) : (
                <div className="text-center p-8">
                    <AlertCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No stream sources available for this title.</p>
                </div>
            )}
        </div>

        {/* Server Selector */}
        {content.streamUrls && (
            <div className="bg-dark-900 border-t border-dark-800 p-4">
                <div className="max-w-7xl mx-auto flex items-center gap-4 overflow-x-auto pb-2">
                    <span className="flex items-center gap-2 text-gray-400 text-sm font-medium flex-shrink-0">
                        <Server className="h-4 w-4" /> Switch Server:
                    </span>
                    {content.streamUrls.server1 && (
                        <button 
                            onClick={() => setActiveServer(content.streamUrls!.server1!)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeServer === content.streamUrls.server1 ? 'bg-brand-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
                        >
                            Server 1
                        </button>
                    )}
                    {content.streamUrls.server2 && (
                        <button 
                            onClick={() => setActiveServer(content.streamUrls!.server2!)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeServer === content.streamUrls.server2 ? 'bg-brand-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
                        >
                            Server 2
                        </button>
                    )}
                    {content.streamUrls.server3 && (
                        <button 
                            onClick={() => setActiveServer(content.streamUrls!.server3!)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeServer === content.streamUrls.server3 ? 'bg-brand-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
                        >
                            Server 3
                        </button>
                    )}
                    {content.streamUrls.server4 && (
                        <button 
                            onClick={() => setActiveServer(content.streamUrls!.server4!)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeServer === content.streamUrls.server4 ? 'bg-brand-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
                        >
                            Server 4
                        </button>
                    )}
                </div>
            </div>
        )}
    </div>
  );
};

export default FreeWatch;