
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import PropertyCard from '../components/property/PropertyCard';

// Mock properties data
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Oceanfront Luxury Villa in Mumbai',
    price: 8000,
    oldPrice: 10000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'],
    rating: 4.92,
    reviewsCount: 124,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
  {
    id: 2,
    title: 'Modern View Apartments',
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
    title: 'Historical Bender Family Villas',
    price: 20000,
    oldPrice: 25000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'],
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
    images: ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'],
    rating: 5.0,
    reviewsCount: 203,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
  },
  {
    id: 6,
    title: 'Cozy Studio in Andheri',
    price: 5000,
    oldPrice: 6500,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    rating: 4.5,
    reviewsCount: 45,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
  },
  {
    id: 7,
    title: 'Luxury Flat in Bandra',
    price: 15000,
    oldPrice: 18000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'],
    rating: 4.85,
    reviewsCount: 112,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
  },
  {
    id: 8,
    title: 'Garden View Row House',
    price: 12000,
    oldPrice: 15000,
    location: 'Mumbai, India',
    images: ['https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'],
    rating: 4.75,
    reviewsCount: 78,
    bedrooms: 3,
    bathrooms: 2,
    guests: 5,
  },
];

const PROPERTY_TYPES = ['All', 'Apartment', 'Villa', 'House', 'Penthouse', 'Studio'];
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹5,000', min: 0, max: 5000 },
  { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: Infinity },
];

export default function PropertyListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProperties = MOCK_PROPERTIES.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || property.title.toLowerCase().includes(selectedType.toLowerCase());
    const priceRange = PRICE_RANGES[selectedPriceRange];
    const matchesPrice = property.price >= priceRange.min && property.price <= priceRange.max;
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-900">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Discover {MOCK_PROPERTIES.length} properties across Mumbai
          </p>

          {/* Search Bar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location or property name..."
                className="w-full pl-12 pr-4 py-3 bg-transparent border-0 focus:outline-none text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
            <div className="h-px md:h-auto md:w-px bg-slate-200 dark:bg-slate-700"></div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="md:hidden">Filters</span>
            </button>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-white">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Property Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedType === type
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Price Range (per night)
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRICE_RANGES.map((range, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPriceRange(idx)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedPriceRange === idx
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing <span className="font-semibold text-slate-800 dark:text-white">{filteredProperties.length}</span> properties
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
              No properties found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedType('All');
                setSelectedPriceRange(0);
              }}
              className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

