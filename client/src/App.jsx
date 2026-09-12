import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AIAssistant from './components/common/AIAssistant';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PropertyListPage from './pages/PropertyListPage';
import PropertyDetailPage from './pages/PropertyDetailPage';

// Placeholder components for other routes
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-3xl font-display font-bold text-slate-800 dark:text-white mb-4">{title}</h1>
      <p className="text-slate-500 dark:text-slate-400">This page is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#faf9f6] dark:bg-slate-900">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/properties" element={<PropertyListPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/experiences" element={<PlaceholderPage title="Experiences" />} />
            <Route path="/about" element={<PlaceholderPage title="About Us" />} />
            <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/tenant" element={<DashboardPage />} />
            <Route path="/dashboard/landlord" element={<DashboardPage />} />
            <Route path="/dashboard/agent" element={<DashboardPage />} />
            <Route path="/add-property" element={<PlaceholderPage title="Add Property" />} />
            <Route path="/chat" element={<PlaceholderPage title="Chat" />} />
            <Route path="/bookings" element={<PlaceholderPage title="Bookings" />} />
          </Routes>
        </main>
        <Footer />
        <AIAssistant />
      </div>
    </AuthProvider>
  );
}

export default App;
