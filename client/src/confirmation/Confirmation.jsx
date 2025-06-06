import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuoteConfirmation = () => {
  const navigate = useNavigate();
  const [policyNumber, setPolicyNumber] = useState('');

  useEffect(() => {
    const storedPolicyNumber = localStorage.getItem('policyNumber');
    setPolicyNumber(storedPolicyNumber || 'N/A');
  }, []);

  return (
    <div className="min-h-screen bg-[#1A2C47] py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -80 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen flex flex-col items-center justify-center bg-[#1A2C47] p-6"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-[#144074] bg-opacity-40 shadow-xl rounded-2xl p-8 max-w-md text-center"
        >
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Thank You!</h1>
          <p className="text-white mb-4">
            Thank you for choosing <span className="font-semibold text-[#03B7B7]">Skyline</span>.
          </p>
          <p className="text-white mb-4">
            Your policy number is <span className="font-semibold text-[#03B7B7]">{policyNumber}</span>.
          </p>
          <p className="text-white mb-6">
            The policy details have been sent to your registered email address.
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('quickQuoteFormData');
              localStorage.removeItem('quoteRef');
              localStorage.removeItem('completeResumeData');
              localStorage.removeItem('quoteData');
              localStorage.removeItem('policyNumber');
              navigate('/intro');
            }}
            className="bg-[#144074] text-white hover:bg-[#03B7B7] hover:text-[#1A2C47] transition-colors duration-200 border-4 border-[#03B7B7] font-semibold py-3 px-4 rounded-3xl transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Go to Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default QuoteConfirmation;
