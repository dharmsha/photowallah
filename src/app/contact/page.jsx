'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, Container, Typography, Grid, Button, 
  TextField, Paper, Stack, IconButton 
} from '@mui/material';
import { 
  Mail, Phone, MapPin, Send, Instagram, 
  Twitter, Youtube, Linkedin, CheckCircle 
} from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  // Har object ko ek unique ID de di hai key ke liye
  const contactInfo = [
    { id: 'phone', icon: <Phone size={24} />, title: "Call Us", details: "+91 9835665318", sub: "Mon-Sat, 10am-7pm" },
    { id: 'email', icon: <Mail size={24} />, title: "Email Us", details: "hello@studio.com", sub: "24/7 Online Support" },
    { id: 'location', icon: <MapPin size={24} />, title: "Visit Us", details: "P&m Mall Patna", sub: "Bihar India, India" },
  ];

  const socials = [
    { id: 'ig', icon: <Instagram /> },
    { id: 'tw', icon: <Twitter /> },
    { id: 'yt', icon: <Youtube /> },
    { id: 'li', icon: <Linkedin /> }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0a0a0a', color: 'white', pt: 12, pb: 10 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" sx={{ color: '#ec4899', fontWeight: 'bold', letterSpacing: 3 }}>
              Get In Touch
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 1, mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              Let’s Capture <span style={{ color: '#ec4899' }}>Magic</span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500', maxWidth: '600px', mx: 'auto' }}>
              Have a project in mind? We&apos;d love to hear from you. Fill out the form below or reach out via our contact details.
            </Typography>
          </motion.div>
        </Box>

        <Grid container spacing={5}>
          {/* Contact Details Side */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              {contactInfo.map((info) => (
                <motion.div
                  key={info.id} // Fixed: Ab id use ho rahi hai index ki jagah
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 4, display: 'flex', gap: 3, alignItems: 'center' }}>
                    <Box sx={{ p: 2, bgcolor: 'rgba(236, 72, 153, 0.1)', borderRadius: 3, color: '#ec4899' }}>
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>{info.title}</Typography>
                      <Typography variant="body1" sx={{ color: 'grey.300' }}>{info.details}</Typography>
                      <Typography variant="caption" sx={{ color: 'grey.600' }}>{info.sub}</Typography>
                    </Box>
                  </Paper>
                </motion.div>
              ))}

              {/* Social Links */}
              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, color: 'grey.400' }}>Follow our journey:</Typography>
                <Stack direction="row" spacing={2}>
                  {socials.map((social) => (
                    <IconButton 
                      key={social.id} // Fixed: Unique key for social icons
                      sx={{ color: 'grey.500', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: '#ec4899', color: 'white' } }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Grid>

          {/* Form Side */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Paper sx={{ p: { xs: 3, md: 5 }, bgcolor: 'white', borderRadius: 6 }}>
                {formStatus === 'success' ? (
                  <Box sx={{ textAlign: 'center', py: 5 }}>
                    <CheckCircle size={64} color="#10b981" />
                    <Typography variant="h4" sx={{ color: '#0a0a0a', fontWeight: 'bold', mt: 2 }}>Message Sent!</Typography>
                    <Typography variant="body1" sx={{ color: 'grey.600', mt: 1 }}>We will get back to you within 24 hours.</Typography>
                    <Button onClick={() => setFormStatus('idle')} sx={{ mt: 3, color: '#ec4899' }}>Send another message</Button>
                  </Box>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Your Name" variant="outlined" required
                          InputProps={{ sx: { borderRadius: 3 } }}
                          sx={{ '& label': { color: '#666' } }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Email Address" variant="outlined" required type="email"
                          InputProps={{ sx: { borderRadius: 3 } }}
                          sx={{ '& label': { color: '#666' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Subject" variant="outlined"
                          InputProps={{ sx: { borderRadius: 3 } }}
                          sx={{ '& label': { color: '#666' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="How can we help?" variant="outlined" multiline rows={4} required
                          InputProps={{ sx: { borderRadius: 3 } }}
                          sx={{ '& label': { color: '#666' } }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          type="submit"
                          fullWidth 
                          variant="contained" 
                          size="large"
                          disabled={formStatus === 'sending'}
                          sx={{ 
                            py: 2, 
                            borderRadius: 3, 
                            bgcolor: '#ec4899', 
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#db2777' }
                          }}
                          endIcon={formStatus === 'sending' ? null : <Send size={20} />}
                        >
                          {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}