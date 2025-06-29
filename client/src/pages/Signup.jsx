import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react';
import OAuth from '../components/OAuth';
import {apiFetch} from '../utils/api';


export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await apiFetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className='min-h-screen py-20 bg-pink-50 lg:bg-pink-50 bg-gradient-to-r from-pink-50 to-rose-200 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-8 md:items-center'>
        {/* Left Side */}
        <div className='flex-1'> 
          <Link to="/" className="font-bold dark:text-white test-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
              Manisha's Blog
            </span>
          </Link>
          <p>Hi, I'm Manisha — welcome to my little corner of the internet!
          Here, I share what I'm learning as I navigate the world of web development, programming languages, machine learning, and all the fascinating tech in between.
          This blog is a mix of hands-on lessons, personal insights, and practical tips that have helped me along the way — and I hope they help you too. Whether you're just getting started or deep in the code jungle, there's something here for you.</p>
        </div>

        {/* Right Side (Form) */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label>Your Username</Label>
              <TextInput 
                type='text' 
                placeholder='Username' 
                id='username' 
                onChange={handleChange}
              />
            </div>
            <div>
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
                placeholder='Password' 
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
                'Sign Up'
              )}
            </Button>
            <OAuth/>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an account?</span>
            <Link to='/signin' className='text-blue-500'>Sign In</Link>
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