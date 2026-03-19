'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Send, CheckCircle2, Calendar, User, Mail, Phone, MapPin, 
  MessageSquare, Sparkles, Loader2 
} from 'lucide-react';

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    venue: '',
    package: 'Premium',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Firebase Firestore mein data store ho raha hai
      await addDoc(collection(db, "wedding_bookings"), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-pink-500/30 rounded-[3rem] p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-pink-500 w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 italic uppercase">Request Received!</h2>
          <p className="text-zinc-400 mb-8 font-medium">Aryan will contact you within 24 hours to discuss your big day.</p>
          <button 
            onClick={() => setSubmitted(false)}
            className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-pink-600 hover:text-white transition-all"
          >
            BACK TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Content */}
          <div>
            <div className="flex items-center gap-2 text-pink-500 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-black tracking-[0.3em] uppercase">Reserve Your Date</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic mb-8">
              LETS CREATE <br />
              <span className="text-white/20">HISTORY</span>
            </h1>
            <p className="text-zinc-400 text-xl max-w-md leading-relaxed mb-12">
              Our calendar fills up fast. Secure your wedding date with us and lets capture the magic.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5">
                  <Phone className="text-pink-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Call Us</p>
                  <p className="text-lg font-bold">+91 </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center border border-white/5">
                  <MapPin className="text-pink-500 w-5 h-5" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Studio</p>
                  <p className="text-lg font-bold">Pan India Service Avaliable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Glassmorphic Form */}
          <div className="relative">
            <div className="absolute -inset-4 bg-pink-600/20 blur-[100px] -z-10 rounded-full" />
            <form 
              onSubmit={handleSubmit}
              className="bg-zinc-900/50 backdrop-blur-3xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <User size={14} /> Full Name
                  </label>
                  <input 
                    required
                    type="text"
                    placeholder="Dharm Kuma"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Mail size={14} /> Email Address
                  </label>
                  <input 
                    required
                    type="email"
                    placeholder="dharm@example.com"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input 
                    required
                    type="tel"
                    placeholder="+91 ..."
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                    <Calendar size={14} /> Wedding Date
                  </label>
                  <input 
                    required
                    type="date"
                    className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              {/* Package Selection */}
              <div className="mt-6 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Select Package</label>
                <select 
                  className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all appearance-none"
                  onChange={(e) => setFormData({...formData, package: e.target.value})}
                >
                  <option value="Essential">Essential (₹49,999)</option>
                  <option value="Premium" selected>Premium (₹89,999)</option>
                  <option value="Deluxe">Deluxe (₹1,49,999)</option>
                </select>
              </div>

              {/* Message */}
              <div className="mt-6 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <MessageSquare size={14} /> Special Requests
                </label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about your dream wedding..."
                  className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-4 focus:border-pink-500 outline-none transition-all resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                disabled={loading}
                type="submit"
                className="w-full mt-8 bg-pink-600 py-5 rounded-2xl font-black text-lg tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>SEND BOOKING REQUEST <Send size={20} /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}