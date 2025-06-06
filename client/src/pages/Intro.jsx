import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Intro = () => {
  const navigate = useNavigate();
  const [hasSavedQuote, setHasSavedQuote] = useState(false);
  const [pendingQuotes, setPendingQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPendingQuotes, setShowPendingQuotes] = useState(false);

  const getCurrentUserId = () => {
    return localStorage.getItem('userId');
  };

  useEffect(() => {
    const savedQuote = localStorage.getItem('quickQuoteFormData');
    if (savedQuote) {
      setHasSavedQuote(true);
    }

    fetchPendingQuotes();
  }, []);

  const fetchPendingQuotes = async () => {
    try {
      setLoading(true);
      const userId = getCurrentUserId();
      const response = await fetch(`http://localhost:5000/api/pending/user/${userId}?completed=false`);

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPendingQuotes(data.data);
          if (data.data.length > 0) {
            setShowPendingQuotes(true);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching pending quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContinueQuote = (quote) => {
    const { quoteRef, currentQuoteStep, quickQuoteFormData, preQuoteFormData, completedQuoteData } = quote;

    // Store ALL available quote data in localStorage for all components to use
    if (quickQuoteFormData) {
      localStorage.setItem('quickQuoteFormData', JSON.stringify(quickQuoteFormData));
    }
    if (preQuoteFormData) {
      localStorage.setItem('preQuoteFormData', JSON.stringify(preQuoteFormData));
    }
    if (completedQuoteData) {
      localStorage.setItem('completedQuoteData', JSON.stringify(completedQuoteData));
    }

    // Create a complete resumeData object with all available data
    const completeResumeData = {
      quoteRef,
      currentQuoteStep,
      ...quickQuoteFormData,
      ...preQuoteFormData,
      ...completedQuoteData
    };
    localStorage.setItem('isResumeFlow', 'true');
    localStorage.setItem('quoteRef', quoteRef);
    localStorage.setItem('currentQuoteStep', currentQuoteStep);
    localStorage.setItem('completeResumeData', JSON.stringify(completeResumeData));
    localStorage.setItem('quoteData', JSON.stringify(quickQuoteFormData));

    // Navigate based on current step
    switch (currentQuoteStep) {
      case 'quickQuote':
        navigate('/quote/quick', { state: { resumeData: completeResumeData } });
        break;
      case 'preQuote':
        navigate('/quote/pre', { state: { resumeData: completeResumeData } });
        break;
      case 'quoteDisplay':
        navigate('/display/quotedisplay', { state: { resumeData: completeResumeData } });
        break;
      default:
        navigate('/quote/quick', { state: { resumeData: completeResumeData } });
    }
  };

  const handleDeleteQuote = async (quoteRef) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this pending quote?');
    if (!confirmDelete) return;

    try {
      const userId = getCurrentUserId();
      const response = await fetch(`http://localhost:5000/api/pending/delete/${userId}/${quoteRef}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Refresh the pending quotes list
        fetchPendingQuotes();
      } else {
        alert('Failed to delete quote. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      alert('Error deleting quote. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStepDisplayName = (step) => {
    switch (step) {
      case 'quickQuote': return 'Quick Quote';
      case 'preQuote': return 'Pre Quote';
      case 'quoteDisplay': return 'Quote Display';
      default: return step;
    }
  };


  const handleNewQuote = () => {
    navigate('/quote/quick', { state: { resumeData: null } });
  };

  return (
    <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-5xl w-full mt-5 mb-5">
        <div className="bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-10 md:p-12">
          <div className="w-24 h-24 bg-[#03B7B7] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
            Welcome Aboard!
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            You've successfully signed in to the <span className="text-[#03B7B7] font-semibold">Aviation Non-Owned Insurance Portal</span>.
            Easily create quotes, submit risks, and manage referrals with confidence and speed.
          </p>

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Secure Platform</h3>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Quick Quoting</h3>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">User Focused</h3>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Insights & Analytics</h3>
            </div>
          </div>

          {/* Pending Quotes Section */}
          {showPendingQuotes && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Your Pending Quotes</h2>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-20 overflow-hidden">
                {loading ? (
                  <div className="p-6 text-center text-gray-300">Loading pending quotes...</div>
                ) : pendingQuotes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full justify-center items-center">
                      <thead className="bg-white bg-opacity-20">
                        <tr className='justify-center items-center'>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Quote Ref</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Current Step</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Last Updated</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Insured Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white divide-opacity-20">
                        {pendingQuotes.map((quote) => (
                          <tr key={quote.quoteRef} className="hover:bg-white hover:bg-opacity-5">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              {quote.quoteRef}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              <span className="px-2 py-1 bg-[#03B7B7] bg-opacity-20 text-[#03B7B7] rounded-full text-xs">
                                {getStepDisplayName(quote.currentQuoteStep)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              {formatDate(quote.lastUpdated)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                              {quote.quickQuoteFormData?.insuredFirstName
                                ? `${quote.quickQuoteFormData.insuredFirstName}${quote.quickQuoteFormData.insuredLastName ? ' ' + quote.quickQuoteFormData.insuredLastName : ''}`
                                : 'N/A'}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                              <button
                                onClick={() => handleContinueQuote(quote)}
                                className="bg-[#03B7B7] text-white px-3 py-1 rounded-lg hover:bg-opacity-80 transition-colors text-xs"
                              >
                                Continue
                              </button>
                              <button
                                onClick={() => handleDeleteQuote(quote.quoteRef)}
                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-opacity-80 transition-colors text-xs"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-300">No pending quotes found.</div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleNewQuote}
              className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get a New Quote Now!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;