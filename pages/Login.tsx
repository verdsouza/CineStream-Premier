import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store } from '../services/store';
import { Film, ExternalLink, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const config = Store.getConfig();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (email) {
        const user = Store.login(email, password);
        if (user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/dashboard');
        }
    } else {
        setError('Please enter your credentials');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative z-0">
        <div className="absolute top-8 left-8 z-10">
            <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                <ArrowLeft className="h-5 w-5" /> Back to Home
            </Link>
        </div>

        <div className="bg-dark-900 p-8 rounded-2xl w-full max-w-md border border-dark-800 shadow-2xl relative z-10">
            <div className="text-center mb-8">
                 <Film className="h-10 w-10 text-brand-600 mx-auto mb-4" />
                 <h1 className="text-2xl font-bold text-white mb-2">Member Access</h1>
                 <p className="text-gray-400 text-sm">Enter your approved credentials to access slots.</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Username or Email</label>
                    <input 
                        type="text" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-brand-500 focus:outline-none transition-colors"
                        placeholder="admin"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark-800 border border-dark-700 text-white px-4 py-3 rounded-lg focus:ring-1 focus:ring-brand-500 focus:outline-none transition-colors"
                            placeholder="••••••••"
                        />
                        <Lock className="absolute right-3 top-3.5 h-4 w-4 text-gray-600" />
                    </div>
                </div>
                
                {error && <p className="text-red-500 text-xs">{error}</p>}
                
                <button type="submit" className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-brand-900/20 flex items-center justify-center gap-2">
                    Access Platform <ArrowRight className="h-4 w-4" />
                </button>
            </form>
            
            <div className="pt-6 border-t border-dark-800">
                <p className="text-center text-gray-400 text-sm mb-4">Don't have an account?</p>
                <a 
                    href={config.googleFormRegistrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full bg-dark-800 hover:bg-dark-700 text-white text-center font-medium py-3 rounded-lg transition-colors border border-dark-700 flex items-center justify-center gap-2"
                >
                    <ExternalLink className="h-4 w-4 text-brand-500" />
                    Request Access / Register
                </a>
                <p className="text-[10px] text-gray-500 text-center mt-2">Registration requires approval via our Google Form.</p>
            </div>
        </div>
    </div>
  );
};

export default Login;