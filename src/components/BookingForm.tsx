'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { 
  Camera, Calendar, MapPin, Package, MessageSquare, 
  Upload, CheckCircle2, AlertCircle, Loader2, IndianRupee, QrCode 
} from 'lucide-react';

interface BookingFormData {
  name: string; email: string; phone: string;
  eventDate: string; eventType: string;
  venue: string; package: string; message: string;
}

export default function BookingForm() {
  const { user, loading: authLoading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<BookingFormData>();

  const selectedPkg = watch('package');

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshot(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!screenshot) {
      alert("Bhai, payment screenshot upload karna zaroori hai!");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload Screenshot to Firebase Storage
      const storageRef = ref(storage, `payments/${Date.now()}_${screenshot.name}`);
      const uploadTask = await uploadBytes(storageRef, screenshot);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // 2. Save Data to Firestore
      await addDoc(collection(db, 'bookings'), {
        ...data,
        userId: user?.uid || 'guest',
        paymentScreenshot: downloadURL,
        status: 'pending_verification',
        createdAt: serverTimestamp(),
      });

      alert('Zabardast! Booking request aur payment proof mil gaya hai. Hum jaldi contact karenge.');
      reset();
      setScreenshot(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert('Error! Kuch locha ho gaya, phir se try karo.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <div className="h-screen bg-black flex items-center justify-center text-white italic">Loading Form...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase">
            Secure Your <span className="text-pink-600">Date</span>
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-medium">
            Fill the details and complete the booking amount payment to confirm your slot.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-12 gap-10">
          
          {/* Left: Booking Details (8 Cols) */}
          <div className="lg:col-span-7 space-y-8 bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-xl">
            <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-widest text-pink-500">
              <Camera size={20}/> Event Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Full Name</label>
                <input {...register('name', { required: true })} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500 outline-none" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Phone</label>
                <input {...register('phone', { required: true })} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500 outline-none" placeholder="+91 ..." />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Event Date</label>
                <input type="date" {...register('eventDate', { required: true })} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Select Package</label>
                <select {...register('package', { required: true })} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500 outline-none appearance-none">
                  <option value="basic">Essential - ₹49,999</option>
                  <option value="premium">Premium - ₹89,999</option>
                  <option value="deluxe">Deluxe - ₹1,49,999</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Venue Details</label>
              <textarea {...register('venue')} className="w-full bg-black border border-white/10 rounded-2xl p-4 focus:border-pink-500 outline-none h-24 resize-none" placeholder="Enter full address of venue..."></textarea>
            </div>
          </div>

          {/* Right: Payment Sticky (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-pink-600 rounded-[2.5rem] p-8 sticky top-10 shadow-2xl shadow-pink-600/20">
              <h3 className="text-2xl font-black italic mb-6 flex items-center gap-2">
                <IndianRupee /> CONFIRM BOOKING
              </h3>
              
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold uppercase opacity-70 tracking-widest">Booking Amount</span>
                  <span className="text-2xl font-black italic">₹5,000</span>
                </div>
                <p className="text-[11px] font-medium leading-relaxed opacity-80">
                  Pay the advance amount via GPay/PhonePe to confirm your date. Remaining balance to be paid on event day.
                </p>
                
                {/* QR Code Placeholder */}
                <div className="mt-6 flex justify-center bg-white p-4 rounded-2xl">
                   <div className="text-black text-center">
                      <QrCode size={150} />
                      <p className="text-[10px] font-bold mt-2">UPI: yourname@okaxis</p>
                   </div>
                </div>
              </div>

              {/* Screenshot Upload Area */}
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Upload Payment Proof (Required)</span>
                  <div className={`mt-2 h-40 border-2 border-dashed border-white/30 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/5 transition-all overflow-hidden ${preview ? 'border-none' : ''}`}>
                    {preview ? (
                      <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                      <>
                        <Upload className="mb-2" />
                        <span className="text-xs font-bold">Drop Screenshot Here</span>
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                      </>
                    )}
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={submitting || !screenshot}
                  className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : 'SUBMIT & CONFIRM'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}