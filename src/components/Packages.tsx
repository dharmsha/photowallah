'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  Camera, 
  Video, 
  Album, 
  Users, 
  Clock, 
  Gift,
  Sparkles,
  Crown,
  Star,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const packages = [
  {
    id: 'basic',
    name: 'Essential',
    tagline: 'Intimate Ceremonies',
    price: '₹49,999',
    duration: '8 Hours',
    originalPrice: '₹64,999',
    popular: false,
    icon: Camera,
    features: [
      { included: true, text: '5 hours of photography coverage' },
      { included: true, text: '300+ edited digital images' },
      { included: true, text: '1 professional photographer' },
      { included: true, text: 'Online gallery for 1 year' },
      { included: false, text: 'Wedding album' },
      { included: false, text: 'Cinematic video highlights' },
    ],
    bestFor: ['Small ceremonies', 'Digital-only'],
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Most Loved Choice',
    price: '₹89,999',
    duration: '12 Hours',
    originalPrice: '₹1,14,999',
    popular: true,
    icon: Crown,
    features: [
      { included: true, text: '10 hours of coverage' },
      { included: true, text: '600+ edited digital images' },
      { included: true, text: '2 professional photographers' },
      { included: true, text: '30-page premium wedding album' },
      { included: true, text: 'Cinematic video highlights' },
      { included: true, text: 'Drone coverage' },
    ],
    bestFor: ['Full coverage', 'Video highlights'],
  },
  {
    id: 'deluxe',
    name: 'Deluxe',
    tagline: 'Luxury Experience',
    price: '₹1,49,999',
    duration: 'Multi-day',
    originalPrice: '₹1,89,999',
    popular: false,
    icon: Sparkles,
    features: [
      { included: true, text: 'Multi-day (3 days) coverage' },
      { included: true, text: '1000+ edited digital images' },
      { included: true, text: 'Lead + 2 assistant photographers' },
      { included: true, text: '50-page luxury wedding album' },
      { included: true, text: 'Full cinematic videography' },
      { included: true, text: 'Anniversary shoot included' },
    ],
    bestFor: ['Grand weddings', 'Multi-event'],
  },
];

const addons = [
  { name: 'Additional Hour', price: '₹2,999/hr', icon: Clock },
  { name: 'Second Camera', price: '₹15,000', icon: Users },
  { name: 'Luxury Album', price: '₹12,999', icon: Album },
  { name: '4K Cinematic', price: '₹39,999', icon: Video },
  { name: 'Gift Shoot', price: '₹9,999', icon: Gift },
];

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    const basePackage = packages.find(p => p.id === selectedPackage);
    if (!basePackage) return '0';
    let total = parseInt(basePackage.price.replace(/[^0-9]/g, ''));
    selectedAddons.forEach(addonName => {
      const addon = addons.find(a => a.name === addonName);
      if (addon) total += parseInt(addon.price.replace(/[^0-9]/g, ''));
    });
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
  };

  return (
    <section className="py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Modern Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="flex items-center gap-2 text-pink-500 mb-6 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">
            <Star className="h-4 w-4 fill-pink-500" />
            <span className="text-xs font-black tracking-[0.3em] uppercase">Invest in Memories</span>
            <Star className="h-4 w-4 fill-pink-500" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 italic leading-none">
            PICK YOUR <span className="text-pink-600">PLAN</span>
          </h2>
          <p className="text-zinc-400 max-w-xl text-lg font-medium leading-relaxed">
            Simple pricing for timeless moments. High-end editing and full resolution delivery included.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20 relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-pink-600/10 blur-[120px] -z-10" />
            
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage === pkg.id;
            
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.id)}
                className={`group relative rounded-[2.5rem] p-10 cursor-pointer transition-all duration-500 border shadow-2xl ${
                  isSelected 
                  ? 'bg-zinc-900 border-pink-500/50 scale-[1.03] ring-4 ring-pink-500/10' 
                  : 'bg-zinc-900/40 border-white/5 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg shadow-pink-600/20">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${isSelected ? 'bg-pink-500 text-white' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'}`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-3xl font-black mb-1">{pkg.name}</h3>
                  <p className="text-zinc-500 text-sm font-semibold uppercase tracking-tighter">{pkg.tagline}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black">{pkg.price}</span>
                    <span className="text-zinc-600 line-through text-sm">{pkg.originalPrice}</span>
                  </div>
                  <div className="text-zinc-500 text-xs mt-2 flex items-center gap-1">
                    <Clock size={12} /> {pkg.duration} total coverage
                  </div>
                </div>

                <div className="space-y-4 mb-10 border-t border-white/5 pt-8">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      {f.included ? (
                        <Check size={18} className="text-pink-500 flex-shrink-0" />
                      ) : (
                        <X size={18} className="text-zinc-700 flex-shrink-0" />
                      )}
                      <span className={`text-sm ${f.included ? 'text-zinc-300' : 'text-zinc-600 font-light'}`}>
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                  isSelected ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/30' : 'bg-white/5 text-white group-hover:bg-white group-hover:text-black'
                }`}>
                  {isSelected ? 'Current Selection' : 'Select Package'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-ons & Total Section */}
        <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[3rem] border border-white/5 p-8 md:p-12">
            <h3 className="text-2xl font-black mb-10 flex items-center gap-3 uppercase tracking-tighter italic">
                <Sparkles className="text-pink-500" />
                Customize your experience
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {addons.map((addon) => {
                    const Icon = addon.icon;
                    const isSelected = selectedAddons.includes(addon.name);
                    return (
                        <button
                            key={addon.name}
                            onClick={() => toggleAddon(addon.name)}
                            className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-3 ${
                                isSelected ? 'bg-pink-500/10 border-pink-500' : 'bg-white/5 border-white/5 hover:border-white/20'
                            }`}
                        >
                            <Icon className={isSelected ? 'text-pink-500' : 'text-zinc-500'} />
                            <div>
                                <div className="text-xs font-black uppercase mb-1">{addon.name}</div>
                                <div className="text-[10px] text-zinc-500 font-bold tracking-widest">{addon.price}</div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Sticky/Floating Bottom Total */}
            <div className="bg-pink-600 rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-3xl shadow-pink-600/20">
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex w-20 h-20 bg-white/10 rounded-full items-center justify-center backdrop-blur-md">
                        <ShieldCheck size={40} className="text-white" />
                    </div>
                    <div>
                        <h4 className="text-3xl font-black text-white italic">Ready to make it official?</h4>
                        <p className="text-pink-100/70 font-medium">Selected: {packages.find(p=>p.id===selectedPackage)?.name} with {selectedAddons.length} Extras</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
                    <div className="text-center md:text-right">
                        <span className="text-pink-200 text-xs font-black uppercase tracking-widest block mb-1">Estimated Total</span>
                        <span className="text-5xl font-black text-white tracking-tighter">{calculateTotal()}</span>
                    </div>
                    <Link
                        href="/bookings"
                        className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                        BOOK NOW <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
            
            <p className="text-center text-zinc-500 text-xs mt-10 font-bold tracking-widest uppercase">
                20% Advance to book date • Full editing included • 30 days revision period
            </p>
        </div>
      </div>
    </section>
  );
}