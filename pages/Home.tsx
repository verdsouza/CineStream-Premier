import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import SmartImage from '../components/SmartImage';
import { Store } from '../services/store';
import { AccessType, SiteConfig, ContentItem } from '../types';
import { Play, Star, Clock, Lock } from 'lucide-react';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const [content, setContent] = useState<ContentItem[]>(Store.getContent());
  const [config, setConfig] = useState<SiteConfig>(Store.getConfig());
  
  // Robust Listener for real-time updates
  useEffect(() => {
    const handleStorageChange = () => {
        setConfig(Store.getConfig());
        setContent(Store.getContent());
    };
    
    window.addEventListener(Store.STORE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
        window.removeEventListener(Store.STORE_EVENT, handleStorageChange);
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const featured = content.filter(c => c.accessType === AccessType.PREMIUM).slice(0, 3);
  const free = content.filter(c => c.accessType === AccessType.FREE).slice(0, 3);

  // JSON-LD Schema for WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.siteName,
    "url": window.location.href,
    "description": config.seoDescription,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/#/browse?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="pb-20">
      <SEO 
        title="Home"
        description={config.seoDescription}
        schema={websiteSchema}
      />

      {config.showHero && <Hero config={config} />}

      {/* Featured Section */}
      {config.showTrending && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Trending Premiums</h2>
                <Link to="/browse" className="text-brand-500 hover:text-brand-400 text-sm font-medium">View All</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featured.map(item => (
                    <div key={item.id} className="group relative bg-dark-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-brand-900/10 transition-all duration-300">
                        <div className="aspect-[2/3] overflow-hidden bg-dark-900">
                            <SmartImage 
                                src={item.thumbnailUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-4 left-4 right-4">
                                 <div className="flex items-center justify-between mb-2">
                                    <span className="bg-brand-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Premium</span>
                                    <span className="flex items-center text-yellow-500 text-xs font-bold gap-1">
                                        <Star className="h-3 w-3 fill-current" /> 4.9
                                    </span>
                                 </div>
                                 <h3 className="text-lg font-bold text-white leading-tight mb-1">{item.title}</h3>
                                 <p className="text-gray-400 text-xs line-clamp-2 mb-3">{item.description}</p>
                                 <Link 
                                    to={`/content/${item.id}`} 
                                    className={`block w-full text-center backdrop-blur-md border py-2 rounded-lg text-sm font-semibold transition-colors ${
                                        item.accessType === AccessType.FREE 
                                        ? 'bg-green-600/80 hover:bg-green-600 border-green-500/30 text-white' 
                                        : 'bg-white/10 hover:bg-white/20 border-white/10 text-white'
                                    }`}
                                 >
                                     {item.accessType === AccessType.FREE ? 'Watch Now' : 'Book Slot'}
                                 </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </section>
      )}

      {/* Benefits Section */}
      {config.showBenefits && (
          <section className="bg-dark-800 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-white mb-4">Why Book a Slot?</h2>
                      <p className="text-gray-400 max-w-2xl mx-auto">Experience cinema as it was meant to be seen. No buffering, no shared bandwidth, purely dedicated streams.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-6 bg-dark-900/50 rounded-2xl border border-dark-700">
                          <div className="w-12 h-12 bg-brand-900/20 text-brand-500 rounded-xl flex items-center justify-center mb-4">
                              <Clock className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Scheduled Viewing</h3>
                          <p className="text-gray-400 text-sm">Create an appointment with your entertainment. Dedicate time to focus on the story without distractions.</p>
                      </div>
                      <div className="p-6 bg-dark-900/50 rounded-2xl border border-dark-700">
                          <div className="w-12 h-12 bg-brand-900/20 text-brand-500 rounded-xl flex items-center justify-center mb-4">
                              <Lock className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Private Secure Link</h3>
                          <p className="text-gray-400 text-sm">Your access is tokenized and tied to your identity. No link sharing, ensuring exclusive access performance.</p>
                      </div>
                      <div className="p-6 bg-dark-900/50 rounded-2xl border border-dark-700">
                          <div className="w-12 h-12 bg-brand-900/20 text-brand-500 rounded-xl flex items-center justify-center mb-4">
                              <Play className="h-6 w-6" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Maximum Bitrate</h3>
                          <p className="text-gray-400 text-sm">By limiting concurrent slots, we guarantee 4K HDR quality with zero compression artifacts.</p>
                      </div>
                  </div>
              </div>
          </section>
      )}

      {/* Free Section (Always shown to drive engagement) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Watch for Free</h2>
            <Link to="/browse?filter=free" className="text-brand-500 hover:text-brand-400 text-sm font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {free.map(item => (
                <Link key={item.id} to={`/content/${item.id}`} className="flex gap-4 group p-4 rounded-xl hover:bg-dark-800 transition-colors">
                     <div className="w-24 h-36 flex-shrink-0 rounded-lg overflow-hidden shadow-md bg-dark-900">
                         <SmartImage src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col justify-center">
                         <h3 className="text-lg font-bold text-white group-hover:text-brand-500 transition-colors mb-2">{item.title}</h3>
                         <div className="flex items-center gap-2 mb-3">
                             <span className="text-green-500 text-xs font-bold uppercase border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded">Free Slot</span>
                             <span className="text-gray-500 text-xs">{item.rating}</span>
                         </div>
                         <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                     </div>
                </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;