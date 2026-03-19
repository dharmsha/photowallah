'use client';

import { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  QrCode, 
  CheckCircle, 
  Shield, 
  Cloud, 
  Users,
  Camera,
  Heart,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function DownloadAppPage() {
  const [activeTab, setActiveTab] = useState<'android' | 'ios' | 'web'>('android');

  const features = [
    {
      icon: Camera,
      title: 'Live Photo Gallery',
      description: 'View and download your wedding photos instantly'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'All photos securely stored for 10 years'
    },
    {
      icon: Shield,
      title: 'Secure Access',
      description: 'End-to-end encrypted photo sharing'
    },
    {
      icon: Users,
      title: 'Family Sharing',
      description: 'Share access with family members'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10" />
        
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center space-x-2 bg-pink-100 text-pink-700 px-4 py-2 rounded-full mb-6">
                <Smartphone className="h-5 w-5" />
                <span className="font-medium">Mobile App Available</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                Your Wedding Memories
                <span className="block text-pink-600">In Your Pocket</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Download the VatsPhoto app to access your wedding photos, 
                manage bookings, and stay connected with your photographer.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('android')}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    activeTab === 'android'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Android
                </button>
                <button
                  onClick={() => setActiveTab('ios')}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    activeTab === 'ios'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  iOS
                </button>
                <button
                  onClick={() => setActiveTab('web')}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    activeTab === 'web'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Web App
                </button>
              </div>
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="relative">
              <div className="relative mx-auto max-w-sm">
                {/* Phone Frame */}
                <div className="relative bg-gray-900 rounded-[3rem] p-4 shadow-2xl">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
                  
                  {/* Screen */}
                  <div className="bg-gradient-to-b from-pink-50 to-white rounded-[2.5rem] overflow-hidden aspect-[9/19.5] relative">
                    {/* App Content */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-2">
                          <Camera className="h-6 w-6 text-pink-600" />
                          <span className="font-bold text-gray-800">DostPhoto</span>
                        </div>
                        <div className="text-xs text-gray-500">12:30 PM</div>
                      </div>
                      
                      {/* Hero Image */}
                      <div className="flex-1 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Heart className="h-16 w-16 text-white/30" />
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <div className="text-sm">Your Wedding</div>
                          <div className="text-xl font-bold">Gallery Ready</div>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-100 p-3 rounded-xl">
                          <div className="text-xs text-gray-500 mb-1">Photos</div>
                          <div className="text-lg font-bold">1,248</div>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-xl">
                          <div className="text-xs text-gray-500 mb-1">Downloads</div>
                          <div className="text-lg font-bold">456</div>
                        </div>
                      </div>
                      
                      {/* Button */}
                      <button className="bg-pink-600 text-white py-3 rounded-xl font-semibold">
                        View Gallery
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl">
                  <QrCode className="h-16 w-16" />
                  <div className="text-xs text-center mt-2 text-gray-600">Scan to Download</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our app makes managing your wedding photography experience seamless
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition">
                <div className="inline-flex p-3 bg-pink-100 rounded-xl mb-4">
                  <Icon className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              Download Now
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Android */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-500/20 rounded-xl mr-4">
                    <div className="text-2xl">🤖</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Android</h3>
                    <p className="text-gray-300">5.0 and above</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Free to download</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>100MB storage free</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Offline viewing</span>
                  </li>
                </ul>
                
                <a
                  href="https://play.google.com/store/apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download on Google Play
                </a>
                
                <div className="text-center mt-4 text-gray-400 text-sm">
                  QR Code for mobile
                </div>
              </div>
              
              {/* iOS */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-500/20 rounded-xl mr-4">
                    <div className="text-2xl">🍎</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">iOS</h3>
                    <p className="text-gray-300">iOS 13.0 and above</p>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Optimized for iPhone</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>Face ID/Touch ID login</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                    <span>iCloud integration</span>
                  </li>
                </ul>
                
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download on App Store
                </a>
                
                <div className="text-center mt-4 text-gray-400 text-sm">
                  Compatible with iPad
                </div>
              </div>
            </div>
            
            {/* Web App */}
            <div className="mt-8 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Use Web Version</h3>
                  <p className="mb-6">
                    Access all features directly in your browser. No download required.
                  </p>
                  <Link
                    href="/"
                    className="inline-flex items-center bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                  >
                    <span>Open Web App</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
                <div className="text-right">
                  <div className="inline-block p-4 bg-white/20 rounded-2xl">
                    <div className="text-4xl">🌐</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "Is the app free to use?",
              a: "Yes, the app is completely free to download and use. Some premium features may require in-app purchases."
            },
            {
              q: "Can I access my photos offline?",
              a: "Yes, you can download photos to view them offline anytime, anywhere."
            },
            {
              q: "How do I log in to the app?",
              a: "Use the same email and password you used to book our services. New users can create an account directly in the app."
            },
            {
              q: "Is my data secure?",
              a: "We use end-to-end encryption and follow industry best practices to keep your photos and data secure."
            }
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-gray-800 to-black text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Access Your Memories?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Download now and get instant access to your wedding photos, 
            booking details, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://play.google.com/store/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Android Download
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              iOS Download
            </a>
            <Link
              href="/"
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition"
            >
              Use Web Version
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}