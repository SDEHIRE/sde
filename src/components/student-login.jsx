import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentLogin() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // State for user inputs
  const [learnerUsername, setLearnerUsername] = useState('');
  const [learnerPassword, setLearnerPassword] = useState('');
  const [recruiterUsername, setRecruiterUsername] = useState('');
  const [recruiterPassword, setRecruiterPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => setVideoLoaded(true));
    }
  }, []);

  const isValidMobileNumber = (number) => /^[0-9]{10}$/.test(number);








  [];





const handleLearnerLogin = async (event) => {
  event.preventDefault();
  setErrorMessage('');
  setLoading(true);

  // Input validation
  if (!learnerUsername || !learnerPassword) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
  }

  try {
      // API call to login endpoint
      const response = await axios.post('http://localhost:5009/api/learner-login', {
          firstName: learnerUsername.trim(),
          mobileNumber: learnerPassword.trim(),
      });

      // Handle response
      if (response.data?.success) {
          const { sessionId, userProfile } = response.data;

          // Store session token and user details in localStorage
          localStorage.setItem('sessionToken', sessionId);
          localStorage.setItem('userProfile', JSON.stringify(userProfile));

          // Redirect to the profile page
          navigate('/profile');
      } else {
          setErrorMessage(response.data?.message || 'Invalid credentials. Please try again.');
      }
  } catch (error) {
      // Distinguish between client-side and server-side errors
      const errorMessage =
          error.response?.status === 404
              ? 'User not found. Please check your credentials.'
              : error.response?.data?.message || 'A server error occurred. Please try again later.';
      setErrorMessage(errorMessage);
  } finally {
      setLoading(false);
  }
};














  const handleRecruiterLogin = (event) => {
    event.preventDefault();
    navigate('/recruiter-dashboard');
  };

  const handleForgetPasswordLearner = () => navigate('/forgot-password-learner');
  const handleForgetPasswordRecruiter = () => navigate('/forgot-password-recruiter');

  const starVariants = {
    glow: {
      opacity: [0.5, 1, 0.5],
      scale: [0.95, 1.05, 0.95],
      filter: [
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))',
        'drop-shadow(0 0 8px rgba(255,215,0,0.9))',
        'drop-shadow(0 0 2px rgba(255,215,0,0.7))',
      ],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 h-screen relative overflow-hidden">
        {!videoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/SdePro/studentlogin.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col bg-white">
        <header className="bg-white p-4 shadow-md">
          <motion.div
            className="relative z-10 text-4xl font-bold text-center pt-8 pb-8 text-black flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Welcome to SDE Hire Pro</h1>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="gold"
              className="w-8 h-8 ml-2"
              variants={starVariants}
              animate="glow"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
          </motion.div>
        </header>

        <div className="flex-grow p-8 flex flex-col items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-center text-xl font-semibold text-[#00B2FF] mb-6">Learner Login</h2>
              <form className="space-y-6" onSubmit={handleLearnerLogin}>
                <div>
                  <label htmlFor="learner-username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    id="learner-username"
                    name="username"
                    type="text"
                    value={learnerUsername}
                    onChange={(e) => setLearnerUsername(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="learner-password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="learner-password"
                    name="password"
                    type="password"
                    value={learnerPassword}
                    onChange={(e) => setLearnerPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 text-white bg-[#00B2FF] hover:bg-[#0090CC] rounded-md"
                >
                  {loading ? 'Loading...' : 'Login'}
                </button>
              </form>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
