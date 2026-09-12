import { useState } from 'react';
import { Heart, MapPin, Star, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';

// Mock data
const MAIN_PROPERTY = {
  id: 1,
  title: 'Oceanfront Luxury Villa in Mumbai',
  price: 8000,
  location: 'Mumbai, India',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600573472591-ee6c8e695481?w=400&h=400&fit=crop',
  ],
  description: 'Experience luxury living with stunning ocean views. This spacious villa features modern amenities, a private pool, and is located in the heart of Mumbai. Perfect for families or groups looking for a premium stay.',
  rating: 4.92,
  reviewsCount: 124,
  reviews: [
    { id: 1, user: 'Sarah M.', rating: 5, text: 'Absolutely stunning property! The views were breathtaking.' },
    { id: 2, user: 'James K.', rating: 5, text: 'Perfect location and amazing host. Would definitely return!' },
    { id: 3, user: 'Priya S.', rating: 5, text: 'Luxury at its best. Everything was spotless and well-maintained.' },
  ],
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
};

const MORE_PROPERTIES = [
  {
    id: 2,
    title: 'Modern view apartments',
    price: 10000,
    oldPrice: 12500,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'],
    rating: 4.8,
    reviewsCount: 89,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
  },
  {
    id: 3,
    title: 'Historical Bender family villas',
    price: 20000,
    oldPrice: 25000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'],
    rating: 4.9,
    reviewsCount: 156,
    bedrooms: 5,
    bathrooms: 4,
    guests: 10,
  },
  {
    id: 4,
    title: 'Bubba Beach Pet House',
    price: 7000,
    oldPrice: 9000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop'],
    rating: 4.7,
    reviewsCount: 67,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: 5,
    title: 'Ocean Breeze Penthouse',
    price: 25000,
    oldPrice: 30000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewsCount: 203,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
];

export default function HomePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const mainImages = MAIN_PROPERTY.images;
  const mainImage = mainImages[selectedImageIndex];
  const thumbnails = mainImages.slice(1, 5);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % mainImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + mainImages.length) % mainImages.length);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-900">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={mainImage}
                alt={MAIN_PROPERTY.title}
                className="w-full h-full object-cover"
              />
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 transition-colors ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
                  }`}
                />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx + 1)}
                  className={`relative aspect-square rounded-2xl overflow-hidden shadow-md transition-all ${
                    selectedImageIndex === idx + 1
                      ? 'ring-4 ring-orange-500 ring-offset-2'
                      : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 2}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Property Details */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white mb-2">
                {MAIN_PROPERTY.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-2xl md:text-3xl font-bold text-orange-500">
                  ₹{MAIN_PROPERTY.price.toLocaleString()}
                </span>
                <span className="text-slate-500 dark:text-slate-400">/ night</span>
              </div>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-medium">
                <MapPin className="w-4 h-4 text-orange-500" />
                {MAIN_PROPERTY.location}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold text-slate-800 dark:text-white mb-2">About this space</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {MAIN_PROPERTY.description}
              </p>
            </div>

            {/* Booking Card - Glassmorphism */}
            <div className="glass rounded-3xl p-6 shadow-xl">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Book your stay</h3>
              
              <div className="space-y-4">
                {/* Check-in/Check-out */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Guests
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Book Now Button */}
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all duration-300">
                  Book Now
                </button>
              </div>
            </div>

            {/* Reviews Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(MAIN_PROPERTY.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-800 dark:text-white">{MAIN_PROPERTY.rating}</span>
                <span className="text-slate-500 dark:text-slate-400">({MAIN_PROPERTY.reviewsCount} reviews)</span>
              </div>

              {/* Review Cards */}
              <div className="space-y-2">
                {MAIN_PROPERTY.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-md"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-semibold text-sm">
                        {review.user.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-800 dark:text-white">{review.user}</span>
                      <div className="flex ml-auto">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Properties Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white">
              More Properties available in Mumbai
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MORE_PROPERTIES.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
