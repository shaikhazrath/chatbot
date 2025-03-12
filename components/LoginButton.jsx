import { supabase } from '../utils/supabaseClient';
import Cookies from 'js-cookie';

export default function LoginButton() {
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
          redirectTo: `https://chatbot-six-mauve.vercel.app/auth/callback`,
      },
  })

  if (data.url) {
      redirect(data.url) 
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