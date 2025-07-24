'use client';

import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import Link from 'next/link';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

const SigninForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEyeOpen, setEyeOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setEyeOpen((prev) => !prev);
  };

  return (
    <div className="h-full flex items-center  justify-center bg-transparent px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-neutral-200">
            Create Your <br /> EzyExpense Account
          </h2>
          
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-neutral-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Password</label>
            <div className="relative">
              <input
                type={isEyeOpen ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
                placeholder="••••••••"
              />
              <div
                className="absolute right-3 top-3 text-xl text-neutral-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isEyeOpen ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-400">Confirm Password</label>
            <div className="relative">
              <input
                type={isEyeOpen ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-neutral-700 rounded-lg bg-transparent text-white"
                placeholder="••••••••"
              />
              <div
                className="absolute right-3 top-3 text-xl text-neutral-400 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isEyeOpen ? <IoMdEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-neutral-800 text-white py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-yellow-100 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SigninForm;
