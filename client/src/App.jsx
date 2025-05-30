import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Home from './pages/Home';
import Profile from './pages/Profile';
import QuickQuote from './quote/QuickQuote';
import PreQuote from './quote/PreQuote';
import QuoteDisplay from './display/QuoteDisplay';
import ScrollToTop from './utils/ScrollToTop';
import QuoteConfirmation from './confirmation/Confirmation';
import Payment from './payment/Payment';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/intro" element={<PrivateRoute><Intro /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/quote/quick" element={<PrivateRoute><QuickQuote /></PrivateRoute>} />
        <Route path="/quote/pre" element={<PrivateRoute><PreQuote /></PrivateRoute>} />
        <Route path="/display/quotedisplay" element={<PrivateRoute><QuoteDisplay /></PrivateRoute>} />
        <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path="/confirmation" element={<PrivateRoute><QuoteConfirmation /></PrivateRoute>} />
      </Routes>
    </>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
