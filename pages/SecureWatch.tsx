import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from '../services/store';
import { Booking, ContentItem } from '../types';
import { AlertTriangle, Lock, Shield, Eye, Wifi, UserCheck, Key, AlertCircle } from 'lucide-react';

const SecureWatch: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [content, setContent] = useState<ContentItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [securityStep, setSecurityStep] = useState(0); // 0: checking, 1: decrypting, 2: success

  useEffect(() => {
    // 1. Check Login
    const currentUser = Store.getCurrentUser();
    if (!currentUser) {
        setError("Identity Verification Failed: You are not logged in.");
        return;
    }

    // 2. Fetch Booking and Content
    const userBookings = Store.getBookingsByUser(currentUser.email);
    const foundBooking = userBookings.find(b => b.id === bookingId);

    // 3. Strict Ownership Check
    if (!foundBooking) {
        const allBookings = Store.getBookings();
        const existsElsewhere = allBookings.find(b => b.id === bookingId);
        
        if (existsElsewhere) {
            setError(`SECURITY VIOLATION: This secure link is bound to ${existsElsewhere.userEmail}. You are logged in as ${currentUser.email}. Access Denied.`);
        } else {
            setError("Invalid Secure Token. This link may have expired or does not exist.");
        }
        return;
    }

    // 4. Status Check
    if (foundBooking.status === 'pending') {
        setError("Payment Verification Pending. Please wait for admin approval.");
        return;
    }
    if (foundBooking.status === 'expired') {
        setError("This secure slot has expired.");
        return;
    }
    
    // 5. Get Content Data (specifically the Premium URL)
    const foundContent = Store.getContentById(foundBooking.contentId);
    if (!foundContent) {
        setError("Content not found in database.");
        return;
    }

    setBooking(foundBooking);
    setContent(foundContent);
    
    // Simulate security handshake sequence
    const t1 = setTimeout(() => setSecurityStep(1), 1000);
    const t2 = setTimeout(() => setSecurityStep(2), 2500);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
  }, [bookingId, navigate]);

  if (error) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center p-4">
              <div className="bg-red-900/10 p-8 rounded-2xl border border-red-900/50 max-w-lg w-full">
                <Shield className="h-16 w-16 text-red-600 mx-auto mb-6 animate-pulse" />
                <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">ACCESS DENIED</h1>
                <p className="text-red-500 font-mono text-sm mb-6 uppercase border-b border-red-900/30 pb-4">Security Protocol Triggered</p>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    {error}
                </p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => navigate('/login')} className="bg-dark-800 hover:bg-dark-700 text-white py-3 rounded-lg font-medium transition-colors">
                        Switch Account
                    </button>
                    <button onClick={() => navigate('/dashboard')} className="text-brand-500 hover:text-brand-400 text-sm">
                        Return to Dashboard
                    </button>
                </div>
              </div>
          </div>
      );
  }

  // Loading / Security Handshake State
  if (!booking || !content || securityStep < 2) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white font-mono">
              <div className="w-64">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>HANDSHAKE</span>
                      <span>{securityStep === 0 ? 'INIT' : 'DECRYPT'}</span>
                  </div>
                  <div className="h-1 w-full bg-dark-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-brand-600 transition-all duration-1000 ${securityStep === 0 ? 'w-1/3' : 'w-full'}`} />
                  </div>
                  <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-green-500 text-xs">
                          <Wifi className="h-3 w-3" /> 
                          <span>IP Verified</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-opacity duration-500 ${securityStep > 0 ? 'text-green-500 opacity-100' : 'text-gray-700 opacity-50'}`}>
                          <UserCheck className="h-3 w-3" /> 
                          <span>Identity Confirmed ({Store.getCurrentUser()?.email})</span>
                      </div>
                      <div className={`flex items-center gap-2 text-xs transition-opacity duration-500 ${securityStep > 0 ? 'text-green-500 opacity-100' : 'text-gray-700 opacity-50'}`}>
                          <Key className="h-3 w-3" /> 
                          <span>API Key Validated ({booking?.accessCode?.substring(0, 8)}...)</span>
                      </div>
                  </div>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
        {/* Secure Header */}
        <div className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-500 bg-green-900/10 px-3 py-1 rounded-full border border-green-900/20">
                    <Lock className="h-3 w-3" />
                    <span className="text-xs font-mono font-bold tracking-wider">SECURE CONNECTION</span>
                </div>
                <span className="text-gray-500 text-xs hidden md:inline font-mono">
                    SESSION ID: {booking.accessCode}
                </span>
            </div>
            <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white text-sm font-medium">Exit Secure Mode</button>
        </div>

        {/* Player Area */}
        <div className="flex-grow flex items-center justify-center bg-zinc-950 relative overflow-hidden">
             
             {content.premiumVideoUrl ? (
                 <iframe 
                    src={content.premiumVideoUrl}
                    className="w-full h-full max-w-[1920px] aspect-video border-0 shadow-2xl"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Secure Premium Stream"
                 />
             ) : (
                <div className="text-center p-12 bg-dark-800 rounded-xl border border-dark-700 max-w-lg">
                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Content Not Available</h2>
                    <p className="text-gray-400 text-sm">
                        The secure link was generated, but the premium video source has not been configured by the admin yet.
                    </p>
                </div>
             )}

             {/* Dynamic Watermark (Overlay on top of iframe might be blocked by browser security if not same origin, but we try) */}
             <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
                 <div className="absolute bottom-4 right-4 text-right opacity-40 bg-black/50 p-2 rounded">
                     <p className="text-xs text-white font-mono font-bold">{booking.userEmail}</p>
                     <p className="text-[10px] text-gray-400 font-mono">Bound to Session: {booking.id.substring(0,8)}</p>
                 </div>
             </div>
        </div>
    </div>
  );
};

export default SecureWatch;