
import React from 'react';

interface TrackingInputProps {
  trackingNumber: string;
  setTrackingNumber: (value: string) => void;
  onTrack: () => void;
  isLoading: boolean;
}

export const TrackingInput: React.FC<TrackingInputProps> = ({ trackingNumber, setTrackingNumber, onTrack, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTrack();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-xl mx-auto bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value.trim())}
        placeholder="Enter your UPS, USPS, FedEx, or DHL tracking number..."
        className="w-full sm:flex-grow px-6 py-3 text-gray-700 dark:text-gray-200 bg-transparent border-none rounded-full focus:outline-none focus:ring-0"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-primary text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center dark:hover:bg-brand-light dark:hover:text-brand-primary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Tracking...
          </>
        ) : (
          'Track Package'
        )}
      </button>
    </form>
  );
};