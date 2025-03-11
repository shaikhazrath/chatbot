import { supabase } from '../utils/supabaseClient';
import Cookies from 'js-cookie';

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
  
      if (error) {
        console.error('Error logging in:', error.message);
        alert(`Login failed: ${error.message}`);
      } else {
        console.log('Login successful:', data);
      }
    } catch (err) {
      console.error('Unexpected error during login:', err.message);
      alert(`Unexpected error: ${err.message}`);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium text-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      Sign in with Google
    </button>
  );
}