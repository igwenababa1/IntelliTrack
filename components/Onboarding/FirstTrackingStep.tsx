

import React from 'react';
import { BoxIcon } from '../Icons';
import { TrackingInput } from '../TrackingInput';
import { TrackingResult } from '../TrackingResult';
import { Spinner } from '../Spinner';
import type { TrackingData } from '../../types';

interface FirstTrackingStepProps {
    onTrack: (trackingNumber: string) => void;
    onComplete: () => void;
    isLoading: boolean;
    error: string | null;
    trackingData: TrackingData | null;
    trackingNumber: string;
    setTrackingNumber: (value: string) => void;
}

export const FirstTrackingStep: React.FC<FirstTrackingStepProps> = ({
    onTrack,
    onComplete,
    isLoading,
    error,
    trackingData,
    trackingNumber,
    setTrackingNumber,
}) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center p-4 pt-8 md:pt-16 transition-colors duration-300">
            <header className="mb-8 flex flex-col items-center text-center">
                <BoxIcon className="h-12 w-12 text-brand-primary dark:text-brand-light mb-4" />
                <h1 className="text-3xl md:text-4xl font-extrabold text-brand-primary dark:text-brand-light">
                    Let's Track Your First Package
                </h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                    Enter any UPS, USPS, FedEx, or DHL tracking number below to see the AI summary in action.
                </p>
            </header>

            <main className="w-full max-w-3xl">
                <TrackingInput
                    trackingNumber={trackingNumber}
                    setTrackingNumber={setTrackingNumber}
                    onTrack={() => onTrack(trackingNumber)}
                    isLoading={isLoading}
                />

                <div className="mt-12 text-left">
                    {isLoading && <Spinner />}
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
                    {trackingData && (
                        <div className="animate-fade-in">
                            <TrackingResult data={trackingData} />
                            <div className="mt-8 text-center">
                                <button
                                    onClick={onComplete}
                                    className="group relative inline-flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                >
                                    Continue to Dashboard
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};