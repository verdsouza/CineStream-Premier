import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Store } from '../services/store';
import { ContentItem, AccessType, ContentType } from '../types';
import { Play, Clock, Star, Info, ShieldCheck, Tag, ArrowLeft, Film } from 'lucide-react';
import BookingModal from '../components/BookingModal';
import VideoPlayer from '../components/VideoPlayer';
import SmartImage from '../components/SmartImage';
import SEO from '../components/SEO';

const ContentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
        const c = Store.getContentById(id);
        if (c) setContent(c);
    }
  }, [id]);

  if (!content) return <div className="pt-24 text-center text-white">Loading...</div>;

  // Rich Snippet / Structured Data
  const schema = {
    "@context": "https://schema.org",
    "@type": content.type === ContentType.MOVIE ? "Movie" : "TVSeries",
    "name": content.title,
    "description": content.description,
    "image": content.thumbnailUrl.startsWith('http') ? content.thumbnailUrl : `${window.location.origin}${content.thumbnailUrl}`,
    "genre": content.genre,
    "contentRating": content.rating,
    "offers": {
        "@type": "Offer",
        "price": content.price || 0,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="min-h-screen pb-20">
       <SEO 
            title={content.title} 
            description={content.description}
            keywords={content.genre.join(', ')}
            image={content.thumbnailUrl}
            type={content.type === ContentType.MOVIE ? 'video.movie' : 'video.tv_show'}
            schema={schema}
       />

       {/* Navigation Header Overlay */}
       <div className="absolute top-24 left-4 z-20 md:left-8">
           <button 
                onClick={() => navigate('/browse')} 
                className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium transition-colors border border-white/10"
           >
               <ArrowLeft className="h-4 w-4" /> Back to Library
           </button>
       </div>

       {/* Backdrop */}
       <div className="relative w-full h-[60vh] bg-dark-900">
           <SmartImage src={content.backdropUrl} alt={content.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
           <div className="flex flex-col md:flex-row gap-8">
               {/* Poster */}
               <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0 bg-dark-800 rounded-xl overflow-hidden shadow-2xl border-4 border-dark-800">
                   <SmartImage src={content.thumbnailUrl} alt={content.title} className="w-full h-full object-cover" />
               </div>

               {/* Info */}
               <div className="flex-grow text-center md:text-left pt-4 md:pt-12">
                   <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                       {content.genre.map(g => (
                           <span key={g} className="bg-dark-700 text-gray-300 text-xs font-semibold px-2 py-1 rounded-md border border-dark-600">
                               {g}
                           </span>
                       ))}
                       <span className="text-gray-400 text-sm flex items-center gap-1">
                           <Clock className="h-3 w-3" /> {content.duration}
                       </span>
                       <span className="text-yellow-500 text-sm flex items-center gap-1">
                           <Star className="h-3 w-3 fill-current" /> {content.rating}
                       </span>
                   </div>

                   <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{content.title}</h1>
                   <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">{content.description}</p>

                   <div className="flex flex-col md:flex-row items-center gap-4">
                       {content.accessType === AccessType.FREE ? (
                           <button 
                               onClick={() => navigate(`/play/${content.id}`)}
                               className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 shadow-xl shadow-green-900/30 w-full md:w-auto justify-center"
                           >
                               <Play className="h-6 w-6 fill-current" />
                               Watch Now (Free)
                           </button>
                       ) : (
                           <button 
                               onClick={() => setIsModalOpen(true)}
                               className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 shadow-xl shadow-brand-900/30 w-full md:w-auto justify-center"
                           >
                               <Play className="h-6 w-6 fill-current" />
                               Book Premium Slot (${content.price})
                           </button>
                       )}
                       
                       {content.accessType === AccessType.PREMIUM && (
                           <div className="flex items-center gap-2 text-gray-400 text-sm bg-dark-800/50 px-4 py-2 rounded-lg border border-dark-700">
                               <ShieldCheck className="h-4 w-4 text-brand-500" />
                               <span>Guaranteed 4K • Private Stream</span>
                           </div>
                       )}
                   </div>
               </div>
           </div>

           {/* Trailer Section */}
           {content.trailerId && (
               <div className="mt-16 mb-12">
                   <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                       <Film className="h-6 w-6 text-brand-500" />
                       Official Trailer
                   </h3>
                   <div className="max-w-4xl">
                       <VideoPlayer videoId={content.trailerId} title={content.title} />
                   </div>
               </div>
           )}

           {/* More Details */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-dark-800 pt-12">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-4">Synopsis</h3>
                    <p className="text-gray-400 leading-relaxed">
                        Experience {content.title} in the highest fidelity available. 
                        {content.accessType === AccessType.PREMIUM ? 
                           "Our private slot system ensures dedicated bandwidth allocation for your viewing session." :
                           "Stream instantly on our free servers."
                        }
                    </p>
                </div>
                <div>
                     <h3 className="text-xl font-bold text-white mb-4">Details</h3>
                     <ul className="space-y-3 text-sm text-gray-400">
                         <li className="flex justify-between border-b border-dark-800 pb-2">
                             <span>Director</span>
                             <span className="text-white">John Doe (Mock)</span>
                         </li>
                         <li className="flex justify-between border-b border-dark-800 pb-2">
                             <span>Release Year</span>
                             <span className="text-white">2024</span>
                         </li>
                         <li className="flex justify-between border-b border-dark-800 pb-2">
                             <span>Audio</span>
                             <span className="text-white">Dolby Atmos</span>
                         </li>
                         <li className="flex justify-between">
                             <span>Resolution</span>
                             <span className="text-white">4K HDR</span>
                         </li>
                     </ul>
                </div>
           </div>
       </div>

       <BookingModal 
           content={content} 
           isOpen={isModalOpen} 
           onClose={() => setIsModalOpen(false)} 
           onSuccess={() => setIsModalOpen(false)}
       />
    </div>
  );
};

export default ContentDetails;