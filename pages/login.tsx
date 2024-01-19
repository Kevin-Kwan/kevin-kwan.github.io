import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();
  useEffect(() => {
    // If the user is already logged in, redirect to the blog post page
    const token = Cookies.get('token');
    if (token) {
      router.push('/new-post');
    }
  }, [router]);
  const handleInputChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setResponse(''); // Clear the response when the user types
    };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Send a request to your API to authenticate the user
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setResponse('');
      // Store the token in local storage (or in a cookie)
      const domain =
        process.env.NODE_ENV === 'production' ? 'kevin-kwan.tech' : 'localhost';

      Cookies.set('token', data.token, { domain: domain, sameSite: 'lax' });
      // Redirect the user to the blog post page (or wherever you want)
      router.push('/new-post');
    } else {
      // Handle error
      const errorData = await response.json();
      setResponse(errorData.message);
      console.error(errorData.message);
    }
  };

  return (
    <main
      className="flex items-center justify-center h-screen bg-gray-200 px-6"
      style={{ paddingTop: '5rem' }}
    >
      <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-md">
        <div className="flex justify-center items-center">
          <span className="text-gray-700 font-semibold text-2xl">Login</span>
        </div>
        {response && (
          <div className="mt-2 text-sm text-red-600">{response}</div>
        )}
        <form className="mt-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-gray-700 text-sm">Username</span>
            <input
              type="text"
              className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black"
              placeholder="Username"
              value={username}
              onChange={handleInputChange(setUsername)}
            />
          </label>
          <label className="block mt-3">
            <span className="text-gray-700 text-sm">Password</span>
            <input
              type="password"
              className="form-input mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-black"
              placeholder="Password"
              value={password}
              onChange={handleInputChange(setPassword)}
            />
          </label>
          <div className="mt-6">
            <button
              type="submit"
              className="py-2 px-4 text-center bg-blue-600 rounded-md w-full text-white text-sm hover:bg-blue-500 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
