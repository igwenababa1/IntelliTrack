
import React, { useState } from 'react';
import { BoxIcon, GoogleIcon } from './Icons';

interface LoginPageProps {
    onLogin: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would handle authentication here
        onLogin();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
            <div className="max-w-md w-full mx-auto">
                <div className="flex justify-center mb-6">
                    <BoxIcon className="h-12 w-12 text-brand-primary dark:text-brand-light" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-primary dark:text-brand-light">
                    {isSignUp ? 'Create your account' : 'Sign in to your account'}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
                    Or{' '}
                    <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-brand-secondary hover:text-brand-primary dark:hover:text-brand-light">
                        {isSignUp ? 'sign in to your existing account' : 'start tracking for free'}
                    </button>
                </p>
            </div>

            <div className="mt-8 max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                            placeholder="Email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-brand-secondary focus:border-brand-secondary sm:text-sm"
                            placeholder="Password"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-brand-secondary focus:ring-brand-secondary border-gray-300 dark:border-gray-600 rounded bg-gray-100 dark:bg-gray-700"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>

                        {!isSignUp && (
                            <div className="text-sm">
                                <a href="#" className="font-medium text-brand-secondary hover:text-brand-primary dark:hover:text-brand-light">
                                    Forgot your password?
                                </a>
                            </div>
                        )}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                        >
                            {isSignUp ? 'Create Account' : 'Sign In'}
                        </button>
                    </div>
                </form>
                
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={onLogin}
                            aria-label="Sign in with Google"
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                           <GoogleIcon className="h-5 w-5 mr-2" />
                            <span>Sign up with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};