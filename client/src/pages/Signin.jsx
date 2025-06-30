import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice.js';
import OAuth from '../components/OAuth.jsx';

export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message || 'Something went wrong'));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message || 'Something went wrong'));
    }
  };

  return (
    <div className='py-20 bg-pink-50 lg:bg-pink-50 bg-gradient-to-r from-pink-50 to-rose-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 min-h-screen'>
      <div className='flex max-w-3xl mx-auto flex-col md:flex-row gap-8 md:items-center'>
        {/* Left Side */}
        <div className='flex-1'> 
          <Link to="/" className="font-bold dark:text-white test-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
              Manisha's Blog
            </span>
          </Link>
          <p>Welcome back! ✨ <br/>
        It's great to see you here again. Dive back into your journey with web development, programming languages, machine learning, and all the tech magic in between. Your next breakthrough is just a login away.
        Let's pick up where you left off — happy coding!</p>
        </div>

        {/* Right Side (Form) */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
               <b><h3>Sign In with your email and password!</h3></b>
              <Label>Your Email</Label>
              <TextInput 
                type='email' 
                placeholder='name@company.com' 
                id='email' 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Your Password</Label>
              <TextInput 
                type='password' 
                placeholder='********' 
                id='password' 
                onChange={handleChange}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-rose-200 to-pink-900 text-white hover:from-rose-300 hover:to-pink-800 transition-all" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Don't have an account?</span>
            <Link to='/signup' className='text-blue-500'>Create Account</Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}