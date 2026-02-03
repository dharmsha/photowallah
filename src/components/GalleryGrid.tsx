'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import { RefreshCw } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  category: string;
  title: string;
  description: string;
}

export default function GalleryGrid() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback se function memoize karein
  const fetchPhotos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const querySnapshot = await getDocs(collection(db, 'gallery'));
      const photosData: Photo[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        photosData.push({
          id: doc.id,
          url: data.url || '',
          category: data.category || 'uncategorized',
          title: data.title || 'Untitled',
          description: data.description || '',
        });
      });
      setPhotos(photosData);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Failed to load gallery. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]); // fetchPhotos dependency mein add karein

  const filteredPhotos = category === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === category);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchPhotos}
          className="flex items-center justify-center space-x-2 mx-auto bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center space-x-4 mb-8">
          {['all', 'pre-wedding', 'wedding', 'reception', 'portraits'].map((cat) => (
            <div
              key={cat}
              className="px-4 py-2 rounded-full bg-gray-200 animate-pulse"
            >
              <span className="invisible">{cat}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-2">
        {['all', 'pre-wedding', 'wedding', 'reception', 'portraits'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full capitalize transition-all duration-200 ${
              category === cat 
                ? 'bg-pink-600 text-white shadow-lg' 
                : 'bg-gray-100 hover:bg-gray-200 hover:shadow'
            }`}
          >
            {cat.replace('-', ' ')}
          </button>
        ))}
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📷</div>
          <p className="text-gray-600">No photos found in this category</p>
          <button
            onClick={() => setCategory('all')}
            className="mt-4 text-pink-600 hover:text-pink-700 font-medium"
          >
            View all photos
          </button>
        </div>
      ) : (
        <>
          <div className="text-sm text-gray-500 mb-4 text-center">
            Showing {filteredPhotos.length} of {photos.length} photos
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map((photo) => (
              <div 
                key={photo.id} 
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition duration-300">
                  <h3 className="font-bold text-lg mb-1">{photo.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{photo.description}</p>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {photo.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}