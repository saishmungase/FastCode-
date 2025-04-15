import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const signUp = async (userData: { name: string; email: string; password: string }) => {
  const response = await axios.post('https://coderush-0p5u.onrender.com/api/user/signup', userData);
  return response.data;
};

const signIn = async (credentials: { email: string; password: string }) => {
  const response = await axios.post('https://coderush-0p5u.onrender.com/api/user/signin', credentials);
  return response.data;
};

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  
  const { mutate: signUpMutate, isPending: isSignupLoading, error: signupError } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      localStorage.setItem("user-token", data.token);
      navigate('/');  
    },
  });

  const { mutate: loginMutate, isPending: isLoginLoading, error: loginError } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem("user-token", data.token);
      navigate('/');  
    },
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      signUpMutate({
        name: username,
        email,
        password,
      });
    } else {
      loginMutate({
        email,
        password,
      });
    }
  };

  const isLoading = isSignupLoading || isLoginLoading;
  const error = isLogin ? loginError : signupError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button
            type="submit"  
            disabled={isLoading}
            className={`w-full p-3 rounded-md font-semibold transition 
              ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-2">
              {(error as Error).message}
            </p>
          )}
        </form>

        <p className="mt-6 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={toggleMode}
            className="text-blue-400 hover:underline ml-1"
            type="button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;