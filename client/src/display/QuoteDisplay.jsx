import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6 },
    }),
};

const QuoteDisplay = () => {
    const navigate = useNavigate();
    const [quoteData, setQuoteData] = useState(null);
    const [quoteRef, setQuoteRef] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedQuoteData = localStorage.getItem('completedQuoteData');
        const savedQuoteRef = localStorage.getItem('savedQuoteRef');
        

        if (savedQuoteData && savedQuoteRef) {
            try {
                const parsedData = JSON.parse(savedQuoteData);
                setQuoteData(parsedData);
                setQuoteRef(savedQuoteRef);
            } catch (error) {
                console.error('Error loading quote data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            console.warn('No quote data or reference found in localStorage.');
            setLoading(false); // Ensure loading is cleared even if data is missing
        }
    }, []);


    const handleBack = () => {
        navigate('/quote/pre');
    };

    const handleEmailThisQuote = async () => {
        const quoteData = JSON.parse(localStorage.getItem('completedQuoteData'));
        console.log(quoteData);
        
        try {
            const response = await fetch('http://localhost:5000/api/tentative-email/send-tentative-quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Quote email sent successfully!');
            } else {
                alert('Failed to send email.');
                console.error(result);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error sending quote email.');
        }
    };


    // const handleProceedToBuy = async () => {
    //     if (!quoteData || !quoteRef) {
    //         alert("Quote data or reference is missing.");
    //         return;
    //     }

    //     const finalPayload = {
    //         ...quoteData,
    //         quoteRef,
    //     };

    //     try {
    //         // Step 1: Save quote to MongoDB
    //         const response = await fetch('http://localhost:5000/api/quote', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(finalPayload),
    //         });

    //         const result = await response.json();

    //         if (response.ok) {
    //             alert('Quote submitted successfully!');

    //             // Step 2: Send email after quote is saved
    //             const emailResponse = await fetch(`http://localhost:5000/api/send-quote-email/${quoteRef}`, {
    //                 method: 'POST',
    //             });

    //             const emailResult = await emailResponse.json();

    //             if (emailResponse.ok) {
    //                 console.log('Email sent:', emailResult);
    //             } else {
    //                 console.warn('Email failed to send:', emailResult);
    //             }

    //             // Redirect to confirmation page
    //             navigate('/payment');
    //         } else {
    //             console.error('Error saving quote:', result);
    //             alert('Failed to submit quote. Please try again.');
    //         }
    //     } catch (error) {
    //         console.error('Network error:', error);
    //         alert('Failed to connect to server. Please try again.');
    //     }
    // };



    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center">
                <div className="text-white text-xl">Loading quote...</div>
            </div>
        );
    }

    if (!quoteData) {
        return (
            <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="relative z-10 max-w-xl w-full p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white text-center"
                >
                    <h1 className="text-3xl font-bold mb-4">No Quote Found</h1>
                    <p className="mb-6">No quote data available. Please create a new quote.</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        //onClick={handleNewQuote}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                    >
                        Create New Quote
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#1A2C47] py-8 px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="relative z-10 bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white p-8"
                >
                    <motion.h1
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                    >
                        Skyline Insurance Quote
                    </motion.h1>

                    <motion.div
                        custom={1}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-8"
                    >
                        <div className="inline-block bg-emerald-600 bg-opacity-20 backdrop-blur-md rounded-xl px-6 py-3 border border-emerald-400 border-opacity-30">
                            <span className="text-emerald-300 font-semibold">Quote Reference: </span>
                            <span className="text-white font-bold text-lg">{quoteRef}</span>
                        </div>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="mb-8 p-6 bg-gradient-to-r from-emerald-500 to-teal-600 bg-opacity-20 backdrop-blur-md rounded-2xl border border-emerald-400 border-opacity-30"
                    >
                        <h2 className="text-2xl font-bold text-center mb-4 text-emerald-300">Total Premium</h2>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-white bg-white bg-opacity-10 backdrop-blur-md rounded-xl py-4 px-8 inline-block border border-white border-opacity-20">
                                ${quoteData.premium ? quoteData.premium.toFixed(2) : 'N/A'}
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[ // Wrap both personal and address in animations
                            {
                                title: 'Personal Information',
                                items: [
                                    ['First Name', quoteData.insuredFirstName],
                                    ['Middle Name', quoteData.insuredMiddleName],
                                    ['Last Name', quoteData.insuredLastName],
                                    ['Email', quoteData.insuredEmail],
                                    ['Age', quoteData.age],
                                ].filter(item => item[1]),
                            },
                            {
                                title: 'Address',
                                items: [
                                    ['Address Line 1', quoteData.insuredAddressLineOne],
                                    ['Address Line 2', quoteData.insuredAddressLineTwo],
                                    ['City', quoteData.insuredCity],
                                    ['State', quoteData.insuredState],
                                    ['Country', quoteData.insuredCountry],
                                    ['ZIP Code', quoteData.insuredZIP],
                                ].filter(item => item[1]),
                            },
                        ].map((section, i) => (
                            <motion.div
                                key={i}
                                custom={i + 3}
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10 space-y-3"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    {section.title}
                                </h2>
                                {section.items.map(([label, value]) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="font-semibold text-gray-300">{label}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </motion.div>
                        ))}

                        {[ // Coverage and Pilot sections
                            {
                                title: 'Coverage Information',
                                items: [
                                    ['Effective Date', new Date(quoteData.effectiveDate).toLocaleDateString()],
                                    ['Coverage Type', quoteData.coverageType],
                                    ['Extended CFI', quoteData.extendedCFI],
                                    ['AOPA Member', quoteData.isAopaMember],
                                    ['Medical Allowance', '$10000'],
                                ],
                            },
                            {
                                title: 'Pilot Information',
                                items: [
                                    ['Certificate & Ratings', quoteData.certificateRatings],
                                    ['Instrument Rating', quoteData.instrumentRating],
                                    ['Total Hours (All Aircraft)', `${quoteData.overallHours} hours`],
                                    ['Hours (Last 12 Months)', `${quoteData.twelveMonthsHours} hours`],
                                ],
                            },
                        ].map((section, i) => (
                            <motion.div
                                key={i}
                                custom={i + 5}
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                className="bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10 space-y-3"
                            >
                                <h2 className="text-2xl font-bold mb-4 text-emerald-300 border-b border-emerald-400 border-opacity-30 pb-2">
                                    {section.title}
                                </h2>
                                {section.items.map(([label, value]) => (
                                    <div key={label} className="flex justify-between">
                                        <span className="font-semibold text-gray-300">{label}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        custom={7}
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        className="mt-10 flex justify-center items-center gap-4"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBack}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                            Back to Edit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEmailThisQuote}
                            className="bg-red-500 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                            Email this Quote
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/payment')}
                            className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                            Proceed to Buy
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default QuoteDisplay;
