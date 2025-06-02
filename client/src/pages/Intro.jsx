// import { useNavigate } from 'react-router-dom';

// const Intro = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center">
//       <div className="relative z-10 text-center max-w-2xl mx-auto px-4 mt-5 mb-5">
//         <div className="bg-[#144074] bg-opacity-40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white border-opacity-20 p-12">
//           <div className="w-24 h-24 bg-[#03B7B7] rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
// <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
// </svg>
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent mb-4">
//             Welcome Aboard! 
//           </h1>
//           <p className="text-xl text-gray-300 mb-8 leading-relaxed">
//             You’ve successfully signed in to the Aviation Non-Owned Insurance Portal. Easily create quotes, submit risks, and manage referrals with confidence and speed.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
//             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
// <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
// </svg>
//               </div>
//               <h3 className="text-sm font-semibold text-white">Secure Platform</h3>
//             </div>
//             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
//               <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-sm font-semibold text-white">Quick Quoting</h3>
//             </div>
//             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
//               <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-sm font-semibold text-white">User Focused</h3>
//             </div>
//             <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20">
//               <div className="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
//                 <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-sm font-semibold text-white">Insights & Analytics</h3>
//             </div>
//           </div>
//           <button
//             onClick={() => navigate('/quote/quick')}
//             className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
//           >
//             Get Your Quote Now!
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Intro;

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Intro = () => {
  const navigate = useNavigate();
  const [hasSavedQuote, setHasSavedQuote] = useState(false);

  useEffect(() => {
    const savedQuote = localStorage.getItem('quickQuoteFormData');
    if (savedQuote) {
      setHasSavedQuote(true);
    }
  }, []);

  const handleResumeQuote = () => {
    const savedQuote = localStorage.getItem('quickQuoteFormData');
    if (savedQuote) {
      const quote = JSON.parse(savedQuote);
      navigate('/quote/quick', { state: { resumeData: quote } });
    }
  };

  const handleNewQuote = () => {
    const savedQuote = localStorage.getItem('quickQuoteFormData');
    if (savedQuote) {
      const confirmProceed = window.confirm(
        'You have a pending quote. If you start a new quote, the previous one will be deleted. Are you sure you want to continue?'
      );
      if (!confirmProceed) return;

      localStorage.removeItem('partialQuoteData');
      localStorage.removeItem('quickQuoteFormData');
      localStorage.removeItem('quoteRef');
      localStorage.removeItem('preQuoteFormData');
      localStorage.removeItem('completedQuoteData');
      localStorage.removeItem('savedQuoteRef');
      localStorage.removeItem('currentQuoteStep');
      localStorage.removeItem('completeQuoteData');
    }

    navigate('/quote/quick', { state: { resumeData: null } });
  };


  return (
    <div className="min-h-screen bg-[#1A2C47] flex items-center justify-center px-4">
      <div className="relative z-10 text-center max-w-2xl w-full mt-5 mb-5">
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
            You’ve successfully signed in to the <span className="text-[#03B7B7] font-semibold">Aviation Non-Owned Insurance Portal</span>.
            Easily create quotes, submit risks, and manage referrals with confidence and speed.
          </p>

          {/* Feature grid remains unchanged */}
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

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleNewQuote}
              className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get a New Quote Now!
            </button>

            {hasSavedQuote && (
              <button
                onClick={handleResumeQuote}
                className="bg-[#03B7B7] text-[#1A2C47] hover:bg-[#144074] hover:text-white transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-6 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Resume Your Pending Quote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;

