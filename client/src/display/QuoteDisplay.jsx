import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuoteDisplay = () => {
    const navigate = useNavigate();
    const [quoteData, setQuoteData] = useState(null);
    const [quoteRef, setQuoteRef] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load saved quote data
        const savedQuoteData = localStorage.getItem('completedQuoteData');
        const savedQuoteRef = localStorage.getItem('savedQuoteRef');
        
        if (savedQuoteData && savedQuoteRef) {
            try {
                const parsedData = JSON.parse(savedQuoteData);
                setQuoteData(parsedData);
                setQuoteRef(savedQuoteRef);
            } catch (error) {
                console.error('Error loading quote data:', error);
            }
        }
        
        setLoading(false);
    }, []);

    const handleBack = () => {
        navigate('/quote/pre');
    };

    const handleNewQuote = () => {
        // Clear stored data and start fresh
        localStorage.removeItem('completedQuoteData');
        localStorage.removeItem('savedQuoteRef');
        localStorage.removeItem('preQuoteFormData');
        localStorage.removeItem('partialQuoteData');
        navigate('/quote/quick');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-xl">Loading quote...</div>
            </div>
        );
    }

    if (!quoteData) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
                <div className="relative z-10 max-w-xl w-full p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white text-center">
                    <h1 className="text-3xl font-bold mb-4">No Quote Found</h1>
                    <p className="mb-6">No quote data available. Please create a new quote.</p>
                    <button
                        onClick={handleNewQuote}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Create New Quote
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="relative z-10 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white p-8">
                    <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Aviation Insurance Quote
                    </h1>
                    
                    {/* Quote Reference */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-emerald-600 bg-opacity-20 backdrop-blur-md rounded-xl px-6 py-3 border border-emerald-400 border-opacity-30">
                            <span className="text-emerald-300 font-semibold">Quote Reference: </span>
                            <span className="text-white font-bold text-lg">{quoteRef}</span>
                        </div>
                    </div>

                    {/* Total Premium Section */}
                    <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-opacity-20 backdrop-blur-md rounded-2xl border border-emerald-400 border-opacity-30">
                        <h2 className="text-2xl font-bold text-center mb-4 text-emerald-300">Total Premium</h2>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-white bg-opacity-10 backdrop-blur-md rounded-xl py-4 px-8 inline-block border border-white border-opacity-20">
                                TBD
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="space-y-6">
                            <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10">
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    Personal Information
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">First Name:</span>
                                        <span>{quoteData.insuredFirstName}</span>
                                    </div>
                                    {quoteData.insuredMiddleName && (
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-300">Middle Name:</span>
                                            <span>{quoteData.insuredMiddleName}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Last Name:</span>
                                        <span>{quoteData.insuredLastName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Email:</span>
                                        <span>{quoteData.insuredEmail}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Age:</span>
                                        <span>{quoteData.age}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Address Information */}
                            <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10">
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    Address
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Address Line 1:</span>
                                        <span>{quoteData.insuredAddressLineOne}</span>
                                    </div>
                                    {quoteData.insuredAddressLineTwo && (
                                        <div className="flex justify-between">
                                            <span className="font-semibold text-gray-300">Address Line 2:</span>
                                            <span>{quoteData.insuredAddressLineTwo}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">City:</span>
                                        <span>{quoteData.insuredCity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">State:</span>
                                        <span>{quoteData.insuredState}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Country:</span>
                                        <span>{quoteData.insuredCountry}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">ZIP Code:</span>
                                        <span>{quoteData.insuredZIP}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Coverage & Pilot Information */}
                        <div className="space-y-6">
                            {/* Coverage Information */}
                            <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10">
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    Coverage Information
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Effective Date:</span>
                                        <span>{new Date(quoteData.effectiveDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Coverage Type:</span>
                                        <span>{quoteData.coverageType}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Extended CFI:</span>
                                        <span>{quoteData.extendedCFI}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">AOPA Member:</span>
                                        <span>{quoteData.isAopaMember}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pilot Information */}
                            <div className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10">
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    Pilot Information
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Certificate & Ratings:</span>
                                        <span>{quoteData.certificateRatings}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Instrument Rating:</span>
                                        <span>{quoteData.instrumentRating}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Total Hours (All Aircraft):</span>
                                        <span>{quoteData.overallHours} hours</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-semibold text-gray-300">Hours (Last 12 Months):</span>
                                        <span>{quoteData.twelveMonthsHours} hours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-10 flex justify-center items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Back to Edit
                        </button>
                        <button
                            onClick={handleNewQuote}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            New Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteDisplay;