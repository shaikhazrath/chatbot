'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import router for redirecting

const AuthPage = () => {
  const router = useRouter();

  // State for form inputs and UI control
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token'); // Check for JWT in localStorage
        if (!token) {
          throw new Error('No token found');
        }

        // Verify token by calling the /api/auth/user endpoint
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Send token in Authorization header
          }
        });

        if (response.ok) {
          // User is authenticated, redirect to dashboard or home
          router.push('/create'); // Replace with your authenticated route
        } else {
          throw new Error('Invalid token');
        }
      } catch (error) {
        console.error('Auth check error:', error.message);
        // If there's an error, assume user is not authenticated
      } finally {
        setCheckingAuth(false); // Mark auth check as complete
      }
    };

    checkAuthStatus();
  }, [router]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Determine endpoint based on form type
      const endpoint = isLogin
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`;

      // Prepare request
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : formData
        )
      };

      // Send request to server
      const response = await fetch(endpoint, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Something went wrong');
      }

      // Store JWT token in localStorage
      localStorage.setItem('token', data.token);

      // Handle successful response
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');

      // Redirect to dashboard after successful login/registration
      setTimeout(() => {
        router.push('/create'); // Replace with your authenticated route
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-700">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h1>

        {/* Display success/error messages */}
        {message && (
          <div
            className={`mb-4 rounded p-3 text-center ${
              message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name field - only for registration */}
          {!isLogin && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="name">
                Name
              </label>
              <input
                className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}

          {/* Email field */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              className="w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit button */}
          <div className="mb-6">
            <button
              className="w-full rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
            </button>
          </div>

          {/* Form toggle */}
          <div className="text-center text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              onClick={toggleForm}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;