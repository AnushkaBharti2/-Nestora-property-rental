import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Compass, Settings, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const upcomingTrip = {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    title: 'Oceanfront Luxury Villa in Mumbai',
    location: 'Mumbai, India',
    checkIn: 'Oct 10, 2023',
    checkOut: 'Oct 15, 2023',
  };

  const sidebarLinks = [
    { name: 'My Trips', icon: Calendar, active: true },
    { name: 'Saved', icon: Compass, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt={user?.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-orange-500"
                />
                <h3 className="font-semibold text-lg text-slate-800 dark:text-white">{user?.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.name}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-all ${
                      link.active
                        ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-500'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.name}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <button
                onClick={logout}
                className="flex items-center gap-3 w-full px-4 py-3 mt-4 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Log out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Upcoming Trips */}
            <section>
              <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white mb-6">
                Upcoming Trips
              </h2>
              
              <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Image */}
                  <div className="aspect-square md:aspect-auto">
                    <img
                      src={upcomingTrip.image}
                      alt={upcomingTrip.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-orange-500 text-sm font-medium mb-2">
                        <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full">Upcoming</span>
                      </div>
                      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
                        {upcomingTrip.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-4">
                        <MapPin className="w-4 h-4" />
                        {upcomingTrip.location}
                      </div>

                      {/* Dates */}
                      <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Check-in</p>
                          <p className="font-semibold text-slate-800 dark:text-white">{upcomingTrip.checkIn}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Check-out</p>
                          <p className="font-semibold text-slate-800 dark:text-white">{upcomingTrip.checkOut}</p>
                        </div>
                      </div>
                    </div>

                    <button className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all">
                      Manage Booking
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Explore CTA */}
            <section>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 md:p-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      Ready for your next adventure?
                    </h3>
                    <p className="text-white/80">
                      Discover unique stays and experiences around the world
                    </p>
                  </div>
                  <Link
                    to="/"
                    className="shrink-0 px-8 py-4 bg-white text-orange-500 font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    Explore Properties
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
