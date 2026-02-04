'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Star, Clock, Users, Camera, Video, 
  Image as ImageIcon, Calendar, Gift, Sparkles, Target, Zap, 
  Shield, Award, Heart, TrendingUp, Crown, Infinity, 
  Coffee, Smartphone, Globe, Palette, Music, PartyPopper, Send
} from 'lucide-react';

// --- DATA SECTIONS ---
const packages = [
  { id: 1, name: 'Basic', category: 'portrait', price: 199, originalPrice: 299, popular: false, bestValue: false, duration: '2 hours', photos: '50+ edited', delivery: '7 days', team: '1 Photographer', highlights: ['Basic Portrait Session', 'Indoor/Outdoor Options', '50 High-Res Edited Photos', 'Online Gallery', '7-Day Delivery'], excluded: ['Extra Hours', 'Makeup Artist', 'Video Coverage', 'Printed Albums'], icon: Camera, color: 'from-blue-500 to-cyan-500', tag: 'STARTER' },
  { id: 2, name: 'Premium', category: 'wedding', price: 899, originalPrice: 1299, popular: true, bestValue: true, duration: 'Full Day', photos: '500+ edited', delivery: '14 days', team: '2 Photographers + 1 Videographer', highlights: ['Full Day Coverage', 'Pre-Wedding Shoot', '500+ Edited Photos', 'Cinematic Video (5 min)', 'Online & USB Delivery', 'Printed Photo Album', 'Makeup Artist Included', 'Drone Coverage'], excluded: ['Additional Days', 'Extra Albums', 'Raw Footage'], icon: Crown, color: 'from-pink-500 to-purple-500', tag: 'MOST POPULAR' },
  { id: 3, name: 'Business', category: 'commercial', price: 499, originalPrice: 699, popular: false, bestValue: false, duration: '4 hours', photos: '100+ edited', delivery: '5 days', team: '1 Photographer', highlights: ['Product Photography', 'Corporate Headshots', 'Branding Session', '100+ Edited Photos', 'Fast 5-Day Delivery', 'Commercial License', 'Social Media Formatting'], excluded: ['Video Content', 'Multiple Locations', 'Weekend Shoots'], icon: TrendingUp, color: 'from-emerald-500 to-teal-500', tag: 'PROFESSIONAL' },
  { id: 4, name: 'Ultimate', category: 'luxury', price: 2499, originalPrice: 3499, popular: false, bestValue: false, duration: '2 Days', photos: '1000+ edited', delivery: '21 days', team: '3 Photographers + 2 Videographers', highlights: ['Two Full Days Coverage', 'Multiple Locations', '1000+ Edited Photos', 'Feature Film (20 min)', 'Photo & Video Album', 'Drone & 360° Coverage', 'Professional Makeup Team', 'Album Design Service', 'Priority Editing', 'Lifetime Digital Storage', '1 Year Anniversary Shoot'], excluded: ['International Travel', 'Third Day Coverage'], icon: Sparkles, color: 'from-amber-500 to-orange-500', tag: 'LUXURY' },
];

const categories = [
  { id: 'all', name: 'All Packages', icon: Infinity },
  { id: 'wedding', name: 'Wedding', icon: Heart },
  { id: 'portrait', name: 'Portrait', icon: Users },
  { id: 'commercial', name: 'Commercial', icon: Target },
  { id: 'luxury', name: 'Luxury', icon: Crown },
  { id: 'event', name: 'Event', icon: PartyPopper },
];

const addons = [
  { id: 1, name: 'Extra Hour', price: 99, description: 'Additional photography time', icon: Clock },
  { id: 2, name: 'Drone Coverage', price: 199, description: 'Aerial photography & videography', icon: Globe },
  { id: 3, name: 'Photo Album', price: 299, description: 'Premium printed photo album', icon: ImageIcon },
  { id: 4, name: 'Cinematic Video', price: 499, description: '3-5 minute highlight film', icon: Video },
  { id: 5, name: 'Makeup Artist', price: 149, description: 'Professional makeup & hair', icon: Palette },
  { id: 6, name: '360° Video', price: 399, description: 'Immersive 360-degree video', icon: Music },
];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);

  // --- CALCULATION (Derived State - No useEffect needed) ---
  const basePrice = selectedPackage?.price || 0;
  const addonsPrice = selectedAddons.reduce((sum, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return sum + (addon?.price || 0);
  }, 0);
  const totalPrice = basePrice + addonsPrice;

  // --- HANDLERS ---
  const filteredPackages = packages.filter(pkg => 
    selectedCategory === 'all' || pkg.category === selectedCategory
  );

  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSelectedPackage(null);
    setSelectedAddons([]);
    setBookingStep(1);
  };

  const handleBookNow = () => {
    alert(`Booking confirmed! Total: $${totalPrice}\nWe will contact you shortly.`);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20 pb-20">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden mb-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 py-16 text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6">
            PACKAGES
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the perfect photography package for your special moments.
          </p>
        </motion.div>
      </div>

      {/* Step Indicator */}
      <div className="container mx-auto px-6 mb-12">
        <div className="flex justify-center gap-8 items-center">
          {[1, 2, 3].map((step) => (
            <div key={`step-dot-${step}`} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${bookingStep === step ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50' : 'bg-gray-800 text-gray-500'}`}>
                {step}
              </div>
              <div className={`hidden md:block h-1 w-12 rounded ${bookingStep > step ? 'bg-pink-500' : 'bg-gray-800'}`} />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Selection */}
        {bookingStep === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${selectedCategory === cat.id ? 'bg-pink-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                >
                  <cat.icon size={18} /> {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPackages.map((pkg) => (
                <motion.div key={pkg.id} whileHover={{ y: -10 }} className={`relative p-8 rounded-3xl bg-gray-900 border-2 ${pkg.popular ? 'border-pink-500 shadow-xl shadow-pink-500/20' : 'border-white/5'}`}>
                  {pkg.popular && <span className="absolute top-4 right-4 bg-pink-500 text-[10px] font-bold px-3 py-1 rounded-full">{pkg.tag}</span>}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${pkg.color} flex items-center justify-center mb-6`}>
                    <pkg.icon color="white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-pink-500">${pkg.price}</span>
                    <span className="text-gray-500 line-through">${pkg.originalPrice}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.highlights.map((h, i) => (
                      <li key={`${pkg.id}-h-${i}`} className="flex items-center gap-2 text-sm text-gray-400">
                        <Check size={14} className="text-green-500" /> {h}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handlePackageSelect(pkg)} className="w-full py-4 rounded-xl bg-white/5 hover:bg-pink-600 transition font-bold">
                    Select Package
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Addons */}
        {bookingStep === 2 && selectedPackage && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold mb-8">Customize Your Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addons.map((addon) => (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-6 rounded-2xl border-2 cursor-pointer transition ${selectedAddons.includes(addon.id) ? 'border-pink-500 bg-pink-500/5' : 'border-white/5 bg-white/5'}`}
                    >
                      <addon.icon className="mb-4 text-pink-500" />
                      <h4 className="font-bold text-xl">{addon.name}</h4>
                      <p className="text-gray-500 text-sm mb-4">{addon.description}</p>
                      <span className="text-xl font-bold">+${addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-3xl border border-white/10 h-fit sticky top-24">
                <h3 className="text-xl font-bold mb-6">Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{selectedPackage.name}</span>
                    <span>${selectedPackage.price}</span>
                  </div>
                  {selectedAddons.map(id => {
                    const a = addons.find(x => x.id === id);
                    return (
                      <div key={`summary-addon-${id}`} className="flex justify-between text-sm">
                        <span className="text-gray-400">{a?.name}</span>
                        <span>+${a?.price}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-2xl">
                    <span>Total</span>
                    <span className="text-pink-500">${totalPrice}</span>
                  </div>
                </div>
                <button onClick={() => setBookingStep(3)} className="w-full py-4 bg-pink-600 rounded-xl font-bold mb-4 shadow-lg shadow-pink-600/30">
                  Continue to Booking
                </button>
                <button onClick={handleReset} className="w-full py-4 bg-white/5 rounded-xl text-gray-400">
                  Back
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Final Form */}
        {bookingStep === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container mx-auto px-6 max-w-2xl">
            <div className="bg-gray-900 p-8 md:p-12 rounded-3xl border border-white/10">
              <h2 className="text-3xl font-bold mb-8 text-center">Final Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-pink-500 outline-none" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-pink-500 outline-none" placeholder="email@example.com" />
                </div>
                <div className="bg-pink-500/10 p-6 rounded-2xl mb-8">
                  <div className="flex justify-between font-bold text-xl mb-2">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                  <p className="text-sm text-pink-500/70">Includes {selectedPackage?.name} + {selectedAddons.length} addons</p>
                </div>
                <button onClick={handleBookNow} className="w-full py-5 bg-pink-600 rounded-2xl font-bold text-xl flex items-center justify-center gap-2">
                  <Send size={20} /> Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}