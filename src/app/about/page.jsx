'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Box, Container, Typography, Grid, Button, 
  Tabs, Tab, Paper, Avatar, IconButton, Modal 
} from '@mui/material';
import {
  Camera, Award, Users, Star, Heart, Sparkles,
  Target, Zap, Globe, Trophy, Instagram, 
  Twitter, Youtube, MapPin, Clock, CheckCircle, 
  Play, ChevronRight, User, Linkedin, X, Calendar, BookOpen, Eye, Shield, Gift
} from 'lucide-react';

// Team members and other data remains the same...
const teamMembers = [
  { id: 1, name: 'Rajesh Kumar', role: 'Lead Photographer', experience: '8 Years', specialty: 'Wedding & Portrait', quote: 'Every photograph tells a story, I just help capture it.', social: { instagram: '#', twitter: '#' } },
  { id: 2, name: 'Priya Sharma', role: 'Creative Director', experience: '6 Years', specialty: 'Fashion & Editorial', quote: 'Light is everything in photography.', social: { instagram: '#', linkedin: '#' } },
  { id: 3, name: 'Amit Patel', role: 'Videographer', experience: '5 Years', specialty: 'Cinematic Videos', quote: 'Motion creates emotion.', social: { youtube: '#', instagram: '#' } },
  { id: 4, name: 'Neha Singh', role: 'Editor', experience: '4 Years', specialty: 'Photo Editing', quote: 'The magic happens in post-production.', social: { instagram: '#' } },
];

// Static positions for floating circles (Math.random() replacement)
const bubblePositions = [
  { top: '10%', left: '15%', size: 120 }, { top: '20%', left: '75%', size: 80 },
  { top: '60%', left: '10%', size: 150 }, { top: '80%', left: '85%', size: 100 },
  { top: '40%', left: '50%', size: 60 }, { top: '15%', left: '40%', size: 90 }
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', color: 'white', pt: 10 }}>
      
      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Replace Math.random() with Static Bubbles */}
        {bubblePositions.map((pos, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(168, 85, 247, 0.1))',
              width: pos.size,
              height: pos.size,
              top: pos.top,
              left: pos.left,
            }}
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <Container maxWidth="lg" sx={{ textAlign: 'center', zIndex: 1 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: 'rgba(255,255,255,0.05)', mx: 'auto', mb: 4, border: '1px solid rgba(255,255,255,0.1)' }}>
              <Camera size={48} color="#ec4899" />
            </Avatar>
          </motion.div>

          <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', md: '6rem' }, mb: 2, background: 'linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            OUR STORY
          </Typography>

          <Typography variant="h5" sx={{ color: 'grey.400', maxWidth: '800px', mx: 'auto', mb: 5 }}>
            We do not just take pictures. We capture emotions, tell stories, and create memories that last forever.
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" sx={{ borderRadius: 50, px: 4, py: 1.5, bgcolor: '#ec4899', '&:hover': { bgcolor: '#db2777' } }} endIcon={<ChevronRight />}>
              Explore Work
            </Button>
            <Button variant="outlined" size="large" onClick={() => setIsVideoPlaying(true)} sx={{ borderRadius: 50, px: 4, py: 1.5, color: 'white', borderColor: 'rgba(255,255,255,0.3)' }} startIcon={<Play />}>
              Watch Story
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section with MUI Grid */}
      <Container sx={{ py: 10 }}>
        <Grid container spacing={4} justifyContent="center">
          {[
            { label: 'Happy Clients', val: '500+', icon: Users },
            { label: 'Projects', val: '1000+', icon: Camera },
            { label: 'Awards', val: '50+', icon: Trophy }
          ].map((stat, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.03)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                <stat.icon color="#ec4899" style={{ marginBottom: '10px' }} />
                <Typography variant="h4" fontWeight="bold">{stat.val}</Typography>
                <Typography variant="body2" color="grey.500">{stat.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Tabs Section with MUI Tabs */}
      <Container sx={{ py: 10 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'rgba(255,255,255,0.1)', mb: 4 }}>
          <Tabs value={activeTab} onChange={handleTabChange} centered textColor="inherit" TabIndicatorProps={{ style: { background: '#ec4899' } }}>
            <Tab icon={<BookOpen size={20}/>} iconPosition="start" label="Story" sx={{ color: 'grey.500' }} />
            <Tab icon={<Target size={20}/>} iconPosition="start" label="Mission" sx={{ color: 'grey.500' }} />
            <Tab icon={<Zap size={20}/>} iconPosition="start" label="Process" sx={{ color: 'grey.500' }} />
          </Tabs>
        </Box>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 0 && (
              <Grid container spacing={6} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" fontWeight="bold" gutterBottom>From Passion to Profession</Typography>
                  <Typography variant="body1" sx={{ color: 'grey.400', mb: 3 }}>
                    Our journey began in 2018 with a single camera and a dream to capture emotions authentically.
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    {['Founded by Rajesh Kumar', '15+ Professional Team', 'International Projects'].map((text, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <CheckCircle size={18} color="#10b981" />
                        <Typography variant="body2">{text}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: 'relative', borderRadius: 8, overflow: 'hidden', bgcolor: '#1a1a1a', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <Camera size={80} opacity={0.1} />
                     <Box sx={{ position: 'absolute', bottom: 20, left: 20, bgcolor: '#ec4899', p: 2, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold">5+ Years</Typography>
                        <Typography variant="caption">Excellence</Typography>
                     </Box>
                  </Box>
                </Grid>
              </Grid>
            )}
            {/* Mission and Process tabs content can be mapped similarly */}
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Video Modal with MUI Modal */}
      <Modal open={isVideoPlaying} onClose={() => setIsVideoPlaying(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ position: 'relative', width: '90%', maxWidth: '900px', bgcolor: 'black', borderRadius: 4, overflow: 'hidden', boxShadow: 24 }}>
          <IconButton onClick={() => setIsVideoPlaying(false)} sx={{ position: 'absolute', top: 10, right: 10, color: 'white', zIndex: 10 }}>
            <X />
          </IconButton>
          <Box sx={{ aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, #1a1a1a, #000)' }}>
            <Play size={64} color="rgba(255,255,255,0.2)" />
            <Typography variant="h6" sx={{ mt: 2, color: 'grey.600' }}>Video Coming Soon</Typography>
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}