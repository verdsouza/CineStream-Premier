import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../services/store';
import { Booking, User } from '../types';
import { Calendar, Clock, Play, AlertCircle, Hourglass } from 'lucide-react';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = Store.getCurrentUser();
    if (!currentUser) {
        navigate('/login');
        return;
    }
    setUser(currentUser);
    setBookings(Store.getBookingsByUser(currentUser.email));
  }, [navigate]);

  const activeBookings = bookings.filter(b => b.status === 'active');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'expired');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-900 pb-20">
       <div className="bg-dark-800 border-b border-dark-700 py-12">
           <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
               <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}</h1>
               <p className="text-gray-400 mt-2">Manage your viewing slots and account details.</p>
           </div>
       </div>

       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
           
           {/* Pending Section */}
           {pendingBookings.length > 0 && (
               <section>
                   <h2 className="text-xl font-bold text-yellow-500 flex items-center gap-2 mb-4">
                       <Hourglass className="h-5 w-5" /> Pending Approval
                   </h2>
                   <div className="grid gap-4">
                       {pendingBookings.map(booking => {
                           const date = new Date(booking.slotStartTime);
                           return (
                               <div key={booking.id} className="bg-yellow-900/10 border border-yellow-900/30 p-6 rounded-xl flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{booking.contentTitle}</h3>
                                        <div className="flex items-center gap-4 text-sm text-yellow-500/80 mt-1">
                                            <span>{format(date, 'MMM d, yyyy')} • {format(date, 'HH:mm')}</span>
                                            <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-xs">Awaiting Admin</span>
                                        </div>
                                    </div>
                                    <div className="text-gray-500 text-sm italic hidden md:block">
                                        Check email for updates
                                    </div>
                               </div>
                           );
                       })}
                   </div>
               </section>
           )}

           {/* Active Section */}
           <section>
               <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-bold text-white">Active Slots</h2>
                   {bookings.length === 0 && (
                       <button onClick={() => navigate('/browse')} className="text-brand-500 text-sm font-semibold hover:underline">
                           Browse Content
                       </button>
                   )}
               </div>

               {activeBookings.length === 0 ? (
                   <div className="text-center py-12 bg-dark-800 rounded-xl border border-dark-700 border-dashed">
                       <Calendar className="h-10 w-10 text-gray-600 mx-auto mb-3" />
                       <p className="text-gray-500">No confirmed slots yet.</p>
                   </div>
               ) : (
                   <div className="grid gap-4">
                       {activeBookings.map(booking => {
                           const date = new Date(booking.slotStartTime);
                           return (
                               <div key={booking.id} className="bg-dark-800 p-6 rounded-xl border border-dark-700 flex flex-col md:flex-row items-center justify-between gap-6">
                                   <div className="flex-grow">
                                       <div className="flex items-center gap-3 mb-2">
                                           <span className="text-green-500 bg-green-500/10 border border-green-500/20 text-xs font-bold px-2 py-0.5 rounded uppercase">
                                               {booking.status}
                                           </span>
                                           <span className="text-gray-500 text-xs font-mono">Code: {booking.accessCode}</span>
                                       </div>
                                       <h3 className="text-xl font-bold text-white mb-2">{booking.contentTitle}</h3>
                                       <div className="flex items-center gap-6 text-sm text-gray-400">
                                           <div className="flex items-center gap-2">
                                               <Calendar className="h-4 w-4" />
                                               <span>{format(date, 'MMM d, yyyy')}</span>
                                           </div>
                                           <div className="flex items-center gap-2">
                                               <Clock className="h-4 w-4" />
                                               <span>{format(date, 'HH:mm')}</span>
                                           </div>
                                       </div>
                                   </div>

                                   <div className="flex-shrink-0 w-full md:w-auto">
                                       <button 
                                           onClick={() => navigate(`/watch/${booking.id}`)}
                                           className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg shadow-brand-900/20"
                                       >
                                           <Play className="h-4 w-4 fill-current" /> Watch Now
                                       </button>
                                   </div>
                               </div>
                           );
                       })}
                   </div>
               )}
           </section>

           {/* Past Section */}
           {pastBookings.length > 0 && (
               <section className="opacity-60">
                   <h2 className="text-lg font-bold text-gray-400 mb-4">Past History</h2>
                   <div className="space-y-4">
                       {pastBookings.map(booking => (
                           <div key={booking.id} className="flex items-center justify-between p-4 bg-dark-800 rounded-lg border border-dark-700">
                               <span className="text-gray-300">{booking.contentTitle}</span>
                               <span className="text-xs uppercase px-2 py-1 bg-gray-700 rounded text-gray-400">{booking.status}</span>
                           </div>
                       ))}
                   </div>
               </section>
           )}
       </div>
    </div>
  );
};

export default UserDashboard;