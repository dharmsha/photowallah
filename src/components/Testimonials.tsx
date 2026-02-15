'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Quote, Star, ChevronLeft, ChevronRight, Play, 
  Heart, Instagram, Sparkles, ArrowRight
} from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya & Rajesh',
    weddingDate: 'Dec 2023',
    venue: 'Taj Palace, Delhi',
    quote: "VatsStudio didn't just take pictures; they captured our soul. Every smile, every tear, and every laugh looks like a frame from a Bollywood movie. Professionalism at its peak!",
    rating: 5,
    photo: '/images/couples/couple1.jpg',
    featuredImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop',
    social: '@priya_rajesh',
  },
  {
    id: 2,
    name: 'Ananya & Vikram',
    weddingDate: 'Feb 2024',
    venue: 'Leela Palace, Mumbai',
    quote: "The team's energy was infectious! They made us feel like superstars. The output was way beyond our expectations. If you want magic, hire these guys!",
    rating: 5,
    photo: '/images/couples/couple2.jpg',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    social: '@ananya_vikram',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 bg-[#faf9f6] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-pink-50/50 -skew-x-12 translate-x-20 z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-pink-600 font-bold tracking-[0.3em] text-xs mb-3">
              <Sparkles size={16} /> CLIENT STORIES
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-zinc-900 leading-tight">
              Voices of <br /> <span className="italic text-pink-500">Pure Love</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-zinc-500 max-w-sm text-lg font-light leading-relaxed"
          >
            We dont just deliver galleries; we deliver the feeling of reliving your big day over and over.
          </motion.p>
        </div>

        {/* Main Experience Slider */}
        <div className="relative min-h-[600px] grid lg:grid-cols-12 gap-0 shadow-2xl rounded-[3rem] overflow-hidden bg-white border border-zinc-100">
          
          {/* Left: Image Canvas (7 Cols) */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-full overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={testimonials[index].featuredImage} 
                  alt="Wedding"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white">
                    <Play size={18} fill="currentColor" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-widest uppercase">Watch Film</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Content (5 Cols) */}
          <div className="lg:col-span-5 p-10 md:p-16 flex flex-col justify-center relative bg-white">
            <Quote className="text-pink-100 absolute top-10 right-10 w-32 h-32 -z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="relative z-10"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-2xl md:text-3xl font-serif italic text-zinc-800 leading-snug mb-8">
                  {testimonials[index].quote}
                </p>

                <div className="space-y-1 mb-10">
                  <h4 className="text-xl font-bold text-zinc-900">{testimonials[index].name}</h4>
                  <p className="text-pink-600 font-semibold text-sm tracking-wide">
                    {testimonials[index].venue} • {testimonials[index].weddingDate}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-zinc-100">
                  <div className="flex -space-x-3">
                    <button onClick={prev} className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all bg-white">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={next} className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-900 hover:text-white transition-all bg-white">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div className="h-[1px] flex-1 bg-zinc-100 mx-4" />
                  <span className="text-zinc-400 font-mono text-sm">
                    0{index + 1} / 0{testimonials.length}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Brand Trust Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="text-center font-serif text-xl font-bold text-zinc-400">WeddingWire</div>
          <div className="text-center font-serif text-xl font-bold text-zinc-400">VOGUE Wedding</div>
          <div className="text-center font-serif text-xl font-bold text-zinc-400">Zola</div>
          <div className="text-center font-serif text-xl font-bold text-zinc-400">Google Reviews</div>
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 bg-zinc-900 rounded-[3rem] p-12 text-center text-white overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <Heart className="mx-auto text-pink-500 mb-6 animate-pulse" size={40} />
          <h3 className="text-3xl md:text-5xl font-serif mb-6 italic">Want your story captured like this?</h3>
          <p className="text-zinc-400 mb-10 max-w-xl mx-auto">Limited slots for 2026. Lets talk about your dream wedding today.</p>
          <a href="/bookings" className="inline-flex items-center gap-3 bg-pink-600 hover:bg-white hover:text-black text-white px-10 py-5 rounded-full font-bold transition-all group">
            START YOUR JOURNEY <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}