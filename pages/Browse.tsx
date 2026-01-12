import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Store } from '../services/store';
import { ContentType, AccessType } from '../types';
import { Filter, Search, Sparkles, Play } from 'lucide-react';
import { getAIRecommendation } from '../services/gemini';
import SmartImage from '../components/SmartImage';
import SEO from '../components/SEO';

const Browse: React.FC = () => {
  const allContent = Store.getContent();
  const [filter, setFilter] = useState<'ALL' | 'MOVIE' | 'SERIES' | 'FREE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const filteredContent = allContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' 
        ? true 
        : filter === 'FREE' 
            ? item.accessType === AccessType.FREE 
            : item.type === filter;
    return matchesSearch && matchesFilter;
  });

  const handleAiAsk = async () => {
    if (!searchTerm) return;
    setIsAiThinking(true);
    const titles = allContent.map(c => c.title);
    const suggestion = await getAIRecommendation(searchTerm, titles);
    setAiSuggestion(suggestion);
    setIsAiThinking(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
       <SEO 
            title="Browse Library" 
            description="Explore our complete collection of premium movies and TV series. Book your private viewing slot today."
       />
       <div className="bg-dark-800 border-b border-dark-700 py-8">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold text-white mb-6">Explore Library</h1>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-2 bg-dark-900 p-1 rounded-lg border border-dark-600">
                       {(['ALL', 'MOVIE', 'SERIES', 'FREE'] as const).map(f => (
                           <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                    filter === f 
                                    ? 'bg-dark-700 text-white shadow-sm' 
                                    : 'text-gray-400 hover:text-white'
                                }`}
                           >
                               {f === 'ALL' ? 'All' : f === 'FREE' ? 'Free Access' : f === 'MOVIE' ? 'Movies' : 'TV Series'}
                           </button>
                       ))}
                   </div>

                   <div className="relative w-full md:w-96">
                       <input 
                           type="text" 
                           placeholder="Search or ask AI..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="w-full bg-dark-900 border border-dark-600 text-white pl-10 pr-12 py-2.5 rounded-lg focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                       />
                       <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                       <button 
                           onClick={handleAiAsk}
                           disabled={!searchTerm || isAiThinking}
                           className="absolute right-2 top-2 p-1 text-brand-500 hover:bg-brand-500/10 rounded"
                           title="Ask AI for a recommendation"
                        >
                           <Sparkles className={`h-5 w-5 ${isAiThinking ? 'animate-pulse' : ''}`} />
                       </button>
                   </div>
               </div>

               {aiSuggestion && (
                   <div className="mt-4 p-4 bg-brand-900/10 border border-brand-900/30 rounded-lg flex gap-3 animate-fade-in-down">
                       <Sparkles className="h-5 w-5 text-brand-500 flex-shrink-0 mt-0.5" />
                       <p className="text-gray-300 text-sm">
                           <span className="font-bold text-brand-400">AI Concierge:</span> {aiSuggestion}
                       </p>
                       <button onClick={() => setAiSuggestion(null)} className="ml-auto text-gray-500 hover:text-white text-xs">Dismiss</button>
                   </div>
               )}
           </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {filteredContent.map(item => (
                   <Link key={item.id} to={`/content/${item.id}`} className="group relative block">
                       <div className="aspect-[2/3] rounded-lg overflow-hidden bg-dark-800 mb-3 shadow-lg group-hover:shadow-brand-900/20 transition-all">
                           <SmartImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                           
                           {/* Badges */}
                           {item.accessType === AccessType.FREE ? (
                               <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">FREE</div>
                           ) : (
                               <div className="absolute top-2 left-2 bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">PREMIUM</div>
                           )}

                           {/* Hover Overlay Action Button */}
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
                               {item.accessType === AccessType.FREE ? (
                                   <span className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg transform scale-100 hover:scale-105 transition-all">
                                       <Play className="h-4 w-4 fill-current" /> Watch Now
                                   </span>
                               ) : (
                                   <span className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg transform scale-100 hover:scale-105 transition-all">
                                       Book Slot
                                   </span>
                               )}
                           </div>
                       </div>
                       <h3 className="text-white font-medium truncate group-hover:text-brand-500 transition-colors">{item.title}</h3>
                       <p className="text-gray-500 text-xs">{item.genre.join(', ')}</p>
                   </Link>
               ))}
           </div>
           
           {filteredContent.length === 0 && (
               <div className="text-center py-20 text-gray-500">
                   <p>No titles found matching your criteria.</p>
               </div>
           )}
       </div>
    </div>
  );
};

export default Browse;