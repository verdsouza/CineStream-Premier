import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Lock, ShieldCheck, Play, CreditCard, Mail } from 'lucide-react';
import { Store } from '../services/store';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const config = Store.getConfig();

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
      <SEO 
        title="How It Works" 
        description={`Learn how ${config.siteName} provides exclusive 4K streaming through private viewing slots.`}
      />
      {/* Hero Header */}
      <div className="bg-dark-800 py-16 border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">How {config.siteName} Works</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We are not a traditional streaming service. We are a digital cinema. 
            Book your private viewing slot, enjoy maximum fidelity, and experience entertainment without distractions.
          </p>
        </div>
      </div>

      {/* The Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">The Booking Process</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-dark-700 -z-10" />

           {/* Step 1 */}
           <div className="text-center relative">
             <div className="w-24 h-24 bg-dark-800 border-2 border-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-900/20">
                <Play className="h-10 w-10 text-brand-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">1. Browse & Select</h3>
             <p className="text-gray-400 text-sm">Explore our curated library of premium movies and exclusive TV series.</p>
           </div>

           {/* Step 2 */}
           <div className="text-center relative">
             <div className="w-24 h-24 bg-dark-800 border-2 border-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-900/20">
                <Clock className="h-10 w-10 text-brand-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">2. Choose a Slot</h3>
             <p className="text-gray-400 text-sm">Select a date and time that works for you. Slots ensure dedicated bandwidth.</p>
           </div>

           {/* Step 3 */}
           <div className="text-center relative">
             <div className="w-24 h-24 bg-dark-800 border-2 border-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-900/20">
                <CreditCard className="h-10 w-10 text-brand-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">3. Secure Payment</h3>
             <p className="text-gray-400 text-sm">Complete the Google Form verification and secure payment process.</p>
           </div>

           {/* Step 4 */}
           <div className="text-center relative">
             <div className="w-24 h-24 bg-dark-800 border-2 border-brand-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-900/20">
                <Lock className="h-10 w-10 text-brand-500" />
             </div>
             <h3 className="text-xl font-bold text-white mb-2">4. Private Access</h3>
             <p className="text-gray-400 text-sm">Receive a secure, non-shareable token to access your private stream.</p>
           </div>
        </div>
      </div>

      {/* FAQ / Details */}
      <div className="bg-dark-800 py-16">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="grid gap-8">
                 <div className="flex gap-4">
                     <ShieldCheck className="h-8 w-8 text-brand-500 flex-shrink-0" />
                     <div>
                         <h3 className="text-xl font-bold text-white mb-2">Why do I need to book a time?</h3>
                         <p className="text-gray-400">
                             To guarantee 4K HDR quality without buffering, we limit the number of concurrent viewers on our servers. 
                             This ensures you get the full bitrate the director intended.
                         </p>
                     </div>
                 </div>
                 <div className="flex gap-4">
                     <Lock className="h-8 w-8 text-brand-500 flex-shrink-0" />
                     <div>
                         <h3 className="text-xl font-bold text-white mb-2">Can I share my account?</h3>
                         <p className="text-gray-400">
                             No. Access is tokenized and tied strictly to your email and browser session. 
                             Simultaneous logins are blocked to maintain security and exclusivity.
                         </p>
                     </div>
                 </div>
                 <div className="flex gap-4">
                     <Mail className="h-8 w-8 text-brand-500 flex-shrink-0" />
                     <div>
                         <h3 className="text-xl font-bold text-white mb-2">How do I get approved?</h3>
                         <p className="text-gray-400">
                             New members must register via our Google Form. Our admins verify every member to ensure our community remains exclusive.
                         </p>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      {/* CTA */}
      <div className="text-center py-16 px-4">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience Cinema?</h2>
          <Link to="/browse" className="inline-block bg-brand-600 hover:bg-brand-700 text-white text-lg font-bold px-8 py-4 rounded-full transition-transform hover:scale-105 shadow-xl shadow-brand-900/40">
              Browse Library
          </Link>
      </div>
    </div>
  );
};

export default About;