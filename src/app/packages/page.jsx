'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, Star, Clock, Users, Camera, Video, 
  Image, Calendar, Gift, Sparkles, Target, Zap, 
  Shield, Award, Heart, TrendingUp, Crown, Infinity, 
  Coffee, Smartphone, Globe, Palette, Music, PartyPopper
} from 'lucide-react';

const packages = [
  {
    id: 1,
    name: 'Basic',
    category: 'portrait',
    price: 199,
    originalPrice: 299,
    popular: false,
    bestValue: false,
    duration: '2 hours',
    photos: '50+ edited',
    delivery: '7 days',
    team: '1 Photographer',
    highlights: [
      'Basic Portrait Session',
      'Indoor/Outdoor Options',
      '50 High-Res Edited Photos',
      'Online Gallery',
      '7-Day Delivery',
    ],
    excluded: [
      'Extra Hours',
      'Makeup Artist',
      'Video Coverage',
      'Printed Albums',
    ],
    icon: Camera,
    color: 'from-blue-500 to-cyan-500',
    tag: 'STARTER',
  },
  {
    id: 2,
    name: 'Premium',
    category: 'wedding',
    price: 899,
    originalPrice: 1299,
    popular: true,
    bestValue: true,
    duration: 'Full Day',
    photos: '500+ edited',
    delivery: '14 days',
    team: '2 Photographers + 1 Videographer',
    highlights: [
      'Full Day Coverage',
      'Pre-Wedding Shoot',
      '500+ Edited Photos',
      'Cinematic Video (5 min)',
      'Online & USB Delivery',
      'Printed Photo Album',
      'Makeup Artist Included',
      'Drone Coverage',
    ],
    excluded: [
      'Additional Days',
      'Extra Albums',
      'Raw Footage',
    ],
    icon: Crown,
    color: 'from-pink-500 to-purple-500',
    tag: 'MOST POPULAR',
  },
  {
    id: 3,
    name: 'Business',
    category: 'commercial',
    price: 499,
    originalPrice: 699,
    popular: false,
    bestValue: false,
    duration: '4 hours',
    photos: '100+ edited',
    delivery: '5 days',
    team: '1 Photographer',
    highlights: [
      'Product Photography',
      'Corporate Headshots',
      'Branding Session',
      '100+ Edited Photos',
      'Fast 5-Day Delivery',
      'Commercial License',
      'Social Media Formatting',
    ],
    excluded: [
      'Video Content',
      'Multiple Locations',
      'Weekend Shoots',
    ],
    icon: TrendingUp,
    color: 'from-emerald-500 to-teal-500',
    tag: 'PROFESSIONAL',
  },
  {
    id: 4,
    name: 'Ultimate',
    category: 'luxury',
    price: 2499,
    originalPrice: 3499,
    popular: false,
    bestValue: false,
    duration: '2 Days',
    photos: '1000+ edited',
    delivery: '21 days',
    team: '3 Photographers + 2 Videographers',
    highlights: [
      'Two Full Days Coverage',
      'Multiple Locations',
      '1000+ Edited Photos',
      'Feature Film (20 min)',
      'Photo & Video Album',
      'Drone & 360° Coverage',
      'Professional Makeup Team',
      'Album Design Service',
      'Priority Editing',
      'Lifetime Digital Storage',
      '1 Year Anniversary Shoot',
    ],
    excluded: [
      'International Travel',
      'Third Day Coverage',
    ],
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    tag: 'LUXURY',
  },
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
  {
    id: 1,
    name: 'Extra Hour',
    price: 99,
    description: 'Additional photography time',
    icon: Clock,
  },
  {
    id: 2,
    name: 'Drone Coverage',
    price: 199,
    description: 'Aerial photography & videography',
    icon: Globe,
  },
  {
    id: 3,
    name: 'Photo Album',
    price: 299,
    description: 'Premium printed photo album',
    icon: Image,
  },
  {
    id: 4,
    name: 'Cinematic Video',
    price: 499,
    description: '3-5 minute highlight film',
    icon: Video,
  },
  {
    id: 5,
    name: 'Makeup Artist',
    price: 149,
    description: 'Professional makeup & hair',
    icon: Palette,
  },
  {
    id: 6,
    name: '360° Video',
    price: 399,
    description: 'Immersive 360-degree video',
    icon: Music,
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Wedding Client',
    rating: 5,
    content: 'The Premium package was worth every penny! Our wedding photos are absolutely stunning.',
    package: 'Premium',
    avatar: 'PS',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Business Owner',
    rating: 5,
    content: 'Professional headshots that perfectly captured our brand identity. Highly recommended!',
    package: 'Business',
    avatar: 'RV',
  },
  {
    id: 3,
    name: 'Anjali Patel',
    role: 'Model',
    rating: 5,
    content: 'The portrait session was amazing. The photographer made me feel so comfortable.',
    package: 'Basic',
    avatar: 'AP',
  },
];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  // Filter packages by category
  const filteredPackages = packages.filter(pkg => 
    selectedCategory === 'all' || pkg.category === selectedCategory
  );

  // Calculate total price
  useEffect(() => {
    let basePrice = selectedPackage?.price || 0;
    let addonsPrice = selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId);
      return sum + (addon?.price || 0);
    }, 0);
    setTotalPrice(basePrice + addonsPrice);
  }, [selectedPackage, selectedAddons]);

  // Toggle addon selection
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Handle package selection
  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setBookingStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset booking
  const handleReset = () => {
    setSelectedPackage(null);
    setSelectedAddons([]);
    setBookingStep(1);
  };

  // Handle booking submission
  const handleBookNow = () => {
    alert(`Booking confirmed! Total: $${totalPrice}\nWe'll contact you shortly.`);
    handleReset();
  };

  // Booking steps
  const bookingSteps = [
    { number: 1, title: 'Select Package', active: bookingStep === 1 },
    { number: 2, title: 'Add Services', active: bookingStep === 2 },
    { number: 3, title: 'Book Now', active: bookingStep === 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-purple-600/10 to-blue-600/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="inline-block p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg mb-6"
          >
            <Crown className="h-12 w-12 text-white" />
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6">
            PACKAGES
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the perfect photography package for your special moments. 
            Each package is crafted with care to deliver exceptional results.
          </p>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {[
              { value: '500+', label: 'Happy Clients', icon: Users },
              { value: '4.9/5', label: 'Average Rating', icon: Star },
              { value: '24/7', label: 'Support', icon: Shield },
              { value: '100%', label: 'Satisfaction', icon: Award },
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <stat.icon className="h-8 w-8 text-pink-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Booking Steps */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2 z-0"></div>
            {bookingSteps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mb-2 transition-all ${
                  step.active 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white scale-110' 
                    : 'bg-white/10 text-gray-400'
                }`}>
                  {step.number}
                </div>
                <span className={`text-sm font-medium ${
                  step.active ? 'text-white' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Package Selection (Step 1) */}
      <AnimatePresence mode="wait">
        {bookingStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-6 py-8"
          >
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {category.name}
                  </motion.button>
                );
              })}
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredPackages.map((pkg, index) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className={`relative rounded-3xl overflow-hidden border-2 ${
                      pkg.popular 
                        ? 'border-pink-500 shadow-2xl shadow-pink-500/20' 
                        : 'border-white/10'
                    }`}
                  >
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-6 right-6 z-10">
                        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                          {pkg.tag}
                        </div>
                      </div>
                    )}

                    {/* Best Value Badge */}
                    {pkg.bestValue && (
                      <div className="absolute top-6 left-6 z-10">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          BEST VALUE
                        </div>
                      </div>
                    )}

                    <div className="p-8 bg-gradient-to-b from-gray-900 to-black">
                      {/* Package Header */}
                      <div className="text-center mb-8">
                        <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${pkg.color} mb-4`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                            ${pkg.price}
                          </span>
                          <span className="text-gray-400 line-through">${pkg.originalPrice}</span>
                          <span className="text-pink-500 text-sm font-bold">SAVE ${pkg.originalPrice - pkg.price}</span>
                        </div>
                        <div className="text-gray-400 text-sm">{pkg.category.toUpperCase()} PACKAGE</div>
                      </div>

                      {/* Features */}
                      <div className="space-y-4 mb-8">
                        {pkg.highlights.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                        {pkg.excluded.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3 opacity-50">
                            <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-400 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Package Details */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                          <Clock className="h-5 w-5 text-pink-500 mx-auto mb-2" />
                          <div className="text-white font-semibold">{pkg.duration}</div>
                          <div className="text-gray-400 text-xs">Duration</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 text-center">
                          <Image className="h-5 w-5 text-pink-500 mx-auto mb-2" />
                          <div className="text-white font-semibold">{pkg.photos}</div>
                          <div className="text-gray-400 text-xs">Photos</div>
                        </div>
                      </div>

                      {/* Select Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePackageSelect(pkg)}
                        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
                          pkg.popular
                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:shadow-lg hover:shadow-pink-500/30'
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        Select Package
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Addon Selection (Step 2) */}
        {bookingStep === 2 && selectedPackage && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-6 py-8"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Selected Package Summary */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-2"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8 mb-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Selected Package</h2>
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedPackage.color}`}>
                            <selectedPackage.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{selectedPackage.name}</h3>
                            <p className="text-gray-400">{selectedPackage.category.toUpperCase()} PACKAGE</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                          ${selectedPackage.price}
                        </div>
                        <div className="text-gray-400 line-through text-sm">${selectedPackage.originalPrice}</div>
                      </div>
                    </div>

                    {/* Package Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-white/5 rounded-xl p-4">
                        <Clock className="h-5 w-5 text-pink-500 mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.duration}</div>
                        <div className="text-gray-400 text-sm">Duration</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <Image className="h-5 w-5 text-pink-500 mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.photos}</div>
                        <div className="text-gray-400 text-sm">Photos</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <Calendar className="h-5 w-5 text-pink-500 mb-2" />
                        <div className="text-white font-semibold">{selectedPackage.delivery}</div>
                        <div className="text-gray-400 text-sm">Delivery</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <Users className="h-5 w-5 text-pink-500 mb-2" />
                        <div className="text-white font-semibold text-sm">{selectedPackage.team}</div>
                        <div className="text-gray-400 text-sm">Team</div>
                      </div>
                    </div>

                    {/* Included Features */}
                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">What is Included</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedPackage.highlights.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Addons Section */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Add Extra Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {addons.map((addon, index) => {
                        const Icon = addon.icon;
                        const isSelected = selectedAddons.includes(addon.id);
                        return (
                          <motion.div
                            key={addon.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => toggleAddon(addon.id)}
                            className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-pink-500 bg-gradient-to-br from-pink-500/10 to-purple-500/10'
                                : 'border-white/10 bg-white/5 hover:border-white/20'
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute top-4 right-4">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              </div>
                            )}
                            <Icon className={`h-10 w-10 mb-4 ${isSelected ? 'text-pink-500' : 'text-gray-400'}`} />
                            <h3 className="text-xl font-bold text-white mb-2">{addon.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                            <div className="text-2xl font-bold text-white">+${addon.price}</div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="lg:col-span-1"
                >
                  <div className="sticky top-24 bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-white/10 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      {/* Package */}
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-semibold">{selectedPackage.name}</div>
                          <div className="text-gray-400 text-sm">Base Package</div>
                        </div>
                        <div className="text-white font-bold">${selectedPackage.price}</div>
                      </div>

                      {/* Addons */}
                      {selectedAddons.map(addonId => {
                        const addon = addons.find(a => a.id === addonId);
                        if (!addon) return null;
                        return (
                          <div key={addonId} className="flex justify-between items-center">
                            <div>
                              <div className="text-white font-semibold">{addon.name}</div>
                              <div className="text-gray-400 text-sm">Addon Service</div>
                            </div>
                            <div className="text-white font-bold">${addon.price}</div>
                          </div>
                        );
                      })}

                      {/* Divider */}
                      <div className="border-t border-white/10 pt-4">
                        <div className="flex justify-between items-center">
                          <div className="text-white font-bold text-lg">Total</div>
                          <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                            ${totalPrice}
                          </div>
                        </div>
                        <div className="text-gray-400 text-sm mt-2">
                          Save ${selectedPackage.originalPrice - selectedPackage.price}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setBookingStep(3)}
                        className="w-full py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                      >
                        Continue to Booking
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleReset}
                        className="w-full py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                      >
                        Change Package
                      </motion.button>
                    </div>

                    {/* Guarantee */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="h-5 w-5 text-green-500" />
                        <div className="text-white font-bold">100% Satisfaction Guarantee</div>
                      </div>
                      <p className="text-gray-300 text-sm">
                        If you are not satisfied with our service, we will reshoot or refund your money.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Booking Form (Step 3) */}
        {bookingStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="container mx-auto px-6 py-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8">
                <h2 className="text-3xl font-bold text-white mb-2">Complete Your Booking</h2>
                <p className="text-gray-400 mb-8">Fill in your details to confirm your photography session</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Preferred Date</label>
                    <input 
                      type="date" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-white font-medium mb-2">Special Requests</label>
                    <textarea 
                      rows="4"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                      placeholder="Any special requirements or notes..."
                    />
                  </div>
                </div>

                {/* Final Summary */}
                <div className="bg-white/5 rounded-2xl p-6 mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Package:</span>
                      <span className="text-white font-semibold">{selectedPackage?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Addons:</span>
                      <span className="text-white font-semibold">
                        {selectedAddons.length} service(s)
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/10">
                      <span className="text-white font-bold text-lg">Total Amount:</span>
                      <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBookNow}
                    className="flex-1 min-w-[200px] py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/30 transition-all"
                  >
                    Confirm & Pay Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBookingStep(2)}
                    className="flex-1 min-w-[200px] py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                  >
                    Back to Addons
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="flex-1 min-w-[200px] py-4 bg-white/5 text-gray-400 font-bold rounded-xl hover:bg-white/10 transition-all"
                  >
                    Start Over
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">{testimonial.content}</p>
              <div className="text-sm text-pink-500 font-semibold">
                Package: {testimonial.package}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: 'What is included in the photography packages?',
              answer: 'All packages include professional photography, edited high-resolution photos, and online gallery access. Higher packages include additional services like video coverage, albums, and makeup artists.',
            },
            {
              question: 'How long does editing take?',
              answer: 'Editing time varies by package: Basic (7 days), Business (5 days), Premium (14 days), Ultimate (21 days). Rush editing is available as an addon.',
            },
            {
              question: 'Can I customize a package?',
              answer: 'Yes! You can add extra services to any package. Contact us for completely custom packages tailored to your needs.',
            },
            {
              question: 'What is your cancellation policy?',
              answer: 'We offer full refunds for cancellations made 30+ days in advance. 50% refund for 15-30 days. No refund for cancellations within 14 days.',
            },
            {
              question: 'Do you travel for shoots?',
              answer: 'Yes! We travel nationwide. Travel costs are calculated based on location and added to your package.',
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-pink-500/30 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-20 text-center"
      >
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl p-12 border border-white/20">
          <Sparkles className="h-16 w-16 text-pink-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Capture Your Special Moments?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Book your photography session today and get 15% off on your first booking!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={selectedPackage ? () => setBookingStep(3) : () => setBookingStep(1)}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              {selectedPackage ? 'Complete Booking' : 'View Packages'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              Contact Us
            </motion.button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            *Limited time offer. Terms and conditions apply.
          </p>
        </div>
      </motion.div>
    </div>
  );
}