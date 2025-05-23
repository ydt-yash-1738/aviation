import { useState } from 'react';
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

  // For react-select, store the selected option objects, or null if nothing selected
  const [form, setForm] = useState({
    coverageType: null,
    extendedCFI: null,
    isAopaMember: null,
    age: '',
  });

  // Handle react-select changes: set selected option object (or null)
  const handleSelectChange = (selectedOption, actionMeta) => {
    setForm((prev) => ({
      ...prev,
      [actionMeta.name]: selectedOption,
    }));
  };

  // Handle native inputs (age)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    const quoteRef = `QUOTE-${Date.now()}`; // Simple unique quoteRef
    const quickQuoteData = {
      quoteRef,
      effectiveDate: form.effectiveDate,
      coverageType: form.coverageType,
      extendedCFI: form.extendedCFI,
      AOPAMember: form.isAopaMember,
      insuredFirstName: form.insuredFirstName,
      insuredLastName: form.insuredLastName,
      insuredAddressLineOne: form.insuredAddressLineOne,
      insuredAddressLineTwo: form.insuredAddressLineTwo,
      insuredCity: form.insuredCity,
      insuredState: form.insuredState,
      insuredCountry: form.insuredCountry,
      insuredZIP: form.insuredZIP
    };

    localStorage.setItem('quickQuoteData', JSON.stringify(quickQuoteData));
    navigate('/quote/pre');
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
            <label className="block mb-2 font-semibold text-white">Effective Date</label>
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
            <label className="block mb-2 font-semibold">Coverage Type</label>
            <Select
              name="aircraftType"
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
            <label className="block mb-2 font-semibold">Extend coverage for CFI Professional Liability?</label>
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
            <label className="block mb-2 font-semibold">Are you an AOPA Member?</label>
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
          {/*Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">First Name</label>
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
                value={form.insuredMiddleName || ' '}
                onChange={handleChange}
                className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter middle name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-1">Last Name</label>
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
          {/*Address */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1">Address Line 1</label>
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
          {/*City*/}
          <div>
            <label className="block text-sm font-medium text-white mb-1">City</label>
            <input
              type="text"
              name="insuredCity"
              value={form.insuredCity}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="City"
            />
          </div>
          {/*State */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">State</label>
            <input
              type="text"
              name="insuredState"
              value={form.insuredState}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="State"
            />
          </div>
          {/*Country */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">Country</label>
            <input
              type="text"
              name="insuredCountry"
              value={form.insuredCountry}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Country"
            />
          </div>
          {/*ZIP Code */}
          <div>
            <label className="block text-sm font-medium text-white mb-1">ZIP Code</label>
            <input
              type="text"
              name="insuredZIP"
              value={form.insuredZIP}
              onChange={handleChange}
              className="w-full rounded-lg bg-white bg-opacity-10 backdrop-blur-md text-white p-2 border border-white border-opacity-20 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="ZIP Code"
            />
          </div>
          {/* Age */}
          <div>
            <label className="block mb-2 font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-blur-sm text-white focus:outline-none"
              placeholder="Enter your age"
              min="15"
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
