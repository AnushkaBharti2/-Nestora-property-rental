
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Star, Calendar, Users, Bed, Bath, ChevronLeft, ChevronRight, Wifi, Car, Utensils, Tv, AirVent, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock property data
const MOCK_PROPERTY = {
  id: 1,
  title: 'Oceanfront Luxury Villa in Mumbai',
  price: 8000,
  oldPrice: 10000,
  location: 'Marine Drive, Mumbai, India',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=900&fit=crop',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1600573472591-ee6c8e695481?w=400&h=400&fit=crop',
  ],
  description: 'Experience luxury living with stunning ocean views. This spacious villa features modern amenities, a private pool, and is located in the heart of Mumbai. Perfect for families or groups looking for a premium stay. The property boasts high ceilings, premium furnishings, and breathtaking views of the Arabian Sea.',
  rating: 4.92,
  reviewsCount: 124,
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  sqft: 2500,
  propertyType: 'Villa',
  amenities: ['Wifi', 'Parking', 'Kitchen', 'TV', 'AC', 'Hot Tub'],
  host: {
    name: 'Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    responseTime: 'Within an hour',
    responseRate: '98%',
  },
  reviews: [
    { id: 1, user: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5, text: 'Absolutely stunning property! The views were breathtaking and the host was incredibly accommodating.', date: 'January 2026' },
    { id: 2, user: 'James K.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', rating: 5, text: 'Perfect location and amazing host. Would definitely return!', date: 'December 2025' },
    { id: 3, user: 'Priya S.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5, text: 'Luxury at its best. Everything was spotless and well-maintained.', date: 'December 2025' },
  ],
};

const AMENITY_ICONS = {
  'Wifi': Wifi,
  'Parking': Car,
  'Kitchen': Utensils,
  'TV': Tv,
  'AC': AirVent,
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const property = MOCK_PROPERTY;
  const mainImages = property.images;
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
      {/* Image Gallery */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Properties</span>
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 rounded-3xl overflow-hidden h-[400px] lg:h-[500px]">
            {/* Main Image */}
            <div className="lg:col-span-2 relative group">
              <img
                src={mainImage}
                alt={property.title}
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

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:grid grid-rows-2 gap-2">
              {thumbnails.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx + 1)}
                  className="relative rounded-2xl overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`View ${idx + 2}`}
                    className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Location */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-sm font-medium rounded-full mb-2">
                    {property.propertyType}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-800 dark:text-white mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-800 dark:text-white">{property.rating}</span>
                  <span className="text-slate-500 dark:text-slate-400">({property.reviewsCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div className="flex items-center gap-6 py-6 border-y border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-slate-800 dark:text-white">{property.guests} guests</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-slate-800 dark:text-white">{property.bedrooms} bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="w-5 h-5 text-orange-500" />
                <span className="font-medium text-slate-800 dark:text-white">{property.bathrooms} bathrooms</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">About this place</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity) => {
                  const Icon = AMENITY_ICONS[amenity] || Check;
                  return (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                    >
                      <Icon className="w-5 h-5 text-orange-500" />
                      <span className="font-medium text-slate-700 dark:text-slate-300">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Host Info */}
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4">Hosted by {property.host.name}</h2>
              <div className="flex items-center gap-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                />
                <div>
                  <p className="font-medium text-slate-800 dark:text-white">Response time: {property.host.responseTime}</p>
                  <p className="text-slate-500 dark:text-slate-400">Response rate: {property.host.responseRate}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                  {property.rating} · {property.reviewsCount} Reviews
                </h2>
              </div>
              <div className="space-y-4">
                {property.reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">{review.user}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="glass rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-end justify-between mb-6">
                  <div>
                    <span className="text-2xl md:text-3xl font-bold text-orange-500">
                      ₹{property.price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400"> / night</span>
                  </div>
                  {property.oldPrice && (
                    <span className="text-lg text-slate-400 line-through">
                      ₹{property.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
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
                </div>

                {/* Book Button */}
                <Link
                  to={isAuthenticated ? '/dashboard' : '/login'}
                  className="block w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all text-center"
                >
                  {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                </Link>

                <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

