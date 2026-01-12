import React, { useState } from 'react';
import { X, Calendar, Clock, CreditCard, Lock, CheckCircle, ExternalLink, ShieldCheck, Copy } from 'lucide-react';
import { ContentItem, Booking, AccessType } from '../types';
import { TIME_SLOTS } from '../constants';
import { Store } from '../services/store';
import { format, addDays } from 'date-fns';

interface BookingModalProps {
  content: ContentItem;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ content, isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [transactionId, setTransactionId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const user = Store.getCurrentUser();
  const config = Store.getConfig();

  // Generate next 5 days
  const availableDates = Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));

  const handleConfirmSubmission = async () => {
    if (!user) {
        setError("You must be logged in to book.");
        return;
    }
    if (!selectedTime) {
        setError("Please select a time slot.");
        return;
    }
    if (content.accessType === AccessType.PREMIUM && !transactionId.trim()) {
        setError("Please enter the Transaction ID from your payment.");
        return;
    }

    setIsProcessing(true);
    setError(null);

    // Create the booking in "pending" state
    try {
        const dateStr = format(selectedDate, 'yyyy-MM-dd');
        const startTimeIso = `${dateStr}T${selectedTime}:00.000Z`;
        const endTimeIso = ""; 

        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9),
            userId: user.id,
            userEmail: user.email,
            contentId: content.id,
            contentTitle: content.title,
            slotStartTime: startTimeIso,
            slotEndTime: endTimeIso, 
            accessCode: `SECURE-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
            status: 'pending',
            pricePaid: content.accessType === AccessType.FREE ? 0 : (content.price || 0),
            transactionId: transactionId
        };

        Store.createBooking(newBooking);
        setIsProcessing(false);
        setStep(3); // Success step
    } catch (e) {
        setError("Failed to record request. Please try again.");
        setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-dark-800 border border-dark-700 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-dark-700 bg-dark-900/50">
           <h3 className="text-lg font-bold text-white flex items-center gap-2">
               {step === 3 ? <CheckCircle className="text-green-500"/> : <Lock className="text-brand-500 h-5 w-5"/>}
               {step === 3 ? 'Booking Pending' : `Secure Booking: ${content.title}`}
           </h3>
           <button onClick={onClose} className="text-gray-400 hover:text-white">
               <X className="h-5 w-5" />
           </button>
        </div>

        <div className="p-6">
            {/* STEP 1: DATE & TIME */}
            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">1. Select Date</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                            {availableDates.map(date => {
                                const isSelected = format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                                return (
                                    <button
                                        key={date.toString()}
                                        onClick={() => setSelectedDate(date)}
                                        className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl border transition-all ${
                                            isSelected 
                                            ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-900/30' 
                                            : 'bg-dark-700 border-dark-600 text-gray-300 hover:bg-dark-600'
                                        }`}
                                    >
                                        <span className="text-xs uppercase font-bold">{format(date, 'EEE')}</span>
                                        <span className="text-lg font-bold">{format(date, 'd')}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-400 mb-2">2. Select Start Time</label>
                         <div className="grid grid-cols-4 gap-2">
                             {TIME_SLOTS.map(time => (
                                 <button
                                     key={time}
                                     onClick={() => setSelectedTime(time)}
                                     className={`p-2 rounded-lg text-sm font-medium border transition-all ${
                                         selectedTime === time
                                         ? 'bg-white text-dark-900 border-white'
                                         : 'bg-dark-700 text-gray-300 border-dark-600 hover:border-gray-500'
                                     }`}
                                 >
                                     {time}
                                 </button>
                             ))}
                         </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button 
                            disabled={!selectedTime}
                            onClick={() => setStep(2)}
                            className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition-colors"
                        >
                            Continue to Payment
                        </button>
                    </div>
                </div>
            )}

            {/* STEP 2: PAYMENT */}
            {step === 2 && (
                 <div className="space-y-6 animate-fade-in">
                     <div className="bg-dark-900/50 p-4 rounded-xl border border-dark-700">
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-gray-400">Content</span>
                             <span className="text-white font-medium">{content.title}</span>
                         </div>
                         <div className="flex justify-between items-center mb-2">
                             <span className="text-gray-400">Slot</span>
                             <span className="text-white font-medium">{format(selectedDate, 'MMM d')} @ {selectedTime}</span>
                         </div>
                         <div className="flex justify-between items-center pt-2 border-t border-dark-700 mt-2">
                             <span className="text-gray-300 font-bold">Total Due</span>
                             <span className="text-2xl font-bold text-brand-500">${content.price}</span>
                         </div>
                     </div>

                     <div className="space-y-4">
                         <p className="text-sm text-gray-400">
                             To secure this private 4K slot, please complete the payment via PayPal.
                             <br/>
                             <span className="text-xs text-gray-500">Includes secure link generation & dedicated bandwidth.</span>
                         </p>

                         <a 
                             href={config.paypalUrl} 
                             target="_blank" 
                             rel="noreferrer"
                             className="block w-full bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold py-3 rounded-xl text-center transition-transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                         >
                             <CreditCard className="h-5 w-5" /> Pay with PayPal
                         </a>

                         <div className="relative">
                             <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                 <div className="w-full border-t border-dark-600"></div>
                             </div>
                             <div className="relative flex justify-center">
                                 <span className="bg-dark-800 px-2 text-xs text-gray-500">THEN</span>
                             </div>
                         </div>

                         <div>
                             <label className="block text-sm font-medium text-gray-300 mb-2">Enter Transaction ID / Reference</label>
                             <input 
                                type="text" 
                                value={transactionId}
                                onChange={(e) => setTransactionId(e.target.value)}
                                placeholder="e.g. 9KB12345..."
                                className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-3 rounded-lg focus:border-brand-500 focus:outline-none"
                             />
                             <p className="text-xs text-gray-500 mt-1">Found in your PayPal receipt email.</p>
                         </div>
                     </div>

                     {error && (
                        <div className="text-red-500 text-sm bg-red-900/10 p-3 rounded-lg border border-red-900/20">
                            {error}
                        </div>
                    )}

                     <div className="flex gap-3 justify-end pt-2">
                         <button 
                             onClick={() => setStep(1)}
                             className="text-gray-400 hover:text-white px-4 py-2 text-sm"
                         >
                             Back
                         </button>
                         <button 
                             onClick={handleConfirmSubmission}
                             disabled={isProcessing || !transactionId}
                             className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-brand-900/20"
                         >
                             {isProcessing ? 'Verifying...' : 'Confirm Payment'}
                         </button>
                     </div>
                 </div>
            )}

            {/* STEP 3: SUCCESS */}
            {step === 3 && (
                <div className="text-center py-6 animate-fade-in">
                    <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Verification Pending</h2>
                    <p className="text-gray-400 mb-6 text-sm">
                        Thank you! We have received your booking request for <strong>{content.title}</strong>.
                        <br/><br/>
                        An admin will verify your Transaction ID <strong>({transactionId})</strong> shortly. 
                        Once approved, your secure, non-shareable link will appear in your Dashboard.
                    </p>
                    <div className="bg-dark-900 p-4 rounded-lg border border-dark-700 mb-6 text-left">
                        <p className="text-xs text-gray-500 mb-1 font-mono uppercase">Security Protocol</p>
                        <p className="text-sm text-gray-300">
                            Your secure link is tied to your Google Account/Email ID: <span className="text-white font-bold">{user?.email}</span>. 
                            It cannot be shared with other users.
                        </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                        <button onClick={onSuccess} className="bg-dark-700 hover:bg-dark-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                            Close
                        </button>
                        <button onClick={() => window.location.hash = '#/dashboard'} className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-brand-900/20">
                            Go to Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;