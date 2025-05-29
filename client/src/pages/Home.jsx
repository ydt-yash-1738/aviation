import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { auth } = useContext(AuthContext);
    const isAuthenticated = auth !== null;

    return (
        <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center ">
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-[#03B7B7] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
                        <svg className="w-16 h-16 text-white pointer-events-none" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.5 19L3 20l8.5-5V22h1v-7l8.5 5 .5-1L13 12l9-7.5-.5-1-8.5 5V2h-1v7.5L3 3l-.5 1L11 12 2.5 19z" />
                  </svg>
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
                        {isAuthenticated ? `Welcome back, ${auth?.user.firstName || 'User'}!` : 'Welcome to Skyline Insurance'}
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
                                className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                Go to Dashboard
                            </Link>
                            <Link
                                to="/profile"
                                className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                            >
                                View Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="group relative px-6 py-2 bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-2 border-[#03B7B7] font-semibold text-white font-medium text-sm rounded-full transform hover:scale-105 transition-all duration-200 cursor-pointer"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/register"
                                className="group relative px-6 py-2 bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-2 border-[#03B7B7] font-semibold text-white font-medium text-sm rounded-full transform hover:scale-105 transition-all duration-200 cursor-pointer"
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