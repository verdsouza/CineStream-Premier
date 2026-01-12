import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Store } from '../services/store';
import { User, SiteConfig } from '../types';
import { Menu, X, LogOut, Film, ShieldCheck, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => Store.getCurrentUser());
  const [config, setConfig] = useState<SiteConfig>(() => Store.getConfig());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncState = () => {
      setUser(Store.getCurrentUser());
      setConfig(Store.getConfig());
    };

    // Listen for our robust custom event AND the standard storage event
    window.addEventListener(Store.STORE_EVENT, syncState);
    window.addEventListener('storage', syncState);

    return () => {
      window.removeEventListener(Store.STORE_EVENT, syncState);
      window.removeEventListener('storage', syncState);
    };
  }, []);

  const handleLogout = () => {
    Store.logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path ? 'text-brand-500 font-semibold' : 'text-gray-300 hover:text-white';

  return (
    <div className="min-h-screen bg-dark-900 text-gray-100 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-dark-900/90 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Film className="h-8 w-8 text-brand-600" />
                <span className="font-bold text-xl tracking-wider text-white uppercase">{config.siteName}</span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link to="/" className={isActive('/')}>Home</Link>
                  <Link to="/browse" className={isActive('/browse')}>Browse</Link>
                  <Link to="/about" className={isActive('/about')}>About</Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6 space-x-4">
                {user ? (
                  <>
                    <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-dark-800 hover:bg-dark-700 transition-colors">
                      <LayoutDashboard className="h-4 w-4 text-brand-500" />
                      <span>Dashboard</span>
                    </Link>
                    {user.role === 'admin' && (
                         <Link to="/admin" className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-brand-900/20 text-brand-500 hover:bg-brand-900/30 transition-colors">
                         <ShieldCheck className="h-4 w-4" />
                         <span>Admin</span>
                       </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white px-3 py-2 rounded-md hover:bg-dark-800 transition-colors" title="Sign Out">
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-lg shadow-brand-900/20">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-700 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-dark-800 border-b border-dark-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-dark-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/browse" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-700" onClick={() => setIsMenuOpen(false)}>Browse</Link>
              <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-700" onClick={() => setIsMenuOpen(false)}>About</Link>
              {user ? (
                <>
                   <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-700" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                   {user.role === 'admin' && <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:text-brand-300 hover:bg-dark-700" onClick={() => setIsMenuOpen(false)}>Admin Panel</Link>}
                   <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-dark-700">Sign Out</button>
                </>
              ) : (
                <Link to="/login" className="block w-full text-center mt-4 px-5 py-3 rounded-md font-bold bg-brand-600 text-white" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        {children}
      </main>

      <footer className="bg-dark-950 border-t border-dark-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                         <Film className="h-6 w-6 text-brand-600" />
                         <span className="font-bold text-lg text-white">{config.siteName}</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Premium entertainment slot booking.
                        Secure, private, and exclusive.
                    </p>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Platform</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/browse" className="hover:text-brand-500">Movies & TV</Link></li>
                        <li><Link to="/about" className="hover:text-brand-500">How it Works</Link></li>
                        <li><Link to="/dashboard" className="hover:text-brand-500">My Slots</Link></li>
                        {/* Always visible link to Login/Admin to allow switching accounts if stuck */}
                        <li><Link to="/login" className="hover:text-brand-500">Admin Login</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link to="/privacy" className="hover:text-brand-500">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-brand-500">Terms of Service</Link></li>
                        <li><Link to="/refund" className="hover:text-brand-500">Refund Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-white font-semibold mb-4">Contact</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>{config.contactEmail}</li>
                        <li>Los Angeles, CA</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-dark-800 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;