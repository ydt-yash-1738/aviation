import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
 
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logout clicked');
    logout();
    navigate('/login');
  };

  const isAuthenticated = auth !== null;

  return (
    <nav 
      className="relative z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl border-b border-purple-500/20"
      style={{ position: 'relative', zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-3 group cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                  {/* <svg className="w-6 h-6 text-white pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg> */}
                  <svg className="w-6 h-6 text-white pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
  <path d="M2.5 19L3 20l8.5-5V22h1v-7l8.5 5 .5-1L13 12l9-7.5-.5-1-8.5 5V2h-1v7.5L3 3l-.5 1L11 12 2.5 19z"/>
</svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 pointer-events-none"></div>
              </div>
              <div className="hidden sm:block pointer-events-none">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  Skyline Insurance
                </h1>
                <p className="text-xs text-purple-300/70 -mt-1">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300 pointer-events-none"></span>
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/intro" 
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
                <Link 
                  to="/profile" 
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-3 pointer-events-none">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {auth?.user.firstName ? auth.user.firstName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">
                      {auth?.user.firstName || 'User'}
                    </p>
                    <p className="text-xs text-purple-300">
                      {auth?.user.email || 'Welcome back!'}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button 
                  onClick={handleLogout} 
                  className="group relative px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium text-sm rounded-full hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25 cursor-pointer"
                  type="button"
                  style={{ border: 'none', outline: 'none' }}
                >
                  <span className="flex items-center space-x-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Sign Out</span>
                  </span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/register" 
                  className="text-purple-300 hover:text-white px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Register
                </Link>
                <Link 
                  to="/login" 
                  className="group relative px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-medium text-sm rounded-full hover:from-purple-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="flex items-center space-x-2 pointer-events-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <span>Login</span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;