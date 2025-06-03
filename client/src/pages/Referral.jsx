import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Referral = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [quoteData, setQuoteData] = useState(null);

    useEffect(() => {
        // Get user auth info from localStorage
        const authData = localStorage.getItem('auth');
        if (authData) {
            try {
                const parsedAuth = JSON.parse(authData);
                setUserRole(parsedAuth.user.role);
            } catch (e) {
                console.error('Error parsing auth data:', e);
                setUserRole(null);
            }
        }

        // Get quote data from localStorage (assumed to be saved as completedQuoteData)
        const savedQuoteStr = localStorage.getItem('completedQuoteData');
        if (savedQuoteStr) {
            try {
                const parsedQuote = JSON.parse(savedQuoteStr);
                setQuoteData(parsedQuote);
            } catch (e) {
                console.error('Error parsing quote data:', e);
                setQuoteData(null);
            }
        }
    }, []);

    // Check referral condition
    useEffect(() => {
        if (!quoteData) return;

        const isReferral =
            quoteData.certificateRatings === 'Commercial' &&
            Number(quoteData.overallHours) < 200;

        if (!isReferral) {
            // If not referral, redirect immediately to quote display
            navigate('/display/quotedisplay', { state: { premiumResult: quoteData } });
        }
    }, [quoteData, navigate]);

    if (!quoteData) {
        return <p>Loading quote data...</p>;
    }

    const isButtonEnabled = userRole > 8;

    // const handleClearReferral = async () => {
    //     try {
    //         // Recalculate premium using the saved quoteData
    //         const sheetResponse = await fetch('http://localhost:5000/api/sheet/submit', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 coverageType: quoteData.coverageType,
    //                 extendedCFI: quoteData.extendedCFI,
    //                 isAopaMember: quoteData.isAopaMember,
    //                 certificateRatings: quoteData.certificateRatings,
    //                 instrumentRating: quoteData.instrumentRating,
    //                 overallHours: quoteData.overallHours,
    //                 twelveMonthsHours: quoteData.twelveMonthsHours,
    //             }),
    //         });

    //         const sheetResult = await sheetResponse.json();

    //         if (!sheetResult || sheetResult.status !== 'success') {
    //             alert('Failed to recalculate premium');
    //             return;
    //         }

    //         // Update quoteData with premium info
    //         const updatedQuoteData = {
    //             ...quoteData,
    //             premium: sheetResult.premium,
    //             premiumBreakdown: sheetResult.breakdown,
    //         };

    //         // Save updated data to localStorage
    //         localStorage.setItem('completedQuoteData', JSON.stringify(updatedQuoteData));

    //         // Redirect to display page
    //         navigate('/display/quotedisplay', { state: { premiumResult: updatedQuoteData } });

    //     } catch (err) {
    //         console.error('Error recalculating premium:', err);
    //         alert('Error contacting premium service. Please try again.');
    //     }
    // };

    const handleClearReferral = async () => {
        if (userRole <= 8) {
            alert("You do not have permission to clear this referral.");
            return;
        }

        try {
            // Recalculate premium using the saved quoteData
            const sheetResponse = await fetch('http://localhost:5000/api/sheet/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coverageType: quoteData.coverageType,
                    extendedCFI: quoteData.extendedCFI,
                    isAopaMember: quoteData.isAopaMember,
                    certificateRatings: quoteData.certificateRatings,
                    instrumentRating: quoteData.instrumentRating,
                    overallHours: quoteData.overallHours,
                    twelveMonthsHours: quoteData.twelveMonthsHours,
                }),
            });

            const sheetResult = await sheetResponse.json();

            if (!sheetResult || sheetResult.status !== 'success') {
                alert('Failed to recalculate premium');
                return;
            }

            // Update quoteData with premium info
            const updatedQuoteData = {
                ...quoteData,
                premium: sheetResult.premium,
                premiumBreakdown: sheetResult.breakdown,
            };

            // Save updated data to localStorage
            localStorage.setItem('completedQuoteData', JSON.stringify(updatedQuoteData));
            localStorage.setItem('savedQuoteRef', updatedQuoteData.quoteRef);


            // Redirect to display page
            navigate('/display/quotedisplay', { state: { premiumResult: updatedQuoteData } });

        } catch (err) {
            console.error('Error recalculating premium:', err);
            alert('Error contacting premium service. Please try again.');
        }
    };


    const handleDecline = () => {
        // Navigate to decline page
        navigate('/decline');
    };

return (
    <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center px-4">
        <div className="relative z-10 text-center max-w-2xl w-full mt-5 mb-5">
            <div className="bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-10 md:p-12">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-6">
                    Your quote has been referred
                </h2>

                <p className="text-lg md:text-xl font-medium text-white mb-8">
                    Your quote will be reviewed by the underwriting team due to your certificate rating and flying hours.
                </p>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <button
                        onClick={handleClearReferral}
                        disabled={!isButtonEnabled}
                        className={`${
                            isButtonEnabled
                                ? 'bg-[#03B7B7] text-[#1A2C47] hover:bg-[#144074] hover:text-white'
                                : 'bg-gray-400 text-white cursor-not-allowed'
                        } transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg`}
                    >
                        Clear this Referral
                    </button>

                    <button
                        onClick={handleDecline}
                        disabled={!isButtonEnabled}
                        className={`${
                            isButtonEnabled
                                ? 'bg-[#03B7B7] text-[#1A2C47] hover:bg-[#144074] hover:text-white'
                                : 'bg-gray-400 text-white cursor-not-allowed'
                        } transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg`}
                    >
                        Decline
                    </button>
                </div>

                {!isButtonEnabled && (
                    <p className="text-red-400 mt-6 text-sm">
                        You do not have permission to clear or decline this referral.
                    </p>
                )}
            </div>
        </div>
    </div>
);

};

export default Referral;