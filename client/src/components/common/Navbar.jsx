import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { unreadCount } = useSocket();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        HouseRent
      </Link>
      
      <div className="navbar-menu">
        <Link to="/properties" className="navbar-link">
          Properties
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/bookings" className="navbar-link">
              Bookings
            </Link>
            <Link to="/chat" className="navbar-link">
              Messages
              {unreadCount > 0 && (
                <span className="badge badge-danger" style={{ marginLeft: '4px' }}>
                  {unreadCount}
                </span>
              )}
            </Link>
            
            {user?.role === 'landlord' && (
              <Link to="/dashboard/landlord" className="navbar-link">
                Dashboard
              </Link>
            )}
            {user?.role === 'tenant' && (
              <Link to="/dashboard/tenant" className="navbar-link">
                Dashboard
              </Link>
            )}
            {user?.role === 'agent' && (
              <Link to="/dashboard/agent" className="navbar-link">
                Dashboard
              </Link>
            )}
            
            {(user?.role === 'landlord' || user?.role === 'agent') && (
              <Link to="/add-property" className="btn btn-primary">
                Add Property
              </Link>
            )}
            
            <div className="navbar-user" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.875rem' }}>{user?.name}</span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
