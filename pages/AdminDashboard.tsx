import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store } from '../services/store';
import { User, ContentItem, Booking, SiteConfig, ContentType, AccessType } from '../types';
import { LayoutDashboard, Film, Calendar, Settings, Plus, Trash2, Edit, Check, X, Save, ExternalLink, Image as ImageIcon, Youtube, DollarSign, Server, CreditCard, Lock, Key, RefreshCw, AlertTriangle, Globe, Search } from 'lucide-react';
import SmartImage from '../components/SmartImage';
import SEO from '../components/SEO';

// --- UUID GENERATOR SCRIPT ---
// Adapted from user provided script for React/TS environment
function generateUUID() {
    let d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now();
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}
// -----------------------------

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'bookings' | 'settings'>('content');
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [config, setConfig] = useState<SiteConfig>(Store.getConfig());
  const [configSaved, setConfigSaved] = useState(false);
  
  // CMS State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<ContentItem>>({});

  const navigate = useNavigate();

  useEffect(() => {
    const u = Store.getCurrentUser();
    if (!u || u.role !== 'admin') {
        navigate('/login');
        return;
    }
    setUser(u);
    refreshData();
  }, [navigate]);

  const refreshData = () => {
    setContentList(Store.getContent());
    setBookingsList(Store.getBookings());
    setConfig(Store.getConfig());
  };

  // --- Content Logic ---

  const handleAddNew = () => {
      setEditingItem({
          type: ContentType.MOVIE,
          accessType: AccessType.PREMIUM,
          genre: [],
          streamUrls: {}
      });
      setIsModalOpen(true);
  };

  const handleEditContent = (item: ContentItem) => {
      setEditingItem({...item});
      setIsModalOpen(true);
  };

  const handleDeleteContent = (id: string) => {
      if(confirm('Are you sure you want to delete this title?')) {
          const newList = contentList.filter(c => c.id !== id);
          Store.updateContent(newList);
          refreshData();
      }
  };

  const handleSaveContent = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newItem: ContentItem = {
          id: editingItem.id || Math.random().toString(36).substr(2, 9),
          title: editingItem.title || 'Untitled',
          description: editingItem.description || '',
          type: editingItem.type || ContentType.MOVIE,
          thumbnailUrl: editingItem.thumbnailUrl || '',
          backdropUrl: editingItem.backdropUrl || '',
          rating: editingItem.rating || 'NR',
          duration: editingItem.duration || '0m',
          genre: editingItem.genre || [],
          accessType: editingItem.accessType || AccessType.PREMIUM,
          price: editingItem.price,
          trailerId: editingItem.trailerId,
          streamUrls: editingItem.streamUrls,
          premiumVideoUrl: editingItem.premiumVideoUrl
      };

      let newList = [...contentList];
      const index = newList.findIndex(c => c.id === newItem.id);
      
      if (index >= 0) {
          newList[index] = newItem;
      } else {
          newList.push(newItem);
      }

      Store.updateContent(newList);
      refreshData();
      setIsModalOpen(false);
  };

  // --- Booking Logic ---

  const handleApproveBooking = (id: string) => {
      const booking = bookingsList.find(b => b.id === id);
      if (booking) {
          // GENERATE THE API KEY / ACCESS KEY HERE
          const apiKey = generateUUID();
          
          Store.updateBookingStatus(id, 'active', apiKey);
          refreshData();
          alert(`Booking Approved! API Key Generated: ${apiKey}`);
      }
  };

  const handleRejectBooking = (id: string) => {
    if(confirm('Reject this booking?')) {
        Store.updateBookingStatus(id, 'expired');
        refreshData();
    }
  };

  // --- Settings Logic ---

  const handleSaveConfig = (e: React.FormEvent) => {
      e.preventDefault();
      Store.updateConfig(config);
      setConfigSaved(true);
      setTimeout(() => setConfigSaved(false), 3000);
  };

  const handleResetData = () => {
      if (confirm('DANGER: This will delete ALL modifications made in the Admin Panel and reset the content library to the default code values (constants.ts). This cannot be undone. Are you sure?')) {
          Store.resetContentToDefaults();
          refreshData();
          alert('Database reset to code defaults.');
      }
  };

  const pendingBookings = bookingsList.filter(b => b.status === 'pending');
  const otherBookings = bookingsList.filter(b => b.status !== 'pending');

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col md:flex-row relative">
        <SEO title="Admin Dashboard" />
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-dark-800 border-r border-dark-700 flex-shrink-0">
            <div className="p-6 border-b border-dark-700">
                <h2 className="text-xl font-bold text-white">Admin CMS</h2>
                <p className="text-xs text-brand-500 font-mono mt-1">Super Admin Access</p>
            </div>
            <nav className="p-4 space-y-2 flex flex-row md:flex-col overflow-x-auto">
                <button 
                    onClick={() => setActiveTab('content')}
                    className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'content' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'}`}
                >
                    <Film className="h-5 w-5" /> Content
                </button>
                <button 
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'bookings' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'}`}
                >
                    <Calendar className="h-5 w-5" /> Bookings
                    {pendingBookings.length > 0 && (
                        <span className="ml-auto bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">{pendingBookings.length}</span>
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-dark-700 hover:text-white'}`}
                >
                    <Settings className="h-5 w-5" /> Site Settings
                </button>
            </nav>
        </div>

        {/* Main Area */}
        <div className="flex-grow p-4 md:p-8 overflow-y-auto">
             <div className="flex justify-between items-center mb-8">
                 <h1 className="text-2xl font-bold text-white capitalize">{activeTab} Management</h1>
                 {activeTab === 'content' && (
                     <button 
                        onClick={handleAddNew}
                        className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium shadow-lg shadow-brand-900/20"
                     >
                         <Plus className="h-4 w-4" /> Add New Title
                     </button>
                 )}
             </div>

             {/* ... Content and Bookings tabs remain same ... */}
             {activeTab === 'content' && (
                 <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 shadow-xl">
                     <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-dark-900/50 text-gray-400 text-sm">
                                <tr>
                                    <th className="p-4 font-medium">Title</th>
                                    <th className="p-4 font-medium">Type</th>
                                    <th className="p-4 font-medium">Access</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-700">
                                {contentList.map(item => (
                                    <tr key={item.id} className="hover:bg-dark-700/50 transition-colors">
                                        <td className="p-4 text-white font-medium flex items-center gap-3">
                                            <div className="w-8 h-12 flex-shrink-0 bg-dark-900 rounded overflow-hidden">
                                                <SmartImage src={item.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            {item.title}
                                        </td>
                                        <td className="p-4 text-gray-400 text-sm uppercase">{item.type}</td>
                                        <td className="p-4">
                                            <span className={`text-xs font-bold px-2 py-1 rounded ${item.accessType === 'FREE' ? 'bg-green-500/10 text-green-500' : 'bg-brand-500/10 text-brand-500'}`}>
                                                {item.accessType}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button onClick={() => handleEditContent(item)} className="p-2 text-gray-400 hover:text-white hover:bg-dark-600 rounded"><Edit className="h-4 w-4" /></button>
                                            <button onClick={() => handleDeleteContent(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-dark-600 rounded"><Trash2 className="h-4 w-4" /></button>
                                        </td>
                                    </tr>
                                ))}
                                {contentList.length === 0 && (
                                    <tr><td colSpan={4} className="p-8 text-center text-gray-500">No content available. Click "Add New Title" to start.</td></tr>
                                )}
                            </tbody>
                        </table>
                     </div>
                 </div>
             )}

             {activeTab === 'bookings' && (
                 <div className="space-y-8">
                     {/* ... Pending Approvals ... */}
                     {pendingBookings.length > 0 && (
                         <div className="bg-yellow-900/10 rounded-xl overflow-hidden border border-yellow-900/30">
                            <div className="p-4 bg-yellow-900/20 border-b border-yellow-900/30 flex items-center gap-2">
                                <h3 className="font-bold text-yellow-500">Pending Approvals ({pendingBookings.length})</h3>
                                <p className="text-sm text-gray-400 ml-2 hidden md:block">System will generate API Key upon approval.</p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="text-gray-400 text-sm">
                                        <tr>
                                            <th className="p-4">User</th>
                                            <th className="p-4">Content</th>
                                            <th className="p-4">Tx ID</th>
                                            <th className="p-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-yellow-900/20">
                                        {pendingBookings.map(b => (
                                            <tr key={b.id} className="hover:bg-yellow-900/5">
                                                <td className="p-4 text-white">{b.userEmail}</td>
                                                <td className="p-4 text-gray-300">
                                                    {b.contentTitle}
                                                    <div className="text-xs text-gray-500 mt-0.5">${b.pricePaid.toFixed(2)}</div>
                                                </td>
                                                <td className="p-4 text-yellow-500 font-mono font-bold text-sm">
                                                    {b.transactionId || 'N/A'}
                                                </td>
                                                <td className="p-4 text-right flex justify-end gap-2">
                                                    <button onClick={() => handleApproveBooking(b.id)} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-bold flex items-center gap-1">
                                                        <Key className="h-3 w-3" /> Generate Key & Approve
                                                    </button>
                                                    <button onClick={() => handleRejectBooking(b.id)} className="px-3 py-1 bg-dark-700 hover:bg-dark-600 text-gray-300 rounded text-xs font-bold flex items-center gap-1">
                                                        <X className="h-3 w-3" /> Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                         </div>
                     )}

                     {/* Active/History */}
                     <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700">
                         <div className="p-4 bg-dark-900/50 border-b border-dark-700">
                             <h3 className="font-bold text-gray-300">Booking History</h3>
                         </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-dark-900/50 text-gray-400 text-sm">
                                    <tr>
                                        <th className="p-4 font-medium">User</th>
                                        <th className="p-4 font-medium">Content</th>
                                        <th className="p-4 font-medium">API Key / Access Code</th>
                                        <th className="p-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-700">
                                    {otherBookings.map(b => (
                                        <tr key={b.id} className="hover:bg-dark-700/50">
                                            <td className="p-4 text-white font-medium text-sm">{b.userEmail}</td>
                                            <td className="p-4 text-gray-400 text-sm">{b.contentTitle}</td>
                                            <td className="p-4 text-gray-400 text-sm font-mono">{b.accessCode}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                    b.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-700 text-gray-400'
                                                }`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {otherBookings.length === 0 && (
                                        <tr><td colSpan={4} className="p-8 text-center text-gray-500">No other bookings found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                         </div>
                     </div>
                 </div>
             )}

             {activeTab === 'settings' && (
                 <div className="space-y-8">
                     {/* Danger Zone */}
                     <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-6">
                         <h3 className="text-red-500 font-bold flex items-center gap-2 mb-4">
                             <AlertTriangle className="h-5 w-5" /> Danger Zone
                         </h3>
                         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                             <p className="text-gray-400 text-sm">
                                 If you have manually edited the <code>constants.ts</code> code file and want the app to pick up those changes, 
                                 or if the data looks corrupted, use this button. 
                                 <br/><span className="text-red-400">Warning: This wipes all custom changes made in this Admin Panel.</span>
                             </p>
                             <button 
                                onClick={handleResetData}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-red-900/20 whitespace-nowrap"
                             >
                                 <RefreshCw className="h-5 w-5" /> Reset Content to Defaults
                             </button>
                         </div>
                     </div>

                     <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
                        <div className="p-6 border-b border-dark-700">
                            <h2 className="text-xl font-bold text-white">Global Site Configuration</h2>
                            <p className="text-gray-400 text-sm mt-1">Manage external links and website appearance.</p>
                        </div>
                        <form onSubmit={handleSaveConfig} className="p-6 space-y-8">
                            
                             {/* SEO Section (NEW) */}
                             <div className="bg-blue-900/10 border border-blue-900/20 p-6 rounded-xl">
                                <h3 className="text-blue-500 font-bold flex items-center gap-2 mb-4">
                                    <Globe className="h-5 w-5" /> SEO & Analytics
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Google Analytics ID</label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                            <input 
                                                type="text"
                                                value={config.googleAnalyticsId || ''}
                                                onChange={(e) => setConfig({...config, googleAnalyticsId: e.target.value})}
                                                className="w-full bg-dark-900 border border-dark-600 text-white pl-10 pr-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                                placeholder="G-XXXXXXXXXX"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Enter your GA4 Measurement ID.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Google Search Console Verification Code</label>
                                        <input 
                                            type="text"
                                            value={config.searchConsoleVerification || ''}
                                            onChange={(e) => setConfig({...config, searchConsoleVerification: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="HTML Tag content (e.g. uL0_...)"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Paste the code from the meta tag verification method.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Global Meta Keywords</label>
                                        <textarea 
                                            rows={2}
                                            value={config.globalKeywords || ''}
                                            onChange={(e) => setConfig({...config, globalKeywords: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="movies, streaming, exclusive, 4k..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Site Description</label>
                                        <textarea 
                                            rows={2}
                                            value={config.seoDescription || ''}
                                            onChange={(e) => setConfig({...config, seoDescription: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg focus:border-blue-500 focus:outline-none"
                                            placeholder="The premier destination for..."
                                        />
                                    </div>
                                </div>
                             </div>

                            {/* Integration Section */}
                            <div className="bg-brand-900/10 border border-brand-900/20 p-6 rounded-xl">
                                <h3 className="text-brand-500 font-bold flex items-center gap-2 mb-4">
                                    <ExternalLink className="h-5 w-5" /> Integrations
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Registration Form URL (Google Forms)</label>
                                        <input 
                                            type="url"
                                            value={config.googleFormRegistrationUrl}
                                            onChange={(e) => setConfig({...config, googleFormRegistrationUrl: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg focus:border-brand-500 focus:outline-none"
                                            placeholder="https://docs.google.com/forms/..."
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Link for new users on the Login page.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">PayPal Payment Link</label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                                            <input 
                                                type="url"
                                                value={config.paypalUrl}
                                                onChange={(e) => setConfig({...config, paypalUrl: e.target.value})}
                                                className="w-full bg-dark-900 border border-dark-600 text-white pl-10 pr-4 py-2 rounded-lg focus:border-brand-500 focus:outline-none"
                                                placeholder="https://paypal.me/RnDServicesMumbai"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Used for 'Book Slot' payments. Users will be directed here to pay.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-4">
                                <h3 className="text-white font-bold">Branding & Text</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Site Name</label>
                                        <input 
                                            type="text"
                                            value={config.siteName}
                                            onChange={(e) => setConfig({...config, siteName: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Support Email</label>
                                        <input 
                                            type="text"
                                            value={config.contactEmail}
                                            onChange={(e) => setConfig({...config, contactEmail: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Title</label>
                                        <input 
                                            type="text"
                                            value={config.heroTitle}
                                            onChange={(e) => setConfig({...config, heroTitle: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Hero Subtitle</label>
                                        <input 
                                            type="text"
                                            value={config.heroSubtitle}
                                            onChange={(e) => setConfig({...config, heroSubtitle: e.target.value})}
                                            className="w-full bg-dark-900 border border-dark-600 text-white px-4 py-2 rounded-lg"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Sections */}
                            <div className="space-y-4">
                                <h3 className="text-white font-bold">Homepage Layout (CMS)</h3>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={config.showHero}
                                            onChange={(e) => setConfig({...config, showHero: e.target.checked})}
                                            className="w-4 h-4 rounded border-gray-600 text-brand-600 focus:ring-brand-500 bg-dark-900" 
                                        />
                                        <span className="text-gray-300">Show Hero Banner</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={config.showTrending}
                                            onChange={(e) => setConfig({...config, showTrending: e.target.checked})}
                                            className="w-4 h-4 rounded border-gray-600 text-brand-600 focus:ring-brand-500 bg-dark-900" 
                                        />
                                        <span className="text-gray-300">Show Trending Section</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input 
                                            type="checkbox"
                                            checked={config.showBenefits}
                                            onChange={(e) => setConfig({...config, showBenefits: e.target.checked})}
                                            className="w-4 h-4 rounded border-gray-600 text-brand-600 focus:ring-brand-500 bg-dark-900" 
                                        />
                                        <span className="text-gray-300">Show Benefits Section</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-dark-700 flex items-center gap-4">
                                <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg shadow-brand-900/20">
                                    <Save className="h-5 w-5" /> Save Configuration
                                </button>
                                {configSaved && (
                                    <span className="text-green-500 font-medium flex items-center gap-1 animate-fade-in">
                                        <Check className="h-4 w-4" /> Changes Saved!
                                    </span>
                                )}
                            </div>
                        </form>
                     </div>
                 </div>
             )}
        </div>

        {/* CMS Edit/Add Modal (Previous code remains) */}
        {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
                <div className="relative bg-dark-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl border border-dark-700 shadow-2xl">
                    <form onSubmit={handleSaveContent}>
                        {/* ... Modal form content ... */}
                        <div className="p-6 border-b border-dark-700 flex justify-between items-center sticky top-0 bg-dark-800 z-10">
                            <h2 className="text-xl font-bold text-white">{editingItem.id ? 'Edit Content' : 'Add New Content'}</h2>
                            <button type="button" onClick={() => setIsModalOpen(false)}><X className="text-gray-400 hover:text-white" /></button>
                        </div>
                        
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="md:col-span-2 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title</label>
                                    <input required type="text" value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                    <textarea required rows={3} value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" />
                                </div>
                            </div>

                            {/* Classification */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Type</label>
                                    <select value={editingItem.type} onChange={e => setEditingItem({...editingItem, type: e.target.value as ContentType})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white">
                                        <option value={ContentType.MOVIE}>Movie</option>
                                        <option value={ContentType.SERIES}>TV Series</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Access Type</label>
                                    <select value={editingItem.accessType} onChange={e => setEditingItem({...editingItem, accessType: e.target.value as AccessType})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white">
                                        <option value={AccessType.PREMIUM}>Premium (Paid Slot)</option>
                                        <option value={AccessType.FREE}>Free (Watch Now)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Genres (comma separated)</label>
                                    <input type="text" value={editingItem.genre?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, genre: e.target.value.split(',').map(s => s.trim())})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="Action, Sci-Fi" />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Rating</label>
                                        <input type="text" value={editingItem.rating || ''} onChange={e => setEditingItem({...editingItem, rating: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="PG-13" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                                        <input type="text" value={editingItem.duration || ''} onChange={e => setEditingItem({...editingItem, duration: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="2h 15m" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                                        <input 
                                            type="number" 
                                            step="0.01"
                                            disabled={editingItem.accessType === AccessType.FREE}
                                            value={editingItem.price || ''} 
                                            onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})} 
                                            className="w-full bg-dark-900 border border-dark-600 p-2 pl-9 rounded text-white disabled:opacity-50" 
                                            placeholder="0.00" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Media Assets */}
                            <div className="md:col-span-2 space-y-4 border-t border-dark-700 pt-4">
                                <h3 className="font-bold text-gray-300 flex items-center gap-2"><ImageIcon className="h-4 w-4" /> Media Assets</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Thumbnail (Public Filename or URL)</label>
                                        <input type="text" value={editingItem.thumbnailUrl || ''} onChange={e => setEditingItem({...editingItem, thumbnailUrl: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="/Movie_Name_2026.jpg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Backdrop (Public Filename or URL)</label>
                                        <input type="text" value={editingItem.backdropUrl || ''} onChange={e => setEditingItem({...editingItem, backdropUrl: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="/Movie_Backdrop.jpg" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-400 mb-1">YouTube Trailer ID</label>
                                        <div className="flex items-center gap-2">
                                            <Youtube className="h-5 w-5 text-red-500" />
                                            <input type="text" value={editingItem.trailerId || ''} onChange={e => setEditingItem({...editingItem, trailerId: e.target.value})} className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" placeholder="e.g. dQw4w9WgXcQ" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PREMIUM VIDEO URL */}
                            {editingItem.accessType === AccessType.PREMIUM && (
                                <div className="md:col-span-2 space-y-4 border-t border-dark-700 pt-4 bg-brand-900/10 p-4 rounded-xl border border-brand-900/30">
                                    <h3 className="font-bold text-brand-500 flex items-center gap-2"><Lock className="h-4 w-4" /> Premium Secure Content</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Premium Embed Code / URL (Secret)</label>
                                        <input 
                                            type="text" 
                                            value={editingItem.premiumVideoUrl || ''} 
                                            onChange={e => setEditingItem({...editingItem, premiumVideoUrl: e.target.value})} 
                                            className="w-full bg-dark-900 border border-brand-900/50 text-white p-2 rounded focus:border-brand-500 focus:outline-none" 
                                            placeholder="https://private-server.com/embed/..." 
                                        />
                                        <p className="text-xs text-gray-500 mt-1">This link is hidden from the public. It is only injected into the page when a user has a valid API Key.</p>
                                    </div>
                                </div>
                            )}

                            {/* Free Streaming Config */}
                            {editingItem.accessType === AccessType.FREE && (
                                <div className="md:col-span-2 space-y-4 border-t border-dark-700 pt-4">
                                    <h3 className="font-bold text-green-500 flex items-center gap-2"><Server className="h-4 w-4" /> Free Stream Sources</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[1, 2, 3, 4].map(num => (
                                            <div key={num}>
                                                <label className="block text-sm font-medium text-gray-400 mb-1">Server {num} URL</label>
                                                <input 
                                                    type="url" 
                                                    value={(editingItem.streamUrls as any)?.[`server${num}`] || ''} 
                                                    onChange={e => setEditingItem({
                                                        ...editingItem, 
                                                        streamUrls: { ...editingItem.streamUrls, [`server${num}`]: e.target.value }
                                                    })} 
                                                    className="w-full bg-dark-900 border border-dark-600 p-2 rounded text-white" 
                                                    placeholder={`https://server${num}.example.com/embed/...`} 
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                        
                        <div className="p-6 border-t border-dark-700 bg-dark-800 sticky bottom-0 flex justify-end gap-3">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg bg-dark-700 text-white hover:bg-dark-600">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 font-bold shadow-lg">Save Content</button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default AdminDashboard;