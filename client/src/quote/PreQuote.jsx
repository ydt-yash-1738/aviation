import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

    // For react-select, store the selected option objects, or null if nothing selected
    const [form, setForm] = useState({
        certificateRatings: null,
        instrumentrating: null,
        overallhrs: null,
        twelvemonthshrs: null,
    });

    // Handle react-select changes: set selected option object (or null)
    const handleSelectChange = (selectedOption, actionMeta) => {
        setForm((prev) => ({
            ...prev,
            [actionMeta.name]: selectedOption,
        }));
    };

    // Handle native inputs (hrs)
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleNext = async () => {
        if (!form.certificateRatings || !form.instrumentrating || !form.overallhrs || !form.twelvemonthshrs) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const res = await axios.post('/api/quickquote/update-pilot-info', {
                certificateRatings: form.certificateRatings.value,
                instrumentRating: form.instrumentrating.value,
                overallHours: Number(form.overallhrs),
                twelveMonthsHours: Number(form.twelvemonthshrs),
                // quoteRef: localStorage.getItem('quoteRef'), // or however you're storing the quote reference
            });

            console.log('Pilot info updated:', res.data);
            navigate('/display/quotedisplay');
        } catch (err) {
            console.error('Failed to update pilot info', err);
            alert('Something went wrong!');
        }
    };

    const handleSave = async () => {
        if (!form.certificateRatings || !form.instrumentrating || !form.overallhrs || !form.twelvemonthshrs) {
            alert('Please fill in all fields');
            return;
        }

        const storedData = JSON.parse(localStorage.getItem('quickQuoteData'));
        const finalQuote = {
            ...storedData,
            certificateRatings: form.certificateRatings.value,
            instrumentRating: form.instrumentrating.value,
            overallHrs: parseInt(form.overallhrs),
            twelveMonthsHrs: parseInt(form.twelvemonthshrs),
        };

        try {
            const response = await fetch('http://localhost:5000/api/quote', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalQuote),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Quote saved successfully');
                localStorage.removeItem('quoteData');
                navigate('/display/quotedisplay');
            } else {
                alert(`Failed to save quote: ${result.message}`);
            }
        } catch (err) {
            alert('Error saving quote');
            console.error(err);
        }
    };


    const handlePrevious = () => {
        // Example: validation or form processing here
        // To get raw values, you can access form.aircraftType?.value etc.

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
                        <label className="block mb-2 font-semibold">Certificate and Ratings</label>
                        <Select
                            name="CertificateRatings"
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
                        <label className="block mb-2 font-semibold">Instrument Rating</label>
                        <Select
                            name="InstrumentRating"
                            options={yesNoOptions}
                            value={form.instrumentrating}
                            onChange={handleSelectChange}
                            styles={customStyles}
                            placeholder="Select Yes or No"
                            isClearable
                        />
                    </div>

                    {/* Total Hours all Aircraft */}
                    <div>
                        <label className="block mb-2 font-semibold">Total Hours all Aircraft</label>
                        <input
                            type="number"
                            name="overallhrs"
                            value={form.overallhrs}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter total flight hours"
                            min="0"
                            step="1"
                        />
                    </div>


                    {/* Total Hours Last 12 Months */}
                    <div>
                        <label className="block mb-2 font-semibold">Total Hours Last 12 Months</label>
                        <input
                            type="number"
                            name="twelvemonthshrs"
                            value={form.twelvemonthshrs}
                            onChange={handleChange}
                            className="w-full rounded-xl bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            placeholder="Enter hours flown in the last 12 months"
                            min="0"
                            step="1"
                        />
                    </div>

                </div>
                <div className="mt-10 flex justify-center items-center gap-4">
                    {/* Previous Button */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={handlePrevious}
                            className="bg-indigo-900 hover:to-purple-900 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Previous
                        </button>
                    </div>
                    {/*Save */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={handleSave}
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Save
                        </button>

                    </div>
                    {/* Next Button */}
                    <div className="mt-10 text-center">
                        <button
                            onClick={handleNext}
                            className="bg-indigo-900 hover:to-purple-900 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreQuote;