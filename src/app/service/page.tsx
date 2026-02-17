'use client';

import { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  MessageSquare,
  Send,
  Check,
  X,
  Sparkles,
  Star,
  Heart,
  Briefcase,
  GraduationCap,
  Music,
  Trophy,
  ShoppingBag,
  Church,
  Laptop,
  HandHeart,
  Baby,
  ArrowRight,
  X as CloseIcon
} from 'lucide-react';

// Categories Data
const eventCategories = [
  {
    id: 'social',
    name: 'Social Events',
    icon: Heart,
    color: 'pink',
    events: [
      'Wedding', 'Engagement', 'Reception', 'Birthday Party', 'Anniversary',
      'Baby Shower', 'Housewarming', 'Family Get-together', 'Farewell Party'
    ]
  },
  {
    id: 'corporate',
    name: 'Corporate Events',
    icon: Briefcase,
    color: 'blue',
    events: [
      'Conference', 'Seminar', 'Workshop', 'Business Meeting', 'Product Launch',
      'Corporate Party', 'Award Ceremony', 'Team Building Event', 'Annual General Meeting (AGM)'
    ]
  },
  {
    id: 'educational',
    name: 'Educational Events',
    icon: GraduationCap,
    color: 'green',
    events: [
      'School Function', 'College Fest', 'Convocation', 'Science Exhibition',
      'Debate Competition', 'Training Program', 'Webinar'
    ]
  },
  {
    id: 'entertainment',
    name: 'Entertainment Events',
    icon: Music,
    color: 'purple',
    events: [
      'Concert', 'DJ Night', 'Music Festival', 'Dance Show',
      'Fashion Show', 'Movie Premiere', 'Stand-up Comedy Show'
    ]
  },
  {
    id: 'sports',
    name: 'Sports Events',
    icon: Trophy,
    color: 'orange',
    events: [
      'Cricket Tournament', 'Football Match', 'Marathon',
      'Indoor Sports Competition', 'E-sports Tournament'
    ]
  },
  {
    id: 'exhibition',
    name: 'Exhibition & Trade Events',
    icon: ShoppingBag,
    color: 'yellow',
    events: [
      'Trade Fair', 'Expo', 'Art Exhibition', 'Book Fair',
      'Auto Show', 'Food Festival'
    ]
  },
  {
    id: 'religious',
    name: 'Religious & Cultural Events',
    icon: Church,
    color: 'red',
    events: [
      'Puja Ceremony', 'Iftar Party', 'Christmas Celebration',
      'Diwali Function', 'Cultural Festival', 'Community Gathering'
    ]
  },
  {
    id: 'virtual',
    name: 'Virtual / Online Events',
    icon: Laptop,
    color: 'cyan',
    events: [
      'Online Webinar', 'Virtual Conference', 'Online Workshop',
      'Live Streaming Event', 'Hybrid Event'
    ]
  },
  {
    id: 'charity',
    name: 'Charity & Non-Profit Events',
    icon: HandHeart,
    color: 'emerald',
    events: [
      'Fundraising Event', 'NGO Program', 'Blood Donation Camp',
      'Awareness Campaign', 'Social Service Event'
    ]
  },
  {
    id: 'kids',
    name: 'Kids & Special Events',
    icon: Baby,
    color: 'rose',
    events: [
      'Kids Party', 'School Picnic', 'Talent Show', 'Kids Carnival'
    ]
  }
];

// Photography Packages
const packages = [
  {
    name: 'Essential',
    price: '₹9,999',
    duration: '4 Hours',
    features: ['1 Photographer', '200+ Photos', 'Online Gallery']
  },
  {
    name: 'Premium',
    price: '₹19,999',
    duration: '8 Hours',
    features: ['2 Photographers', '500+ Photos', 'Photo Album', 'Drone Shots']
  },
  {
    name: 'Luxury',
    price: '₹39,999',
    duration: 'Full Day',
    features: ['3 Photographers', '1000+ Photos', 'Premium Album', 'Cinematic Video', 'Same Day Edit']
  }
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventCategory: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  package: string;
  guests: string;
  message: string;
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState(eventCategories[0].id);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(packages[1].name);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventCategory: '',
    eventType: '',
    eventDate: '',
    eventLocation: '',
    package: '',
    guests: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    return encodeURIComponent(
      `*New Event Booking Request* 🎉📸

*📋 CUSTOMER DETAILS*
• Name: ${formData.name}
• Phone: ${formData.phone}
• Email: ${formData.email || 'Not provided'}

*🎪 EVENT DETAILS*
• Category: ${formData.eventCategory}
• Event Type: ${formData.eventType}
• Date: ${formData.eventDate || 'Not specified'}
• Location: ${formData.eventLocation || 'Not specified'}
• Expected Guests: ${formData.guests || 'Not specified'}

*📸 PACKAGE SELECTED*
• ${formData.package}

*💬 ADDITIONAL MESSAGE*
${formData.message || 'No additional message'}

*Submitted from Event Services Page*`
    );
  };

  const handleBookNow = (categoryName: string, eventName: string) => {
    setFormData(prev => ({
      ...prev,
      eventCategory: categoryName,
      eventType: eventName,
      package: selectedPackage
    }));
    setShowBookingForm(true);
    setSubmitStatus('idle');
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setShowBookingForm(false);
    document.body.style.overflow = 'unset';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!formData.phone || formData.phone.length < 10) {
      alert('Please enter a valid phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const whatsappNumber = '9835665318';
      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
      
      setSubmitStatus('success');
      
      setTimeout(() => {
        handleCloseModal();
        setFormData({
          name: '',
          phone: '',
          email: '',
          eventCategory: '',
          eventType: '',
          eventDate: '',
          eventLocation: '',
          package: '',
          guests: '',
          message: '',
        });
        setSubmitStatus('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get color classes
  const getColorClasses = (color: string, isSelected: boolean) => {
    const colors: Record<string, { bg: string, border: string, text: string }> = {
      pink: { bg: 'bg-pink-500/10', border: 'border-pink-500', text: 'text-pink-500' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-500' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-500' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500', text: 'text-purple-500' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500', text: 'text-orange-500' },
      yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-500' },
      red: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-500' },
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500', text: 'text-cyan-500' },
      emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500', text: 'text-emerald-500' },
      rose: { bg: 'bg-rose-500/10', border: 'border-rose-500', text: 'text-rose-500' },
    };
    
    if (isSelected) {
      return colors[color].border;
    }
    return 'border-white/10 hover:border-white/20';
  };

  return (
    <>
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
          }}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-zinc-900 rounded-[2.5rem] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-zinc-900 p-6 border-b border-white/10 flex justify-between items-center rounded-t-[2.5rem]">
              <div>
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <Send size={20} className="text-pink-500" />
                  Complete Your Booking
                </h3>
                <p className="text-zinc-400 text-sm mt-1">
                  {formData.eventCategory} - {formData.eventType}
                </p>
              </div>
              <button 
                onClick={handleCloseModal}
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
                  {/* Name */}
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Phone */}
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Mail size={14} className="text-pink-500" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Calendar size={14} className="text-pink-500" />
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white [color-scheme:dark] focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <MapPin size={14} className="text-pink-500" />
                      Event Location
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      value={formData.eventLocation}
                      onChange={handleInputChange}
                      placeholder="City, Venue"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <User size={14} className="text-pink-500" />
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      placeholder="Approx. count"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  {/* Package - Read only */}
                  <div className="space-y-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Sparkles size={14} className="text-pink-500" />
                      Selected Package
                    </label>
                    <input
                      type="text"
                      value={formData.package}
                      readOnly
                      className="w-full bg-pink-500/10 border border-pink-500/30 rounded-2xl px-4 py-3 text-pink-500 font-bold"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <MessageSquare size={14} className="text-pink-500" />
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Tell us more about your event..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-pink-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
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

      {/* Main Content */}
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 pt-24 pb-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-80 bg-pink-600/20 blur-[120px] rounded-full" />
          
          <div className="container mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-pink-500 mb-6">
              <Star className="h-4 w-4 fill-pink-500" />
              <span className="text-xs font-black tracking-[0.3em] uppercase">Your Vision, Our Lens</span>
              <Star className="h-4 w-4 fill-pink-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              Capture Every
              <span className="text-pink-600 block mt-2">Special Moment</span>
            </h1>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Professional photography & videography for all your events. Book now and get 20% off!
            </p>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="container mx-auto px-6 -mt-16 relative z-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {eventCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 text-left ${
                    isSelected 
                      ? `bg-${category.color}-500/10 border-${category.color}-500 scale-[1.02]` 
                      : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isSelected ? `bg-${category.color}-500 text-white` : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className={`text-lg font-black mb-1 ${
                    isSelected ? `text-${category.color}-500` : 'text-white'
                  }`}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{category.events.length}+ Events</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events List */}
        <div className="container mx-auto px-6 py-20">
          {eventCategories.map((category) => {
            if (category.id !== selectedCategory) return null;
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="animate-fadeIn">
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-16 h-16 rounded-2xl bg-${category.color}-500/20 flex items-center justify-center`}>
                    <Icon size={32} className={`text-${category.color}-500`} />
                  </div>
                  <div>
                    <h2 className="text-4xl font-black tracking-tighter">{category.name}</h2>
                    <p className="text-zinc-500 mt-1">Select your event type to book</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
                  {category.events.map((event) => (
                    <button
                      key={event}
                      onClick={() => setSelectedEvent(event)}
                      className={`p-6 rounded-2xl border transition-all text-left ${
                        selectedEvent === event 
                          ? `bg-${category.color}-500/10 border-${category.color}-500` 
                          : 'bg-zinc-900/50 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{event}</span>
                        {selectedEvent === event && (
                          <Check size={18} className={`text-${category.color}-500`} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Packages */}
                {selectedEvent && (
                  <div className="animate-fadeIn">
                    <h3 className="text-2xl font-black mb-8 flex items-center gap-2">
                      <Sparkles className={`text-${category.color}-500`} />
                      Choose Your Package
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.name}
                          onClick={() => setSelectedPackage(pkg.name)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedPackage === pkg.name
                              ? `border-${category.color}-500 bg-${category.color}-500/10`
                              : 'border-white/5 bg-zinc-900/50 hover:border-white/20'
                          }`}
                        >
                          <h4 className="text-xl font-black mb-2">{pkg.name}</h4>
                          <div className="text-3xl font-black text-pink-500 mb-2">{pkg.price}</div>
                          <div className="text-sm text-zinc-500 mb-4 flex items-center gap-1">
                            <Clock size={14} /> {pkg.duration}
                          </div>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, i) => (
                              <li key={i} className="text-sm text-zinc-400 flex items-center gap-2">
                                <Check size={14} className="text-pink-500" /> {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Book Button */}
                    {selectedEvent && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleBookNow(category.name, selectedEvent)}
                          className="bg-pink-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-3 hover:bg-pink-700 transition-all active:scale-95 shadow-2xl shadow-pink-600/20"
                        >
                          Book {selectedEvent} Now
                          <ArrowRight size={24} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="border-t border-white/5 py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-black text-pink-500 mb-2">10+</div>
                <div className="text-sm text-zinc-400">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-black text-pink-500 mb-2">500+</div>
                <div className="text-sm text-zinc-400">Events Covered</div>
              </div>
              <div>
                <div className="text-3xl font-black text-pink-500 mb-2">24/7</div>
                <div className="text-sm text-zinc-400">Quick Response</div>
              </div>
              <div>
                <div className="text-3xl font-black text-pink-500 mb-2">100%</div>
                <div className="text-sm text-zinc-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
}