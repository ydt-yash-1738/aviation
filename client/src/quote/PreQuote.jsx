import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

const certificateRatings = [
    { value: 'Student', label: 'Student' },
    { value: 'Commercial', label: 'Commercial' },
    { value: 'Private', label: 'Private' },
    { value: 'ATP', label: 'ATP (Airline Transportation Pilot)' },
];

const yesNoOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
];

// css
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '1rem',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        padding: '2px',
        boxShadow: state.isFocused ? '0 0 0 2px #10b981' : 'none',
        '&:hover': {
            borderColor: '#10b981',
        },
    }),
    menu: (provided) => ({
        ...provided,
        background: '#1f2937',
        borderRadius: '0.75rem',
        marginTop: 4,
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? '#03B7B7' : 'transparent',
        color: 'white',
        cursor: 'pointer',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(255, 255, 255, 0.6)',
    }),
};

const PreQuote = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [quoteSaved, setQuoteSaved] = useState(false);

    const [form, setForm] = useState({
        certificateRatings: null,
        instrumentRating: null,
        overallHours: '',
        twelveMonthsHours: '',
    });

    useEffect(() => {
        const loadData = async () => {
            // Load data from resumeData if available
            const resumeData = location.state?.resumeData;

            if (resumeData?.preQuoteFormData || resumeData?.certificateRatings) {
                // If resumeData has preQuote data or is complete data
                setForm({
                    certificateRatings: resumeData.certificateRatings
                        ? certificateRatings.find(opt => opt.value === resumeData.certificateRatings) || null
                        : resumeData.preQuoteFormData?.certificateRatings
                            ? certificateRatings.find(opt => opt.value === resumeData.preQuoteFormData.certificateRatings) || null
                            : null,
                    instrumentRating: resumeData.instrumentRating
                        ? yesNoOptions.find(opt => opt.value === resumeData.instrumentRating) || null
                        : resumeData.preQuoteFormData?.instrumentRating
                            ? yesNoOptions.find(opt => opt.value === resumeData.preQuoteFormData.instrumentRating) || null
                            : null,
                    overallHours: resumeData.overallHours || resumeData.preQuoteFormData?.overallHours || '',
                    twelveMonthsHours: resumeData.twelveMonthsHours || resumeData.preQuoteFormData?.twelveMonthsHours || '',
                });
            } else {
                // Check for complete resume data in localStorage first
                const completeResumeData = localStorage.getItem('completeResumeData');
                if (completeResumeData) {
                    const parsedData = JSON.parse(completeResumeData);
                    setForm({
                        certificateRatings: parsedData.certificateRatings
                            ? certificateRatings.find(opt => opt.value === parsedData.certificateRatings) || null
                            : null,
                        instrumentRating: parsedData.instrumentRating
                            ? yesNoOptions.find(opt => opt.value === parsedData.instrumentRating) || null
                            : null,
                        overallHours: parsedData.overallHours || '',
                        twelveMonthsHours: parsedData.twelveMonthsHours || '',
                    });
                } else {
                    // Fallback: fetch from database
                    const userId = localStorage.getItem('userId');
                    const quoteRef = localStorage.getItem('quoteRef');

                    if (userId && quoteRef) {
                        try {
                            const response = await fetch(`http://localhost:5000/api/pending/get/${userId}/${quoteRef}`);
                            if (response.ok) {
                                const data = await response.json();
                                if (data.success && data.data) {
                                    // Load QuickQuote data if PreQuote data doesn't exist but we need to continue the flow
                                    if (data.data.preQuoteFormData) {
                                        const preData = data.data.preQuoteFormData;
                                        setForm({
                                            certificateRatings: preData.certificateRatings
                                                ? certificateRatings.find(opt => opt.value === preData.certificateRatings) || null
                                                : null,
                                            instrumentRating: preData.instrumentRating
                                                ? yesNoOptions.find(opt => opt.value === preData.instrumentRating) || null
                                                : null,
                                            overallHours: preData.overallHours || '',
                                            twelveMonthsHours: preData.twelveMonthsHours || '',
                                        });
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('Error loading quote data from database:', error);
                        }
                    }
                }
            }

            // Check if quote was already saved
            const savedQuoteRef = localStorage.getItem('savedQuoteRef');
            if (savedQuoteRef) {
                setQuoteSaved(true);
            }
        };

        loadData();
    }, [location.state]);

    // Auto-save form data to database on every change
    useEffect(() => {
        const saveFormData = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            // Don't save if form is empty
            if (!form.certificateRatings && !form.instrumentRating) return;

            const quoteRef = location.state?.resumeData?.quoteRef || localStorage.getItem('quoteRef');
            if (!quoteRef) return;

            const preQuoteData = {
                certificateRatings: form.certificateRatings ? form.certificateRatings.value : null,
                instrumentRating: form.instrumentRating ? form.instrumentRating.value : null,
                overallHours: form.overallHours,
                twelveMonthsHours: form.twelveMonthsHours,
            };

            try {
                await axios.post('http://localhost:5000/api/pending/save-form', {
                    userId,
                    quoteRef,
                    preQuoteFormData: preQuoteData,
                    currentQuoteStep: 'preQuote'
                });
            } catch (error) {
                console.error('Error auto-saving form data:', error);
            }
            const existingCompleteData = localStorage.getItem('completeResumeData');
            if (existingCompleteData) {
                const parsedCompleteData = JSON.parse(existingCompleteData);
                const updatedCompleteData = {
                    ...parsedCompleteData,

                    ...preQuoteData,
                };
                localStorage.setItem('completeResumeData', JSON.stringify(updatedCompleteData));
            }
        };

        // Debounce the save operation
        const timeoutId = setTimeout(saveFormData, 1000);
        return () => clearTimeout(timeoutId);
    }, [form, location.state]);

    const handleSelectChange = (selectedOption, actionMeta) => {
        setForm((prev) => ({
            ...prev,
            [actionMeta.name]: selectedOption,
        }));
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleContinue = async () => {
        if (!form.certificateRatings || !form.instrumentRating || !form.overallHours || !form.twelveMonthsHours) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const resumeData = location.state?.resumeData;
            if (!resumeData) {
                alert('Kindly go through your quote from the beginning.');
                navigate('/quote/quick');
                return;
            }

            const completeQuoteData = {
                ...resumeData,
                certificateRatings: form.certificateRatings.value,
                instrumentRating: form.instrumentRating.value,
                overallHours: parseInt(form.overallHours),
                twelveMonthsHours: parseInt(form.twelveMonthsHours),
            };

            const { coverageType, extendedCFI, certificateRatings } = completeQuoteData;

            // Decline Logic
            const allowCoverageTypes = ["Single Engine", "Rotor Wing"];

            if (!allowCoverageTypes.includes(coverageType)) {
                if (certificateRatings === "Student" && extendedCFI === "No") {
                    console.warn("Declined: Student pilot with no CFI for restricted coverage type.");
                    navigate('/decline');
                    return;
                }

                if (extendedCFI === "Yes") {
                    const allowedRatings = ["Private", "Commercial", "ATP"];
                    if (!allowedRatings.includes(certificateRatings)) {
                        console.warn(`Declined: Certificate rating '${certificateRatings}' not allowed for CFI = Yes.`);
                        navigate('/decline');
                        return;
                    }
                }
            }

            // Referral logic
            if (certificateRatings === "Commercial" && completeQuoteData.overallHours < 200) {
                // Save completed quote data to database
                await axios.post('http://localhost:5000/api/pending/save-completed', {
                    userId: localStorage.getItem('userId'),
                    quoteRef: resumeData.quoteRef,
                    completedQuoteData: {
                        ...completeQuoteData,
                        premium: null,
                        premiumBreakdown: null,
                    }
                });

                navigate('/referral');
                return;
            }

            console.log("Sending data to sheet:", completeQuoteData);

            const sheetResponse = await fetch('http://localhost:5000/api/sheet/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    coverageType: completeQuoteData.coverageType,
                    extendedCFI: completeQuoteData.extendedCFI,
                    isAopaMember: completeQuoteData.isAopaMember,
                    certificateRatings: completeQuoteData.certificateRatings,
                    instrumentRating: completeQuoteData.instrumentRating,
                    overallHours: completeQuoteData.overallHours,
                    twelveMonthsHours: completeQuoteData.twelveMonthsHours,
                }),
            });

            const sheetResult = await sheetResponse.json();

            if (!sheetResult || sheetResult.status !== 'success') {
                console.warn('Premium calculation failed:', sheetResult.message);
                alert('Failed to calculate premium');
                return;
            }

            const premium = sheetResult.premium;

            const finalQuoteData = {
                ...completeQuoteData,
                premium,
                premiumBreakdown: sheetResult.breakdown,
            };

            // Save completed quote data to database
            await axios.post('http://localhost:5000/api/pending/save-completed', {
                userId: localStorage.getItem('userId'),
                quoteRef: resumeData.quoteRef,
                completedQuoteData: finalQuoteData
            });

            localStorage.setItem('savedQuoteRef', resumeData.quoteRef);
            localStorage.setItem('completedQuoteData', JSON.stringify(finalQuoteData));

            setQuoteSaved(true);
            navigate('/display/quotedisplay', { state: { premiumResult: sheetResult } });

        } catch (err) {
            console.error('Error calculating premium:', err);
            alert('Error connecting to premium service. Please try again.');
        }
    };

    const handlePrevious = () => {
        // Get complete resume data to pass back
        const completeResumeData = localStorage.getItem('completeResumeData');
        const resumeData = completeResumeData ? JSON.parse(completeResumeData) : location.state?.resumeData;

        navigate('/quote/quick', { state: { resumeData: resumeData } });
    };

    return (
        <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center">
            <div className="relative z-10 max-w-xl w-full p-8 mt-5 mb-5 bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white">
                <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Pilot Information
                </h1>
                <div className="space-y-6">
                    {/* Certificate and Ratings */}
                    <div>
                        <label className="block mb-2 font-semibold">Certificate and Ratings *</label>
                        <Select
                            name="certificateRatings"
                            options={certificateRatings}
                            value={form.certificateRatings}
                            onChange={handleSelectChange}
                            styles={customStyles}
                            placeholder="Select your ratings"
                            isClearable
                        />
                    </div>

                    {/* Instrument Rating */}
                    <div>
                        <label className="block mb-2 font-semibold">Instrument Rating *</label>
                        <Select
                            name="instrumentRating"
                            options={yesNoOptions}
                            value={form.instrumentRating}
                            onChange={handleSelectChange}
                            styles={customStyles}
                            placeholder="Select Yes or No"
                            isClearable
                        />
                    </div>

                    {/* Total Hours all Aircraft */}
                    <div>
                        <label className="block mb-2 font-semibold">Total Hours all Aircraft *</label>
                        <input
                            type="number"
                            name="overallHours"
                            value={form.overallHours}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter total flight hours"
                            min="0"
                            step="1"
                            required
                        />
                    </div>

                    {/* Total Hours Last 12 Months */}
                    <div>
                        <label className="block mb-2 font-semibold">Total Hours Last 12 Months *</label>
                        <input
                            type="number"
                            name="twelveMonthsHours"
                            value={form.twelveMonthsHours}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter hours flown in the last 12 months"
                            min="0"
                            step="1"
                            required
                        />
                    </div>
                </div>

                <div className="mt-10 flex justify-center items-center gap-4">
                    {/* Previous Button */}
                    <button
                        onClick={handlePrevious}
                        className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleContinue}
                        className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreQuote;