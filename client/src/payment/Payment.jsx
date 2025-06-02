import { useEffect, useState } from 'react';
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

const Payment = () => {
    const navigate = useNavigate();
    const [quoteData, setQuoteData] = useState(null);
    const [quoteRef, setQuoteRef] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [partner, setPartner] = useState('paypal');
    const [message, setMessage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple dummy validation
        if (partner === 'card') {
            if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ''))) {
                setMessage('Invalid card number (must be 16 digits)');
                return;
            }
            if (!/^\d{2}\/\d{2}$/.test(expiry)) {
                setMessage('Invalid expiry (format MM/YY)');
                return;
            }
            if (!/^\d{3,4}$/.test(cvv)) {
                setMessage('Invalid CVV');
                return;
            }
        }

        setMessage('Processing payment...');
        setTimeout(() => {
            setMessage(`Payment successful via ${partner.toUpperCase()}`);
        }, 1500);
    };

    // useEffect(() => {
    //     const savedQuoteData = localStorage.getItem('completedQuoteData');
    //     const savedQuoteRef = localStorage.getItem('savedQuoteRef');

    //     if (savedQuoteData && savedQuoteRef) {
    //         try {
    //             setQuoteData(JSON.parse(savedQuoteData));
    //             setQuoteRef(savedQuoteRef);
    //         } catch (error) {
    //             console.error('Failed to parse quote data:', error);
    //         }
    //     } else {
    //         alert('Quote data is missing. Redirecting...');
    //         navigate('/quote/pre');
    //     }
    // }, [navigate]);

    useEffect(() => {
        const savedQuoteData = localStorage.getItem('completedQuoteData');
        const savedQuoteRef = localStorage.getItem('savedQuoteRef');

        if (savedQuoteData) {
            try {
                setQuoteData(JSON.parse(savedQuoteData));
                if (savedQuoteRef) setQuoteRef(savedQuoteRef);
            } catch (error) {
                console.error('Failed to parse quote data:', error);
                alert('Invalid quote data. Redirecting...');
                navigate('/quote/pre');
            }
        } else {
            alert('Quote data is missing. Redirecting...');
            navigate('/quote/pre');
        }
    }, [navigate]);


    const handlePrevious = () => {
        navigate('/display/quotedisplay')
    }

    // const handlePayNow = async () => {
    //     if (
    //         (partner !== 'card') ||
    //         (/^\d{16}$/.test(cardNumber.replace(/\s+/g, '')) &&
    //             /^\d{2}\/\d{2}$/.test(expiry) &&
    //             /^\d{3,4}$/.test(cvv))
    //     ) {
    //         const quoteData = JSON.parse(localStorage.getItem('completedQuoteData'));
    //         const quoteRef = localStorage.getItem('savedQuoteRef');

    //         if (!quoteData || !quoteRef) {
    //             setMessage('Quote data or reference is missing.');
    //             return;
    //         }

    //         const finalPayload = {
    //             ...quoteData,
    //             quoteRef,
    //         };

    //         try {
    //             // Step 1: Save quote to MongoDB
    //             const response = await fetch('http://localhost:5000/api/quote', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(finalPayload),
    //             });

    //             const result = await response.json();

    //             if (response.ok) {
    //                 // Step 2: Send final quote email
    //                 const emailResponse = await fetch(`http://localhost:5000/api/send-quote-email/${quoteRef}`, {
    //                     method: 'POST',
    //                 });

    //                 const emailResult = await emailResponse.json();

    //                 if (!emailResponse.ok) {
    //                     console.warn('Email failed to send:', emailResult);
    //                 }

    //                 navigate('/confirmation');
    //             } else {
    //                 console.error('Error saving quote:', result);
    //                 setMessage('Failed to submit quote. Please try again.');
    //             }
    //         } catch (error) {
    //             console.error('Network error:', error);
    //             setMessage('Failed to connect to server. Please try again.');
    //         }
    //     } else {
    //         setMessage('Please fix validation errors before proceeding');
    //     }
    // };

    // const handlePayNow = async () => {
    //     if (
    //         (partner !== 'card') ||
    //         (/^\d{16}$/.test(cardNumber.replace(/\s+/g, '')) &&
    //             /^\d{2}\/\d{2}$/.test(expiry) &&
    //             /^\d{3,4}$/.test(cvv))
    //     ) {
    //         const quoteData = JSON.parse(localStorage.getItem('completedQuoteData'));
    //         const quoteRef = localStorage.getItem('savedQuoteRef');

    //         if (!quoteData || !quoteRef) {
    //             setMessage('Quote data or reference is missing.');
    //             return;
    //         }

    //         const finalPayload = {
    //             ...quoteData,
    //             quoteRef,
    //         };

    //         try {
    //             const response = await fetch('http://localhost:5000/api/quote', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(finalPayload),
    //             });

    //             const result = await response.json();

    //             if (response.ok) {
    //                 const policyNumber = result.quote.policyNumber;
    //                 localStorage.setItem('policyNumber', policyNumber);
    //                 console.log(policyNumber);

    //                 // Send email (optional)
    //                 const emailResponse = await fetch(`http://localhost:5000/api/send-quote-email/${quoteRef}`, {
    //                     method: 'POST',
    //                 });

    //                 if (!emailResponse.ok) {
    //                     const emailResult = await emailResponse.json();
    //                     console.warn('Email failed to send:', emailResult);
    //                 }

    //                 // Clear stored journey state (important for resuming logic)
    //                 localStorage.removeItem('currentQuoteStep');
    //                 localStorage.removeItem('partialQuoteData');
    //                 localStorage.removeItem('preQuoteFormData');
    //                 localStorage.removeItem('completedQuoteData');
    //                 localStorage.removeItem('savedQuoteRef');

    //                 navigate('/confirmation');
    //             }
    //             else {
    //                 console.error('Error saving quote:', result);
    //                 setMessage('Failed to submit quote. Please try again.');
    //             }
    //         } catch (error) {
    //             console.error('Network error:', error);
    //             setMessage('Failed to connect to server. Please try again.');
    //         }
    //     } else {
    //         setMessage('Please fix validation errors before proceeding');
    //     }
    // };

    const handlePayNow = async () => {
        if (
            partner !== 'card' ||
            (/^\d{16}$/.test(cardNumber.replace(/\s+/g, '')) &&
                /^\d{2}\/\d{2}$/.test(expiry) &&
                /^\d{3,4}$/.test(cvv))
        ) {
            const quoteDataStr = localStorage.getItem('completedQuoteData');
            if (!quoteDataStr) {
                setMessage('Quote data is missing.');
                return;
            }

            const quoteData = JSON.parse(quoteDataStr);
            let quoteRef = localStorage.getItem('savedQuoteRef');

            // Optional: generate a quoteRef if missing
            if (!quoteRef) {
                quoteRef = `Q-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                localStorage.setItem('savedQuoteRef', quoteRef); // Save it if needed again
            }

            const finalPayload = {
                ...quoteData,
                quoteRef,
            };

            try {
                const response = await fetch('http://localhost:5000/api/quote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(finalPayload),
                });

                const result = await response.json();

                if (response.ok) {
                    const policyNumber = result.quote.policyNumber;
                    localStorage.setItem('policyNumber', policyNumber);
                    console.log('Policy Number:', policyNumber);

                    // Send quote email
                    await fetch(`http://localhost:5000/api/send-quote-email/${quoteRef}`, {
                        method: 'POST',
                    });

                    // Clear journey data
                    localStorage.removeItem('currentQuoteStep');
                    localStorage.removeItem('partialQuoteData');
                    localStorage.removeItem('preQuoteFormData');
                    localStorage.removeItem('completedQuoteData');
                    localStorage.removeItem('savedQuoteRef');

                    navigate('/confirmation');
                } else {
                    console.error('Quote submission failed:', result);
                    setMessage('Failed to submit quote. Please try again.');
                }
            } catch (error) {
                console.error('Network error:', error);
                setMessage('Failed to connect to server. Please try again.');
            }
        } else {
            setMessage('Please fix validation errors before proceeding');
        }
    };


    return (
        <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{
                    maxWidth: 420,
                    margin: '3rem auto',
                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    background: '#fff',
                    padding: '2rem',
                    borderRadius: 12,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    color: '#222',
                }}
            >
                <h2 style={{ marginBottom: '1.5rem', fontWeight: '600', color: '#222' }}>Payment</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ marginBottom: 8, fontWeight: '600' }}>
                        Select Payment Partner:
                        <select
                            value={partner}
                            onChange={(e) => setPartner(e.target.value)}
                            style={{
                                width: '100%',
                                marginTop: 6,
                                padding: '10px 12px',
                                borderRadius: 6,
                                border: '1.5px solid #ccc',
                                fontSize: 16,
                                outline: 'none',
                                transition: 'border-color 0.3s',
                            }}
                            onFocus={e => e.target.style.borderColor = '#4a90e2'}
                            onBlur={e => e.target.style.borderColor = '#ccc'}
                        >
                            <option value="paypal">PayPal</option>
                            <option value="stripe">Stripe</option>
                            <option value="square">Square</option>
                            <option value="card">Credit Card</option>
                        </select>
                    </label>

                    {partner === 'card' && (
                        <>
                            <label style={{ marginTop: 16, fontWeight: '600' }}>
                                Card Number:
                                <input
                                    type="text"
                                    placeholder="1234 5678 9012 3456"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    maxLength={19}
                                    style={inputStyle}
                                />
                            </label>

                            <label style={{ marginTop: 16, fontWeight: '600' }}>
                                Expiry (MM/YY):
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    maxLength={5}
                                    style={inputStyle}
                                />
                            </label>

                            <label style={{ marginTop: 16, fontWeight: '600' }}>
                                CVV:
                                <input
                                    type="password"
                                    placeholder="123"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    maxLength={4}
                                    style={inputStyle}
                                />
                            </label>
                        </>
                    )}

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
                            onClick={handlePrevious}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                            Back to Edit
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handlePayNow}
                            className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all duration-200"
                        >
                            Buy Now!
                        </motion.button>
                    </motion.div>
                </form>

                {message && (
                    <p
                        style={{
                            marginTop: 24,
                            fontWeight: '700',
                            color: message.includes('successful') ? 'green' : 'crimson',
                            fontSize: 16,
                            textAlign: 'center',
                        }}
                    >
                        {message}
                    </p>
                )}
            </motion.div>
        </div>
    );
};

const inputStyle = {
    display: 'block',
    width: '100%',
    marginTop: 6,
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1.5px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxShadow: 'inset 0 1px 3px rgb(0 0 0 / 0.1)',
};

export default Payment;
