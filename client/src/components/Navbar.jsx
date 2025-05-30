import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logout clicked');

    // Clear all localStorage related to quote/form data
    localStorage.removeItem('quickQuoteFormData');
    localStorage.removeItem('partialQuoteData');
    localStorage.removeItem('quoteRef');
    localStorage.removeItem('preQuoteFormData');
    localStorage.removeItem('completedQuoteData');
    localStorage.removeItem('savedQuoteRef');

    // Also clear any auth data if stored
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    logout(); 
    navigate('/login'); 
  };


  const isAuthenticated = auth !== null;

  return (
    <nav
      className="relative z-50 bg-[#144074] shadow-xl"
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
                <div className="w-10 h-10 bg-[#03B7B7] rounded-xl flex items-center justify-center shadow-lg transition-all duration-300">

                  <svg className="w-6 h-6 text-white pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.5 19L3 20l8.5-5V22h1v-7l8.5 5 .5-1L13 12l9-7.5-.5-1-8.5 5V2h-1v7.5L3 3l-.5 1L11 12 2.5 19z" />
                  </svg>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 pointer-events-none"></div>
              </div>
              <div className="hidden sm:block pointer-events-none">
                <h1 className="text-xl text-white font-bold">
                  Skyline Insurance
                </h1>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00CCFF] group-hover:w-full transition-all duration-300 pointer-events-none"></span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/intro"
                  className="text-white hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00CCFF] group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
                <Link
                  to="/retrievequote"
                  className="text-white hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Retrive a Quote
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00CCFF] group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00CCFF] group-hover:w-full transition-all duration-300 pointer-events-none"></span>
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
                  <div className="w-8 h-8 bg-[#03B7B7] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {auth?.user.firstName ? auth.user.firstName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white font-medium">
                      {auth?.user.firstName || 'User'}
                    </p>
                    <p className="text-xs text-white">
                      {auth?.user.email || 'Welcome back!'}
                    </p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="group relative px-6 py-2 bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-2 border-[#03B7B7] font-semibold text-white font-medium text-sm rounded-full transform hover:scale-105 transition-all duration-200 cursor-pointer"
                  type="button"
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
                  className="text-white hover:text-white px-4 py-2 text-sm font-medium transition-colors duration-200 relative group cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Register
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00CCFF] group-hover:w-full transition-all duration-300 pointer-events-none"></span>
                </Link>
                <Link
                  to="/login"
                  className="group relative px-6 py-2 bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-2 border-[#03B7B7] font-semibold text-white font-medium text-sm rounded-full transform hover:scale-105 transition-all duration-200 cursor-pointer"
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