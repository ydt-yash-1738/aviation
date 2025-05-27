import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

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

// Custom styles for React Select matching your dark theme
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
        backgroundColor: state.isFocused ? '#065f46' : 'transparent',
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
    const [quoteSaved, setQuoteSaved] = useState(false);

    const [form, setForm] = useState({
        certificateRatings: null,
        instrumentRating: null,
        overallHours: '',
        twelveMonthsHours: '',
    });

    useEffect(() => {
        const savedPreQuoteData = localStorage.getItem('preQuoteFormData');
        if (savedPreQuoteData) {
            try {
                const parsedData = JSON.parse(savedPreQuoteData);
                if (parsedData.certificateRatings) {
                    parsedData.certificateRatings = certificateRatings.find(opt => opt.value === parsedData.certificateRatings) || null;
                }
                if (parsedData.instrumentRating) {
                    parsedData.instrumentRating = yesNoOptions.find(opt => opt.value === parsedData.instrumentRating) || null;
                }
                setForm({
                    certificateRatings: parsedData.certificateRatings,
                    instrumentRating: parsedData.instrumentRating,
                    overallHours: parsedData.overallHours || '',
                    twelveMonthsHours: parsedData.twelveMonthsHours || '',
                });
            } catch (error) {
                console.error('Error loading saved pre quote data:', error);
            }
        }

        // Check if quote was already saved
        const savedQuoteRef = localStorage.getItem('savedQuoteRef');
        if (savedQuoteRef) {
            setQuoteSaved(true);
        }
    }, []);

    useEffect(() => {
        const dataToSave = {
            certificateRatings: form.certificateRatings ? form.certificateRatings.value : null,
            instrumentRating: form.instrumentRating ? form.instrumentRating.value : null,
            overallHours: form.overallHours,
            twelveMonthsHours: form.twelveMonthsHours,
        };
        localStorage.setItem('preQuoteFormData', JSON.stringify(dataToSave));
    }, [form]);

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
            const partialDataStr = localStorage.getItem('partialQuoteData');

            if (!partialDataStr) {
                alert('No preliminary data found. Please start from the beginning.');
                navigate('/quote/quick');
                return;
            }

            const partialData = JSON.parse(partialDataStr);

            const completeQuoteData = {
                ...partialData,
                certificateRatings: form.certificateRatings.value,
                instrumentRating: form.instrumentRating.value,
                overallHours: parseInt(form.overallHours),
                twelveMonthsHours: parseInt(form.twelveMonthsHours),
            };

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

            localStorage.setItem('completedQuoteData', JSON.stringify(finalQuoteData));
            
            localStorage.setItem('savedQuoteRef', partialData.quoteRef);
            console.log(partialData.quoteRef);
            setQuoteSaved(true);
            navigate('/display/quotedisplay', { state: { premiumResult: sheetResult } });

        } catch (err) {
            console.error('Error calculating premium:', err);
            alert('Error connecting to premium service. Please try again.');
        }
    };


    const handlePrevious = () => {
        navigate('/quote/quick');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
            <div className="relative z-10 max-w-xl w-full p-8 mt-5 mb-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white">
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
                        className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleContinue}
                        className="bg-indigo-900 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreQuote;