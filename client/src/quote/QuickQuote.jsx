import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CoverageOptions = [
  { value: 'Single Engine', label: 'Single Engine' },
  { value: 'Multi Engine', label: 'Multi Engine' },
  { value: 'Single Engine Sea', label: 'Single Engine Sea' },
  { value: 'Rotor Wing', label: 'Rotor Wing' },
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

const QuickQuote = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    effectiveDate: null,
    coverageType: null,
    extendedCFI: null,
    isAopaMember: null,
    insuredFirstName: '',
    insuredMiddleName: '',
    insuredLastName: '',
    insuredEmail:'',
    insuredAddressLineOne: '',
    insuredAddressLineTwo: '',
    insuredCity: '',
    insuredState: '',
    insuredCountry: '',
    insuredZIP: '',
    age: ''
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedQuickQuoteData = localStorage.getItem('quickQuoteFormData');
    if (savedQuickQuoteData) {
      try {
        const parsedData = JSON.parse(savedQuickQuoteData);
        console.log(parsedData);
        
        setForm({
          effectiveDate: parsedData.effectiveDate ? new Date(parsedData.effectiveDate) : null,
          coverageType: parsedData.coverageType
            ? CoverageOptions.find(opt => opt.value === parsedData.coverageType) || null
            : null,
          extendedCFI: parsedData.extendedCFI
            ? yesNoOptions.find(opt => opt.value === parsedData.extendedCFI) || null
            : null,
          isAopaMember: parsedData.isAopaMember
            ? yesNoOptions.find(opt => opt.value === parsedData.isAopaMember) || null
            : null,
          insuredFirstName: parsedData.insuredFirstName || '',
          insuredMiddleName: parsedData.insuredMiddleName || '',
          insuredLastName: parsedData.insuredLastName || '',
          insuredEmail: parsedData.insuredEmail || '',
          insuredAddressLineOne: parsedData.insuredAddressLineOne || '',
          insuredAddressLineTwo: parsedData.insuredAddressLineTwo || '',
          insuredCity: parsedData.insuredCity || '',
          insuredState: parsedData.insuredState || '',
          insuredCountry: parsedData.insuredCountry || '',
          insuredZIP: parsedData.insuredZIP || '',
          age: parsedData.age || ''
        });
      } catch (error) {
        console.error('Error loading saved quick quote data:', error);
      }
    }
  }, []);
  
  

  // Save form data to localStorage whenever form changes
  useEffect(() => {
    const dataToSave = {
      ...form,
      // Convert Date object to string for storage
      effectiveDate: form.effectiveDate ? form.effectiveDate.toISOString() : null,
      // Convert select objects to their values for storage
      coverageType: form.coverageType ? form.coverageType.value : null,
      extendedCFI: form.extendedCFI ? form.extendedCFI.value : null,
      isAopaMember: form.isAopaMember ? form.isAopaMember.value : null,
    };
    
    localStorage.setItem('quickQuoteFormData', JSON.stringify(dataToSave));
  }, [form]);
  
  // Handle react-select changes: set selected option object (or null)
  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm((prev) => ({
      ...prev,
      [actionMeta.name]: selectedOption,
    }));
  };

  // Handle native inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Generating QuoteRef
  const generateQuoteRef = () => {
    return 'SKYLINE-QR-' + Date.now();
  };

  const handleNext = () => {
    // Basic validation
    if (!form.effectiveDate || !form.coverageType || !form.extendedCFI || !form.isAopaMember ||
        !form.insuredFirstName || !form.insuredLastName || !form.insuredAddressLineOne ||
        !form.insuredCity || !form.insuredState || !form.insuredCountry || !form.insuredZIP || !form.age || !form.insuredEmail) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if we already have a quote reference, if not generate a new one
    let quoteRef = localStorage.getItem('quoteRef');
    if (!quoteRef) {
      quoteRef = generateQuoteRef();
      localStorage.setItem('quoteRef', quoteRef);
    }
    
    // Store partial quote data in localStorage for the next step
    const partialQuoteData = {
      quoteRef,
      effectiveDate: form.effectiveDate,
      coverageType: form.coverageType.value,
      extendedCFI: form.extendedCFI.value,
      isAopaMember: form.isAopaMember.value,
      insuredFirstName: form.insuredFirstName,
      insuredMiddleName: form.insuredMiddleName || '',
      insuredLastName: form.insuredLastName,
      insuredEmail: form.insuredEmail,
      insuredAddressLineOne: form.insuredAddressLineOne,
      insuredAddressLineTwo: form.insuredAddressLineTwo || '',
      insuredCity: form.insuredCity,
      insuredState: form.insuredState,
      insuredCountry: form.insuredCountry,
      insuredZIP: form.insuredZIP,
      age: parseInt(form.age) || 0
    };
    console.log(partialQuoteData);
    
    // Store in localStorage for next component
    localStorage.setItem('partialQuoteData', JSON.stringify(partialQuoteData));
    
    // Navigate to next step - don't clear form data yet
    navigate('/quote/pre');
  };

  // Function to clear all form data (for starting fresh)
  const clearAllFormData = () => {
    localStorage.removeItem('quickQuoteFormData');
    localStorage.removeItem('preQuoteFormData');
    localStorage.removeItem('partialQuoteData');
    localStorage.removeItem('quoteRef');
    localStorage.removeItem('completedQuoteData');
    localStorage.removeItem('savedQuoteRef');
    // Reset form state
    setForm({
      effectiveDate: null,
      coverageType: null,
      extendedCFI: null,
      isAopaMember: null,
      insuredFirstName: '',
      insuredMiddleName: '',
      insuredLastName: '',
      insuredEmail:'',
      insuredAddressLineOne: '',
      insuredAddressLineTwo: '',
      insuredCity: '',
      insuredState: '',
      insuredCountry: '',
      insuredZIP: '',
      age: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center">
      <div className="relative z-10 max-w-xl w-full p-8 mt-5 mb-5 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Preliminary Quote Information
        </h1>
        <div className="space-y-6">
          {/* Effective Date */}
          <div>
            <label className="block mb-2 font-semibold text-white">Effective Date *</label>
            <DatePicker
              selected={form.effectiveDate}
              onChange={(date) => setForm({ ...form, effectiveDate: date })}
              minDate={new Date()}
              placeholderText="Select a date"
              className="w-full px-4 py-2 rounded-xl bg-white bg-opacity-10 text-white border border-white border-opacity-20 backdrop-blur-md focus:outline-none shadow focus:ring-2 focus:ring-emerald-500"
              calendarClassName="glass-calendar"
              dayClassName={() =>
                'text-white hover:bg-emerald-600 transition duration-150 ease-in-out'
              }
            />
          </div>

          {/* Coverage Type */}
          <div>
            <label className="block mb-2 font-semibold">Coverage Type *</label>
            <Select
              name="coverageType"
              options={CoverageOptions}
              value={form.coverageType}
              onChange={handleSelectChange}
              styles={customStyles}
              placeholder="Select aircraft type"
              isClearable
            />
          </div>

          {/* Extended CFI */}
          <div>
            <label className="block mb-2 font-semibold">Extend coverage for CFI Professional Liability? *</label>
            <Select
              name="extendedCFI"
              options={yesNoOptions}
              value={form.extendedCFI}
              onChange={handleSelectChange}
              styles={customStyles}
              placeholder="Select Yes or No"
              isClearable
            />
          </div>

          {/* AOPA Member */}
          <div>
            <label className="block mb-2 font-semibold">Are you an AOPA Member? *</label>
            <Select
              name="isAopaMember"
              options={yesNoOptions}
              value={form.isAopaMember}
              onChange={handleSelectChange}
              styles={customStyles}
              placeholder="Select Yes or No"
              isClearable
            />
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">First Name *</label>
              <input
                type="text"
                name="insuredFirstName"
                value={form.insuredFirstName}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter first name"
                required
              />
            </div>

            {/* Middle Name (Optional) */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Middle Name <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                name="insuredMiddleName"
                value={form.insuredMiddleName}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter middle name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Last Name *</label>
              <input
                type="text"
                name="insuredLastName"
                value={form.insuredLastName}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
              <label className="block text-sm font-medium text-white mb-1">Email *</label>
              <input
                type="email"
                name="insuredEmail"
                value={form.insuredEmail}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Email"
                required
              />
            </div>
          {/* Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1">Address Line 1 *</label>
            <input
              type="text"
              name="insuredAddressLineOne"
              value={form.insuredAddressLineOne}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter primary address"
              required
            />

            <label className="block text-sm font-medium text-white mb-1">Address Line 2</label>
            <input
              type="text"
              name="insuredAddressLineTwo"
              value={form.insuredAddressLineTwo}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Apartment, suite, building (optional)"
            />
          </div>

          {/* City, State, Country, ZIP */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">City *</label>
              <input
                type="text"
                name="insuredCity"
                value={form.insuredCity}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">State *</label>
              <input
                type="text"
                name="insuredState"
                value={form.insuredState}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="State"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Country *</label>
              <input
                type="text"
                name="insuredCountry"
                value={form.insuredCountry}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Country"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">ZIP Code *</label>
              <input
                type="text"
                name="insuredZIP"
                value={form.insuredZIP}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block mb-2 font-semibold">Age *</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-sm text-white focus:outline-none"
              placeholder="Enter your age"
              min="15"
              required
            />
          </div>
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
  );
};

export default QuickQuote;