import { supabase } from '../utils/supabaseClient';

export default function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      
    });

    if (error) {
      console.error('Error logging in:', error.message);
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