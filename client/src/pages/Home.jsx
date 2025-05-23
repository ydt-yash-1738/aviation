import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { auth } = useContext(AuthContext);
    const isAuthenticated = auth !== null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center ">
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
                        {isAuthenticated ? `Welcome back, ${auth?.username || 'User'}!` : 'Welcome to Skyline Insurance'}
                    </h1>
                    <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                        {
                            isAuthenticated
                                ? "You're successfully authenticated. Access your dashboard to manage Aviation Non-Owned Insurance submissions, quotes, and referrals securely."
                                : "Welcome to our secure portal for Aviation Non-Owned Insurance. Sign in to create quotes, manage submissions, and handle referral workflows with ease."
                        }

                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/intro"
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                View Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 transition-all duration-300 shadow-xl"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;