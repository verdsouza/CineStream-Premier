import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Shield } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeroProps {
  config: SiteConfig;
}

const Hero: React.FC<HeroProps> = ({ config }) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden flex items-center">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=2069&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
            <span className="bg-brand-600/20 text-brand-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-brand-600/30">
              Exclusive Premiere
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl">
            {config.heroTitle}
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-light leading-relaxed">
            {config.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/browse" className="group flex items-center justify-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 shadow-xl shadow-brand-900/40">
              <Play className="h-5 w-5 fill-current" />
              <span>Browse & Book Access</span>
            </Link>
            <Link to="/about" className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all border border-white/10 hover:border-white/30">
              <span>How It Works</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-8 text-sm text-gray-400">
             <div className="flex items-center gap-2">
                 <Calendar className="h-4 w-4 text-brand-500" />
                 <span>Scheduled Slots</span>
             </div>
             <div className="flex items-center gap-2">
                 <Shield className="h-4 w-4 text-brand-500" />
                 <span>Secure Private Link</span>
             </div>
             <div className="flex items-center gap-2">
                 <Play className="h-4 w-4 text-brand-500" />
                 <span>4K Streaming</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;