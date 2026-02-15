'use client';

import Link from 'next/link';
import { 
  Camera, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Download,
  AppWindow,
  Smartphone,
  CheckCircle,
  Shield,
  Clock,
  Globe
} from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubscribed(true);
    setEmail('');
    setLoading(false);
    
    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Camera className="h-6 w-6 md:h-8 md:w-8 text-pink-400" />
              <span className="text-xl md:text-2xl font-bold">VatsStudio</span>
            </Link>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Capturing love stories since 2012. Professional wedding photography 
              that preserves your most precious memories for generations.
            </p>
            
            <div className="flex space-x-3 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-600 p-1.5 md:p-2 rounded-lg transition"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-pink-600 p-1.5 md:p-2 rounded-lg transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-red-600 p-1.5 md:p-2 rounded-lg transition"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-400 p-1.5 md:p-2 rounded-lg transition"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-pink-300">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition flex items-center text-sm md:text-base">
                  <span className="w-1 h-1 bg-pink-500 rounded-full mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-pink-300">Contact Us</h3>
            <ul className="space-y-3 md:space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="h-4 w-4 md:h-5 md:w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm md:text-base">
                  <div className="font-medium">Call Us</div>
                  <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition">
                    +91 98765 43210
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-4 w-4 md:h-5 md:w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm md:text-base">
                  <div className="font-medium">Email</div>
                  <a href="mailto:contact@VatsStudio.com" className="text-gray-400 hover:text-white transition">
                    contact@VatsStudio.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm md:text-base">
                  <div className="font-medium">Location</div>
                  <div className="text-gray-400">
                    123 Wedding Street,<br />
                    Patna - 800001, India
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & App Download */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-pink-300">Stay Connected</h3>
            
            {/* Newsletter - FIXED: Now properly responsive */}
            <div className="mb-6">
              <p className="text-gray-400 text-xs md:text-sm mb-2">Get wedding tips & offers</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg sm:rounded-l-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={loading || subscribed}
                  className="w-full sm:w-auto px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg sm:rounded-r-lg sm:rounded-l-none font-medium transition disabled:opacity-50 text-sm whitespace-nowrap"
                >
                  {loading ? '...' : subscribed ? '✓ Subscribed' : 'Subscribe'}
                </button>
              </form>
              {subscribed && (
                <p className="text-green-400 text-xs mt-2">Subscribed successfully! 🎉</p>
              )}
            </div>

            {/* App Download Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-3 md:p-4 rounded-xl">
              <div className="flex items-center mb-2 md:mb-3">
                <Smartphone className="h-5 w-5 md:h-6 md:w-6 text-pink-400 mr-2" />
                <h4 className="font-semibold text-sm md:text-base">Download Our App</h4>
              </div>
              
              <p className="text-gray-300 text-xs md:text-sm mb-3">
                Manage bookings, view photos, and get updates on the go.
              </p>

              {/* App Features */}
              <div className="grid grid-cols-2 gap-1 md:gap-2 mb-3">
                <div className="flex items-center text-xs">
                  <CheckCircle className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                  <span className="truncate">Book Events</span>
                </div>
                <div className="flex items-center text-xs">
                  <Shield className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                  <span className="truncate">Secure Login</span>
                </div>
                <div className="flex items-center text-xs">
                  <Clock className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                  <span className="truncate">Real-time Updates</span>
                </div>
                <div className="flex items-center text-xs">
                  <Globe className="h-3 w-3 text-green-400 mr-1 flex-shrink-0" />
                  <span className="truncate">Anywhere Access</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="space-y-2">
                <a
                  href="https://play.google.com/store/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-black hover:bg-gray-900 p-2 md:p-3 rounded-lg transition group"
                >
                  <div className="flex items-center">
                    <AppWindow className="h-5 w-5 md:h-6 md:w-6 mr-2 text-green-400" />
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="text-sm md:text-base font-bold">Google Play</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-white" />
                </a>

                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-black hover:bg-gray-900 p-2 md:p-3 rounded-lg transition group"
                >
                  <div className="flex items-center">
                    <AppWindow className="h-5 w-5 md:h-6 md:w-6 mr-2 text-blue-400" />
                    <div>
                      <div className="text-xs">Download on</div>
                      <div className="text-sm md:text-base font-bold">App Store</div>
                    </div>
                  </div>
                  <Download className="h-4 w-4 md:h-5 md:w-5 text-gray-400 group-hover:text-white" />
                </a>

                <Link
                  href="/web-app"
                  className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 p-2 md:p-3 rounded-lg transition group text-sm md:text-base"
                >
                  <Globe className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  <span className="font-semibold">Use Web App</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-pink-400">500+</div>
              <div className="text-gray-400 text-xs md:text-sm">Happy Couples</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-pink-400">12+</div>
              <div className="text-gray-400 text-xs md:text-sm">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-pink-400">24/7</div>
              <div className="text-gray-400 text-xs md:text-sm">Support</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-pink-400">98%</div>
              <div className="text-gray-400 text-xs md:text-sm">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-4 md:py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-gray-500 text-xs md:text-sm text-center md:text-left">
              © {new Date().getFullYear()} VatsStudio Wedding Photography. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 text-xs md:text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition">
                Terms
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-white transition">
                Cookies
              </Link>
              <Link href="/faq" className="text-gray-500 hover:text-white transition">
                FAQ
              </Link>
              <Link href="/sitemap" className="text-gray-500 hover:text-white transition">
                Sitemap
              </Link>
            </div>
            
            <div className="text-gray-500 text-xs md:text-sm flex items-center">
              Made with <Heart className="h-3 w-3 md:h-4 md:w-4 mx-1 text-pink-500 fill-pink-500" /> in India
            </div>
          </div>
        </div>
      </div>

      {/* Floating Download Button (Mobile) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          }}
          className="flex items-center justify-center bg-gradient-to-r from-pink-600 to-rose-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all animate-bounce"
          aria-label="Download App"
        >
          <Download className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}