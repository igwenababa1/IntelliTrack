

import React from 'react';
import { BoxIcon, CheckCircleIcon } from '../Icons';

interface WelcomeStepProps {
    onNext: () => void;
}

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-center space-x-3">
        <CheckCircleIcon className="h-6 w-6 text-green-500" />
        <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </li>
);

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4 transition-colors duration-300">
            <div className="max-w-2xl w-full bg-white dark:bg-gray-800 p-8 md:p-12 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl text-center animate-fade-in-slide-up">
                <div className="flex justify-center mb-6">
                    <BoxIcon className="h-14 w-14 text-brand-primary dark:text-brand-light" />
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-brand-light">
                    Welcome to IntelliTrack
                </h1>
                <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
                    The smartest, simplest way to track your packages.
                </p>

                <div className="my-8 text-left">
                    <ul className="space-y-4">
                        <Feature>
                            <strong className="dark:text-white">AI-Powered Summaries:</strong> Get quick, easy-to-understand updates on your shipment's status.
                        </Feature>
                        <Feature>
                            <strong className="dark:text-white">Multi-Carrier Support:</strong> Track all your UPS, USPS, FedEx, and DHL packages in one place.
                        </Feature>
                        <Feature>
                            <strong className="dark:text-white">Sleek & Modern Interface:</strong> Enjoy a beautiful and intuitive tracking experience.
                        </Feature>
                    </ul>
                </div>

                <button
                    onClick={onNext}
                    className="w-full md:w-auto group relative flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-full text-white bg-brand-secondary hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};