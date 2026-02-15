'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Camera, User, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for dynamic styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled 
      ? 'bg-black/60 backdrop-blur-md border-b border-white/10 py-2' 
      : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="group flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <div className="p-2 bg-pink-600 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white leading-none">VatsStudio</span>
              <span className="text-[10px] uppercase tracking-widest text-pink-500 font-bold">Studio</span>
            </div>
          </Link>

          {/* Desktop Menu - Modern Minimalist */}
          <div className="hidden md:flex items-center space-x-8">
            {['Home', 'Gallery', 'Packages', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="text-sm font-medium text-gray-300 hover:text-pink-500 transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-1 pl-4 rounded-full">
                <Link href="/admin" className="text-sm font-medium text-white hover:text-pink-400 transition">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 bg-white/10 hover:bg-red-500/20 rounded-full transition group"
                >
                  <LogOut className="h-4 w-4 text-white group-hover:text-red-400" />
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 active:scale-95"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>

        {/* Mobile Menu - Full Screen Glass Overlay */}
        <div className={`fixed inset-0 top-[60px] bg-black/95 backdrop-blur-2xl md:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 text-2xl font-bold">
            {['Home', 'Gallery', 'Packages', 'Bookings', 'About', 'Contact'].map((item) => (
              <Link 
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                className="text-white hover:text-pink-500 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            
            <div className="w-20 h-px bg-white/10"></div>

            {user ? (
              <>
                <Link href="/admin" className="flex items-center space-x-2 text-pink-500" onClick={() => setIsMenuOpen(false)}>
                  <User /> <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 text-red-500">
                  <LogOut /> <span>Logout</span>
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="w-2/3 bg-pink-600 text-white py-4 rounded-2xl text-center shadow-lg shadow-pink-600/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}