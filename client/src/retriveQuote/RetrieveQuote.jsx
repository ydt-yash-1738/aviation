import { useState } from 'react';

const RetrieveQuote = () => {
  const [formData, setFormData] = useState({
    insuredFirstName: '',
    effectiveDate: '',
    policyNumber: '',
    quoteRef: '',
  });

  const [quotes, setQuotes] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();

    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim()) params.append(key, value.trim());
    });

    const response = await fetch(`http://localhost:5000/api/quote/search?${params.toString()}`);
    const data = await response.json();
    setQuotes(data);
    setSearched(true);
  };

  const handleClear = () => {
    setFormData({
      insuredFirstName: '',
      effectiveDate: '',
      policyNumber: '',
      quoteRef: '',
    });
    setQuotes([]);
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-[#1A2C47] text-white p-8">
      <h2 className="text-2xl font-bold mb-4">Retrieve Quote</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#144074] border border-[#03B7B7] focus:outline-none"
        />
        <input
          type="date"
          name="effectiveDate"
          value={formData.effectiveDate}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#144074] border border-[#03B7B7] focus:outline-none"
        />
        <input
          type="text"
          name="policyNumber"
          placeholder="Policy Number"
          value={formData.policyNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#144074] border border-[#03B7B7] focus:outline-none"
        />
        <input
          type="text"
          name="quoteRef"
          placeholder="Quote Reference"
          value={formData.quoteRef}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-[#144074] border border-[#03B7B7] focus:outline-none"
        />
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>

      {searched && quotes.length === 0 && (
        <p className="text-red-500">No matching quotes found.</p>
      )}

      {quotes.length > 0 && (
        <div className="overflow-x-auto mt-6 rounded-lg shadow-lg">
          <table className="min-w-full bg-[#144074] text-white border border-[#03B7B7]">
            <thead>
              <tr className="bg-[#03B7B7] text-[#1A2C47] text-left">
                <th className="py-3 px-5 w-48">Policy Number</th>
                <th className="py-3 px-5 w-40">First Name</th>
                <th className="py-3 px-5 w-40">Last Name</th>
                <th className="py-3 px-5 w-32">Premium</th>
                <th className="py-3 px-5 w-64">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote, index) => (
                <tr key={index} className="border-t border-[#03B7B7] hover:bg-[#1f3a5a] transition-colors">
                  <td className="py-3 px-5">{quote.policyNumber}</td>
                  <td className="py-3 px-5">{quote.insuredFirstName}</td>
                  <td className="py-3 px-5">{quote.insuredLastName}</td>
                  <td className="py-3 px-5">${quote.premium}</td>
                  <td className="py-3 px-5">
                    <div className="flex gap-4">
                      <a href="#" className="text-blue-300 hover:text-blue-500 underline">Adjust Policy</a>
                      <a href="#" className="text-green-300 hover:text-green-500 underline">MTA</a>
                      <a href="#" className="text-red-300 hover:text-red-500 underline">Cancellation</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      )}
    </div>
  );
};

export default RetrieveQuote;
