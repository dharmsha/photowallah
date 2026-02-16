'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Camera, User, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigation = (href) => {
    setIsMenuOpen(false);
    router.push(href);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Packages', href: '/packages' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <Link 
              href="/logo.jpeg" 
              className="group flex items-center space-x-2 relative z-50" 
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="p-1.5 sm:p-2 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-pink-600/20">
                <Camera className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-tighter text-white leading-none">VatsStudio</span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-pink-400 font-bold">Photography</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-sm font-medium text-gray-300 hover:text-pink-500 transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center gap-4 bg-white/5 backdrop-blur border border-white/10 p-1 pl-4 rounded-full">
                  <Link 
                    href="/admin" 
                    className="text-sm font-medium text-white hover:text-pink-400 transition"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="p-2 bg-white/10 hover:bg-red-500/20 rounded-full transition-all duration-300 group"
                    aria-label="Logout"
                  >
                    <LogOut className="h-4 w-4 text-white group-hover:text-red-400 group-hover:scale-110 transition" />
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className="bg-white text-black text-sm font-bold px-6 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-pink-600 hover:to-rose-600 hover:text-white transition-all duration-300 active:scale-95 shadow-lg hover:shadow-pink-600/20"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              className="md:hidden p-2 text-white relative z-50 hover:bg-white/10 rounded-lg transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <div className="relative w-6 h-6">
                <Menu className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                }`} />
                <X className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                }`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen with Smooth Animation */}
      <div 
        ref={menuRef}
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-[90] md:hidden transition-all duration-500 ease-in-out ${
          isMenuOpen 
            ? 'opacity-100 visible translate-y-0' 
            : 'opacity-0 invisible translate-y-full'
        }`}
        style={{
          top: 0,
          height: '100vh',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {/* Navigation Items */}
          <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full text-center text-2xl font-bold text-white hover:text-pink-500 transition-all duration-300 py-3 border-b border-white/10 hover:border-pink-500/50 transform hover:scale-105 ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 50}ms`,
                  transitionProperty: 'all',
                  transitionDuration: '400ms'
                }}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className={`w-24 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent my-4 transition-all duration-700 delay-300 ${
            isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}></div>

          {/* Auth Section */}
          <div className={`flex flex-col items-center space-y-4 w-full max-w-sm transition-all duration-700 delay-500 ${
            isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            {user ? (
              <>
                <button
                  onClick={() => handleNavigation('/admin')}
                  className="flex items-center justify-center space-x-3 w-full text-xl font-semibold text-pink-400 hover:text-pink-300 py-4 bg-white/5 rounded-2xl border border-white/10 hover:border-pink-500/30 transition-all"
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-3 w-full text-xl font-semibold text-red-400 hover:text-red-300 py-4 bg-white/5 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-pink-600/30 hover:shadow-pink-600/50 transition-all hover:scale-105 active:scale-95"
              >
                Login
              </button>
            )}
          </div>

          {/* Footer Note */}
          <p className={`absolute bottom-8 text-xs text-gray-600 transition-all duration-700 delay-700 ${
            isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            © 2024 VatsStudio • Capture the Moment
          </p>
        </div>
      </div>

      {/* Overlay click to close (for better UX) */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-[85] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}