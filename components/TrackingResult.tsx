import React, { useState } from 'react';
import type { TrackingData, TrackingEvent } from '../types';
import { Carrier } from '../types';
import { CarrierIcon, StatusIcon, CheckCircleIcon, TruckIcon, HomeIcon, CopyIcon, CheckIcon, SendIcon, FlagIcon, ArrowRightIcon } from './Icons';
import { Map } from './Map';

interface TrackingResultProps {
  data: TrackingData;
}

const TimelineEvent: React.FC<{ event: TrackingEvent; isLast: boolean }> = ({ event, isLast }) => {
  return (
    <li className="mb-10 ms-6 flex items-start">
      <span className={`absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-8 ring-white dark:ring-gray-800 ${isLast ? 'bg-brand-secondary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
        <StatusIcon status={event.status} isCurrent={isLast} />
      </span>
      <div className="ml-4">
        <h3 className={`text-lg font-semibold ${isLast ? 'text-brand-primary dark:text-brand-light' : 'text-gray-900 dark:text-white'}`}>{event.status}</h3>
        <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{event.location}</p>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{event.date} at {event.time}</time>
        <p className="text-base font-normal text-gray-600 dark:text-gray-300">{event.description}</p>
      </div>
    </li>
  );
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const lowerCaseStatus = status.toLowerCase();
    let bgColor = 'bg-gray-100 dark:bg-gray-700';
    let textColor = 'text-gray-800 dark:text-gray-200';
    let icon = <SendIcon className="h-4 w-4" />;
    let text = status;

    if (lowerCaseStatus.includes('delivered')) {
        bgColor = 'bg-green-100 dark:bg-green-900/50';
        textColor = 'text-green-800 dark:text-green-300';
        icon = <CheckCircleIcon className="h-4 w-4" />;
        text = 'Delivered';
    } else if (lowerCaseStatus.includes('out for delivery')) {
        bgColor = 'bg-blue-100 dark:bg-blue-900/50';
        textColor = 'text-blue-800 dark:text-blue-300';
        icon = <HomeIcon className="h-4 w-4" />;
        text = 'Out for Delivery';
    } else if (lowerCaseStatus.includes('transit')) {
        bgColor = 'bg-indigo-100 dark:bg-indigo-900/50';
        textColor = 'text-indigo-800 dark:text-indigo-300';
        icon = <TruckIcon className="h-4 w-4" />;
        text = 'In Transit';
    } else if (lowerCaseStatus.includes('picked up') || lowerCaseStatus.includes('shipper created a label') || lowerCaseStatus.includes('acceptance')) {
        bgColor = 'bg-yellow-100 dark:bg-yellow-900/50';
        textColor = 'text-yellow-800 dark:text-yellow-300';
        icon = <SendIcon className="h-4 w-4" />;
        text = 'Shipped';
    }

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${bgColor} ${textColor}`}>
            {icon}
            <span>{text}</span>
        </div>
    );
};

const StatusProgressBar: React.FC<{ status: string }> = ({ status }) => {
    const steps = ['Shipped', 'In Transit', 'Out for Delivery', 'Delivered'];
    const lowerCaseStatus = status.toLowerCase();
    
    let currentStepIndex = 0;
    if (lowerCaseStatus.includes('delivered')) {
        currentStepIndex = 3;
    } else if (lowerCaseStatus.includes('out for delivery')) {
        currentStepIndex = 2;
    } else if (lowerCaseStatus.includes('transit')) {
        currentStepIndex = 1;
    } else if (lowerCaseStatus.includes('picked up') || lowerCaseStatus.includes('shipper created a label') || lowerCaseStatus.includes('acceptance')) {
        currentStepIndex = 0;
    }

    const icons = [
        <SendIcon />,
        <TruckIcon />,
        <HomeIcon />,
        <CheckCircleIcon />
    ];

    return (
        <div className="my-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Shipment Progress</h3>
            <div className="flex items-center">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    
                    return (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center w-1/4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    isCompleted ? 'bg-green-500 border-green-500 text-white' : ''
                                } ${
                                    isCurrent ? 'bg-brand-secondary border-brand-secondary text-white shadow-lg scale-110 animate-pulse' : ''
                                } ${
                                    !isCompleted && !isCurrent ? 'bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-500 dark:text-gray-400' : ''
                                }`}>
                                    {isCompleted ? <CheckIcon className="w-6 h-6" /> : React.cloneElement(icons[index], { className: 'w-6 h-6' })}
                                </div>
                                <p className={`mt-2 text-xs sm:text-sm text-center font-semibold transition-colors duration-300 ${
                                    isCurrent ? 'text-brand-primary dark:text-brand-light' : 'text-gray-600 dark:text-gray-300'
                                }`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`flex-1 h-1 rounded mx-1 sm:mx-2 transition-colors duration-500 ${
                                    isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-600'
                                }`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export const TrackingResult: React.FC<TrackingResultProps> = ({ data }) => {
  const reversedHistory = [...data.history].reverse();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.trackingNumber).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy tracking number: ', err);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in-slide-up">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6 pb-6 border-b dark:border-gray-700">
        <div>
          <div className="flex items-center mb-2">
            <CarrierIcon carrier={data.carrier} />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white ml-3">{data.carrier} Shipment</h2>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-gray-500 dark:text-gray-400 font-mono">{data.trackingNumber}</p>
            <button
                onClick={handleCopy}
                aria-label="Copy tracking number"
                className="p-1.5 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary transition-all"
            >
                {isCopied ? (
                    <CheckIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                    <CopyIcon className="h-5 w-5" />
                )}
            </button>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 text-left sm:text-right">
          <StatusBadge status={data.status} />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Estimated Delivery: <span className="font-semibold text-brand-primary dark:text-brand-light">{data.estimatedDelivery}</span></p>
        </div>
      </div>

      <div className="bg-brand-light dark:bg-brand-primary/20 p-4 rounded-lg mb-8">
        <h3 className="font-semibold text-brand-primary dark:text-brand-light mb-1 text-lg">AI Summary</h3>
        <p className="text-gray-700 dark:text-gray-300">{data.summary || 'Summary is being generated...'}</p>
      </div>

      <StatusProgressBar status={data.status} />

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Shipment Route</h3>
        <div className="flex items-center justify-around bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
            <div className="text-center">
                <FlagIcon countryCode={data.origin.countryCode} className="w-12 h-8 mx-auto mb-2 rounded" />
                <p className="font-semibold text-gray-800 dark:text-white">{data.origin.city}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{data.origin.country}</p>
            </div>
            <ArrowRightIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            <div className="text-center">
                <FlagIcon countryCode={data.destination.countryCode} className="w-12 h-8 mx-auto mb-2 rounded" />
                <p className="font-semibold text-gray-800 dark:text-white">{data.destination.city}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{data.destination.country}</p>
            </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Live Location</h3>
        <Map location={data.currentLocation} address={data.destinationAddress} />
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Shipment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Service</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{data.service || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weight</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{data.weight || 'N/A'}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Dimensions</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">{data.dimensions || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Tracking History</h3>
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {reversedHistory.map((event, index) => (
            <TimelineEvent key={index} event={event} isLast={index === 0} />
          ))}
        </ol>
      </div>
    </div>
  );
};
