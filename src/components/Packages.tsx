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
  ShieldCheck,
  Send,
  User,
  Phone,
  Calendar,
  Mail,
  MapPin,
  MessageSquare,
  X as CloseIcon
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

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventLocation: string;
  message: string;
}

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState('premium');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    message: '',
  });

  const toggleAddon = (addon: string) => {
    setSelectedAddons(prev =>
      prev.includes(addon) ? prev.filter(a => a !== addon) : [...prev, addon]
    );
  };

  const calculateTotal = () => {
    const basePackage = packages.find(p => p.id === selectedPackage);
    if (!basePackage) return '₹0';
    let total = parseInt(basePackage.price.replace(/[^0-9]/g, ''));
    selectedAddons.forEach(addonName => {
      const addon = addons.find(a => a.name === addonName);
      if (addon) total += parseInt(addon.price.replace(/[^0-9]/g, ''));
    });
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const selectedPkg = packages.find(p => p.id === selectedPackage);
    const selectedAddonsList = selectedAddons.map(addon => {
      const addonDetails = addons.find(a => a.name === addon);
      return `• ${addon} (${addonDetails?.price})`;
    }).join('\n');

    return encodeURIComponent(
      `*New Booking Enquiry* 📸

*Customer Details:*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email || 'Not provided'}

*Event Details:*
• Date: ${formData.eventDate || 'Not specified'}
• Location: ${formData.eventLocation || 'Not specified'}

*Selected Package:*
• ${selectedPkg?.name} - ${selectedPkg?.price} (${selectedPkg?.duration})

${selectedAddons.length > 0 ? `*Add-ons Selected:*\n${selectedAddonsList}` : '*No add-ons selected*'}

*Total Estimated: ${calculateTotal()}*

*Message:*
${formData.message || 'No additional message'}

*Submitted from Wedding Photography Packages*`
    );
  };

  const handleBookNow = () => {
    setShowBookingForm(true);
    setSubmitStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate phone number
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappNumber = '9835665318';
      const message = generateWhatsAppMessage();
      
      // Open WhatsApp with the message
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setShowBookingForm(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          eventDate: '',
          eventLocation: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error sending to WhatsApp:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
                    <button
                        onClick={handleBookNow}
                        className="w-full md:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                        BOOK NOW <ArrowRight size={20} />
                    </button>
                </div>
            </div>
            
            <p className="text-center text-zinc-500 text-xs mt-10 font-bold tracking-widest uppercase">
                20% Advance to book date • Full editing included • 30 days revision period
            </p>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-[2.5rem] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-zinc-900 p-6 border-b border-white/10 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <Send size={20} className="text-pink-500" />
                  Complete Your Booking
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  Selected: {packages.find(p => p.id === selectedPackage)?.name}
                </p>
              </div>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <CloseIcon size={20} />
              </button>
            </div>

            {submitStatus === 'success' ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-500" />
                </div>
                <h4 className="text-2xl font-black mb-2">Booking Initiated!</h4>
                <p className="text-zinc-400 mb-6">Redirecting to WhatsApp to complete your booking...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <User size={14} className="text-pink-500" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Phone size={14} className="text-pink-500" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="9835665318"
                      pattern="[0-9]{10}"
                      maxLength={10}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Mail size={14} className="text-pink-500" />
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Calendar size={14} className="text-pink-500" />
                      Event Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white [color-scheme:dark] focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  {/* Event Location */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <MapPin size={14} className="text-pink-500" />
                      Event Location (Optional)
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleInputChange}
                      placeholder="City, Venue"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare size={14} className="text-pink-500" />
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us more about your event..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Selected Add-ons Summary */}
                {selectedAddons.length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-4">
                    <p className="text-xs font-black uppercase tracking-wider text-pink-500 mb-2">Selected Add-ons:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedAddons.map(addon => (
                        <span key={addon} className="text-xs bg-pink-500/20 px-3 py-1 rounded-full">
                          {addon}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total Summary */}
                <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 rounded-2xl p-4 border border-pink-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-black uppercase tracking-wider">Estimated Total:</span>
                    <span className="text-2xl font-black text-pink-500">{calculateTotal()}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-2">
                    You will be redirected to WhatsApp to confirm your booking
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 py-4 rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-pink-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send via WhatsApp
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-center text-zinc-500">
                  By submitting, you agree to our terms and privacy policy
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}