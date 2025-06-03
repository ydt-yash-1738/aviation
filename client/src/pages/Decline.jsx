import { useNavigate } from 'react-router-dom';

const Decline = () => {
  const navigate = useNavigate();
  const handleDashboard = () => {
  localStorage.removeItem('completeQuoteData');
  localStorage.removeItem('completedQuoteData');
  localStorage.removeItem('currentQuoteStep');
  localStorage.removeItem('partialQuoteData');
  localStorage.removeItem('preQuoteFormData');
  localStorage.removeItem('quickQuoteFormData');
  localStorage.removeItem('quoteRef');
  localStorage.removeItem('savedQuoteRef');
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-2xl w-full mt-5 mb-5">
        <div className="bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-10 md:p-12">
          <div className="w-24 h-24 bg-red-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
            We're Sorry
          </h1>

          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Unfortunately, this risk does not meet our underwriting criteria and cannot be quoted at this time.
          </p>

          <p className="text-base text-gray-400 mb-8">
            If you believe this is an error or would like more information, please contact your underwriter or support team.
          </p>

          <div className="flex justify-center">
            <button
              onClick={handleDashboard}
              className="bg-[#03B7B7] text-[#1A2C47] hover:bg-[#144074] hover:text-white transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Decline;
