import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/intro" element={<PrivateRoute><Intro /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/quote/quick" element={<PrivateRoute><QuickQuote /></PrivateRoute>} />
        <Route path="/quote/pre" element={<PrivateRoute><PreQuote /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
export default App;