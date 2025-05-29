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
                        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
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