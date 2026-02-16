'use client';


import { useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stack,
  Avatar,
  Divider
} from '@mui/material';
import {
  PhotoCamera,
  LocalShipping,
  Schedule,
  Videocam,
  Star
} from '@mui/icons-material';

export default function HeroSection() {
  const videoRef = useRef(null);

  return (
    <Box component="section" sx={{ position: 'relative', minHeight: '100vh', bgcolor: '#000', color: '#fff' }}>
      
      {/* Background Video */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        >
          <source src="/weeding.mp4" type="video/mp4" />
        </video>
        {/* Modern Dark Gradient - Bottom Se Black Glow */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'linear-gradient(to top, #000 10%, transparent 100%)' 
        }} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 15, md: 20 }, pb: 8 }}>
        
        {/* Main Content Layout - Flexbox */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 6,
          alignItems: 'center' // Content ko center mein rakhne ke liye
        }}>
          
          {/* Left Side: Artist Profile Card (Sirf Ye Rakha Hai) */}
          <Box sx={{ flex: 1, maxWidth: { md: '450px' } }}>
            <Paper sx={{ 
              p: 4,
              bgcolor: 'rgba(255, 255, 255, 0.03)', 
              backdropFilter: 'blur(25px)', 
              borderRadius: '40px',
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}>
              <Stack spacing={3} alignItems="center">
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    border: '4px solid #fff', 
                    boxShadow: '0 0 30px rgba(255,255,255,0.1)' 
                  }} 
                  src="/kundan.jpg" 
                />
                
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px', mb: 0.5 }}>
                    Kundan Vats
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                    Lead Cinematographer
                  </Typography>
                </Box>

                <Stack direction="row" spacing={0.5}>
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} sx={{ fontSize: 20, color: '#FFD700' }} />
                  ))}
                </Stack>

                <Divider sx={{ width: '60%', borderColor: 'rgba(255,255,255,0.1)' }} />

                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', lineHeight: 1.6 }}>
                  Turning your special moments into a timeless cinematic experience.
                </Typography>
              </Stack>
            </Paper>
          </Box>

          {/* Right Side: Ab Khali Hai (Yahan Video Clear Dikhegi) */}
          <Box sx={{ flex: 1.2 }} />

        </Box>

        {/* Bottom Features - Super Clean UI */}
        <Box sx={{ 
          mt: 12,
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,
          justifyContent: { xs: 'center', md: 'flex-start' }
        }}>
          {[
            { icon: <Videocam />, title: '4K Cinematic' },
            { icon: <PhotoCamera />, title: 'Unlimited Clicks' },
            { icon: <LocalShipping />, title: '15 Days Delivery' },
            { icon: <Schedule />, title: '24/7 Support' },
          ].map((item, i) => (
            <Box 
              key={i}
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                borderRadius: '20px',
                bgcolor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                minWidth: '200px',
                transition: '0.3s',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.07)', transform: 'translateY(-3px)' }
              }}
            >
              <Box sx={{ color: '#fff', opacity: 0.8 }}>{item.icon}</Box>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff' }}>{item.title}</Typography>
            </Box>
          ))}
        </Box>

      </Container>
    </Box>
  );
}