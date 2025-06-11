import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

export default function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-8 md:items-center'>
          {/* Left Side */}
          <div className='flex-1'> 
            <Link
              to="/"
              className="font-bold dark:text-white test-4xl"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-rose-200 to-pink-900 rounded-lg text-white">
                Manisha's Blog
              </span>
            </Link>
            <p>Hi, I’m Manisha — welcome to my little corner of the internet!
            Here, I share what I’m learning as I navigate the world of web development, programming languages, machine learning, and all the fascinating tech in between.
            This blog is a mix of hands-on lessons, personal insights, and practical tips that have helped me along the way — and I hope they help you too. Whether you're just getting started or deep in the code jungle, there’s something here for you.</p>
          </div>

          {/* Right Side (Form) */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4'>
              <div>
                <Label>Your Username</Label>
                <TextInput type='text' placeholder='Username' id='username'/>
              </div>
              <div>
                <Label>Your Email</Label>
                <TextInput type='text' placeholder='name@company.com' id='email'/>
              </div>
              <div>
                <Label>Your Password</Label>
                <TextInput type='password' placeholder='Password' id='password'/>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-rose-200 to-pink-900 text-white hover:from-rose-300 hover:to-pink-800 transition-all">
                Sign Up
                </Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>
                Have an account?
              </span>
              <Link to='/signin' className='text-blue-500'>Sign In</Link>
            </div>
          </div>
      </div>
    </div>
  );
}