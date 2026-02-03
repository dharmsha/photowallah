'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  collection, 
  getDocs, 
  updateDoc, 
  doc, 
  deleteDoc,
  addDoc,
  Timestamp
} from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Types define karein
interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventDate: string;
  eventType: string;
  venue: string;
  package: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  userId?: string;
}

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  uploadedAt: Date;
}

export default function AdminPanel() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsData: Booking[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        bookingsData.push({
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          eventDate: data.eventDate || '',
          eventType: data.eventType || '',
          venue: data.venue || '',
          package: data.package || '',
          message: data.message,
          status: data.status || 'pending',
          createdAt: data.createdAt || Timestamp.now(),
          userId: data.userId,
        });
      });
      
      // Sort by date (newest first)
      bookingsData.sort((a, b) => 
        b.createdAt.toMillis() - a.createdAt.toMillis()
      );
      
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Booking['status']) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { 
        status,
        updatedAt: Timestamp.now() 
      });
      fetchBookings();
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    
    try {
      await deleteDoc(doc(db, 'bookings', id));
      fetchBookings();
      alert('Booking deleted successfully');
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('Failed to delete booking');
    }
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File validation
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid image file (JPEG, PNG, WebP)');
      return;
    }
    
    if (file.size > maxSize) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    try {
      // Upload to Firebase Storage
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      // Save to Firestore
      await addDoc(collection(db, 'gallery'), {
        url,
        title: `Wedding Photo ${new Date().toLocaleDateString()}`,
        category: 'wedding',
        uploadedAt: Timestamp.now(),
        fileName: file.name,
        fileSize: file.size,
        uploadedBy: user?.email,
      });
      
      alert('Photo uploaded successfully!');
      e.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading photo');
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600">Please login to access admin panel</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage bookings and upload photos</p>
        <div className="mt-4 text-sm text-gray-500">
          Logged in as: <span className="font-semibold">{user.email}</span>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Bookings Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Bookings</h2>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded transition disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></div>
              <p className="text-gray-600 mt-2">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No bookings found
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{booking.name}</h3>
                      <p className="text-sm text-gray-600">{booking.email}</p>
                      <p className="text-sm text-gray-600">{booking.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <select 
                        value={booking.status}
                        onChange={(e) => updateStatus(booking.id, e.target.value as Booking['status'])}
                        className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        title="Delete booking"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="font-medium">Event:</span> {booking.eventType}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {booking.eventDate}
                    </div>
                    <div>
                      <span className="font-medium">Venue:</span> {booking.venue}
                    </div>
                    <div>
                      <span className="font-medium">Package:</span> {booking.package}
                    </div>
                  </div>
                  
                  {booking.message && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <span className="font-medium">Message:</span> {booking.message}
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                    <span>Booking ID: {booking.id.substring(0, 8)}...</span>
                    <span>
                      Created: {booking.createdAt?.toDate().toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Upload Photos</h2>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-pink-400 transition">
              <input
                type="file"
                accept="image/jpeg, image/png, image/webp, image/jpg"
                onChange={uploadPhoto}
                disabled={uploading}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className={`cursor-pointer block ${uploading ? 'opacity-50' : ''}`}
              >
                <div className="text-5xl mb-4">📸</div>
                <p className="text-lg text-gray-700 mb-2">
                  {uploading ? 'Uploading...' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WebP (Max 10MB)
                </p>
              </label>
            </div>
            
            {/* Upload Progress */}
            {uploading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-pink-600 mr-2"></div>
                <span className="text-gray-600">Uploading photo...</span>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  disabled={uploading}
                  className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm transition disabled:opacity-50"
                >
                  Add Multiple Photos
                </button>
                <button
                  onClick={() => window.open('/gallery', '_blank')}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  View Gallery
                </button>
              </div>
            </div>
            
            {/* Upload Guidelines */}
            <div className="text-sm text-gray-600 space-y-2">
              <h4 className="font-medium text-gray-700">Guidelines:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Upload high-quality wedding photos</li>
                <li>Photos will be visible in the public gallery</li>
                <li>Add descriptive titles and categories later</li>
                <li>Keep file names relevant (e.g., couple-name-wedding.jpg)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-pink-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">
            {bookings.length}
          </div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">
            {bookings.filter(b => b.status === 'confirmed').length}
          </div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">
            {bookings.filter(b => b.status === 'completed').length}
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-800">
            {bookings.filter(b => b.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>
    </div>
  );
}