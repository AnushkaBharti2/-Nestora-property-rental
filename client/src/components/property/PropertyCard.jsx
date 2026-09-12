import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Users, Bed, Bath } from 'lucide-react';
import { useState } from 'react';

export default function PropertyCard({ property }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    title,
    images,
    price,
    oldPrice,
    location,
    bedrooms,
    bathrooms,
    guests,
    rating,
    reviewsCount
  } = property;

  const mainImage = images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop';

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-800">{rating}</span>
            {reviewsCount && (
              <span className="text-xs text-slate-500">({reviewsCount})</span>
            )}
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-sm text-white">
          <span className="text-lg font-bold">₹{price.toLocaleString()}</span>
          {oldPrice && (
            <span className="text-sm text-slate-400 line-through ml-2">₹{oldPrice.toLocaleString()}</span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <Link to={`/property/${property.id}`} className="block group/link">
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-2 line-clamp-1 group-hover/link:text-orange-500 transition-colors">
            {title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{guests} guests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{bathrooms} baths</span>
          </div>
        </div>
      </div>
    </div>
  );
}
