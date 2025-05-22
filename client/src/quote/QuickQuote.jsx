import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const aircraftOptions = [
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
    background: 'rgba(0, 0, 0, 0.8)',
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
    aircraftType: null,
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
    // Example: validation or form processing here
    // To get raw values, you can access form.aircraftType?.value etc.

    // Simple validation example
    if (!form.aircraftType || !form.extendedCFI || !form.isAopaMember || !form.age) {
      alert('Please fill in all fields');
      return;
    }

    // Pass form data forward or save as needed

    navigate('/quote/pre');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 max-w-xl w-full p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 text-white">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Preliminary Quote Information
        </h1>

        <div className="space-y-6">
          {/* Aircraft Type */}
          <div>
            <label className="block mb-2 font-semibold">Aircraft Type</label>
            <Select
              name="aircraftType"
              options={aircraftOptions}
              value={form.aircraftType}
              onChange={handleSelectChange}
              styles={customStyles}
              placeholder="Select aircraft type"
              isClearable
            />
          </div>

          {/* Extended CFI */}
          <div>
            <label className="block mb-2 font-semibold">Extended CFI Professional Liability?</label>
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
            <label className="block mb-2 font-semibold">AOPA Member?</label>
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
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickQuote;
