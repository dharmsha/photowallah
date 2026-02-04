'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, X, ChevronLeft, ChevronRight, 
  ZoomIn, Heart, Download, Share2, Clock, Calendar,
  Instagram, Facebook, Twitter, Mail
} from 'lucide-react';

// Sample gallery data
const galleryImages = [
  {
    id: 1,
    src: '/images/wedding-1.jpg',
    category: 'wedding',
    title: 'Royal Wedding',
    description: 'Traditional Indian wedding ceremony',
    likes: 234,
    date: '2024-01-15',
    tags: ['wedding', 'traditional', 'bride', 'groom']
  },
  {
    id: 2,
    src: '/images/portrait-1.jpg',
    category: 'portrait',
    title: 'Urban Portrait',
    description: 'Modern portrait in cityscape',
    likes: 189,
    date: '2024-01-10',
    tags: ['portrait', 'urban', 'model']
  },
  {
    id: 3,
    src: '/images/fashion-1.jpg',
    category: 'fashion',
    title: 'Fashion Editorial',
    description: 'High fashion photoshoot',
    likes: 312,
    date: '2024-01-05',
    tags: ['fashion', 'editorial', 'style']
  },
  {
    id: 4,
    src: '/images/maternity-1.jpg',
    category: 'maternity',
    title: 'Motherhood Bliss',
    description: 'Maternity photoshoot in nature',
    likes: 278,
    date: '2024-01-01',
    tags: ['maternity', 'mother', 'nature']
  },
  {
    id: 5,
    src: '/images/newborn-1.jpg',
    category: 'newborn',
    title: 'Tiny Blessings',
    description: 'Newborn baby photos',
    likes: 421,
    date: '2023-12-25',
    tags: ['newborn', 'baby', 'innocent']
  },
  {
    id: 6,
    src: '/images/product-1.jpg',
    category: 'product',
    title: 'Product Showcase',
    description: 'Professional product photography',
    likes: 156,
    date: '2023-12-20',
    tags: ['product', 'commercial', 'branding']
  },
  {
    id: 7,
    src: '/images/event-1.jpg',
    category: 'event',
    title: 'Corporate Event',
    description: 'Annual corporate event coverage',
    likes: 198,
    date: '2023-12-15',
    tags: ['event', 'corporate', 'business']
  },
  {
    id: 8,
    src: '/images/couple-1.jpg',
    category: 'couple',
    title: 'Romantic Sunset',
    description: 'Couple photoshoot at beach',
    likes: 345,
    date: '2023-12-10',
    tags: ['couple', 'romantic', 'sunset']
  },
  {
    id: 9,
    src: '/images/family-1.jpg',
    category: 'family',
    title: 'Family Moments',
    description: 'Family portrait session',
    likes: 267,
    date: '2023-12-05',
    tags: ['family', 'portrait', 'love']
  },
];

const categories = [
  'all',
  'wedding',
  'portrait',
  'fashion',
  'maternity',
  'newborn',
  'product',
  'event',
  'couple',
  'family'
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [likedImages, setLikedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  
  const galleryRef = useRef(null);

  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = filteredImages.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(filteredImages.length / imagesPerPage);

  // Like/Unlike functionality
  const toggleLike = (imageId) => {
    if (likedImages.includes(imageId)) {
      setLikedImages(likedImages.filter(id => id !== imageId));
    } else {
      setLikedImages([...likedImages, imageId]);
    }
  };

  // Lightbox navigation
  const navigateLightbox = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  // Auto-scroll animation for categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage(prev => prev === totalPages ? 1 : prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalPages]);

  // Share functionality
  const handleShare = (image) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 animate-pulse"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-16 text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-6">
            GALLERY
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our stunning collection of photographs. Each image tells a unique story, 
            capturing moments that last forever.
          </p>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search images by title, description or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Categories Filter */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="wait">
            {currentImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image Container */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
                
                {/* Mock Image (Replace with actual Image component) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/30">
                    {image.category.toUpperCase()}
                  </span>
                </div>
                
                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{image.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {image.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(image.id);
                          }}
                          className="flex items-center space-x-1 text-gray-300 hover:text-pink-500 transition"
                        >
                          <Heart className={`h-5 w-5 ${likedImages.includes(image.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
                          <span>{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                        </button>
                        
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Calendar className="h-4 w-4" />
                          <span className="text-xs">{image.date}</span>
                        </div>
                      </div>
                      
                      <button className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Like Button Corner */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(image.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 rounded-full backdrop-blur-sm group/like"
                >
                  <Heart className={`h-5 w-5 transition-all ${
                    likedImages.includes(image.id) 
                      ? 'fill-pink-500 text-pink-500 scale-110' 
                      : 'text-white group-hover/like:scale-110'
                  }`} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-4 mt-12"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-full font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Total Photos', value: '500+', icon: '📸' },
            { label: 'Happy Clients', value: '200+', icon: '😊' },
            { label: 'Years Experience', value: '5+', icon: '⭐' },
            { label: 'Cities Covered', value: '15+', icon: '🌍' },
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-pink-500/30 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Want Your Photos in Our Gallery?
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Book a photoshoot with us and get a chance to feature your photos in our exclusive gallery.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all"
          >
            Book a Shoot
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            View Packages
          </motion.button>
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[1000] flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-3 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition"
              >
                <X className="h-6 w-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
              
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-4 bg-black/50 rounded-full backdrop-blur-sm hover:bg-black/70 transition"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Lightbox Content */}
              <div className="h-full flex flex-col lg:flex-row">
                {/* Image Side */}
                <div className="lg:w-2/3 h-64 lg:h-auto bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-6xl font-bold text-white/30">
                    {selectedImage.category.toUpperCase()}
                  </div>
                </div>

                {/* Details Side */}
                <div className="lg:w-1/3 p-8 overflow-y-auto">
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedImage.title}</h2>
                  <p className="text-gray-300 mb-6">{selectedImage.description}</p>
                  
                  <div className="space-y-6">
                    {/* Metadata */}
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-400">
                        <Calendar className="h-5 w-5 mr-3" />
                        <span>Date: {selectedImage.date}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <Heart className="h-5 w-5 mr-3" />
                        <span>Likes: {selectedImage.likes + (likedImages.includes(selectedImage.id) ? 1 : 0)}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedImage.tags.map(tag => (
                          <span key={tag} className="px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-6">
                      <button
                        onClick={() => toggleLike(selectedImage.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
                      >
                        <Heart className={`h-5 w-5 ${likedImages.includes(selectedImage.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
                        <span>Like</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition">
                        <Download className="h-5 w-5" />
                        <span>Download</span>
                      </button>
                      <button
                        onClick={() => handleShare(selectedImage)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
                      >
                        <Share2 className="h-5 w-5" />
                        <span>Share</span>
                      </button>
                    </div>

                    {/* Social Share */}
                    <div className="pt-6 border-t border-white/10">
                      <h4 className="text-white font-semibold mb-3">Share On</h4>
                      <div className="flex gap-3">
                        {[
                          { icon: Instagram, color: 'bg-gradient-to-br from-purple-600 to-pink-600' },
                          { icon: Facebook, color: 'bg-blue-600' },
                          { icon: Twitter, color: 'bg-sky-500' },
                          { icon: Mail, color: 'bg-gray-600' },
                        ].map((social) => (
                          <button
                            key={social.icon.name}
                            className={`p-3 rounded-xl ${social.color} text-white hover:opacity-90 transition`}
                          >
                            <social.icon className="h-5 w-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}