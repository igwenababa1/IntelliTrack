import React from 'react';
import { MapPinIcon } from './Icons';

interface MapProps {
    location: {
        lat: number;
        lng: number;
    };
    address: string;
}

export const Map: React.FC<MapProps> = ({ location, address }) => {
    return (
        <div className="border dark:border-gray-600 rounded-lg overflow-hidden">
            <div 
                className="relative w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
                style={{
                    backgroundImage: 'url(https://www.gstatic.com/onebox/sports/videos/widgets/map_road_raster_desktop_1x.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 bg-brand-primary/10 dark:bg-black/20"></div>
                <div className="relative text-center animate-pulse">
                    <MapPinIcon className="w-10 h-10 text-red-500 drop-shadow-lg animate-zoom-in-pin" />
                    <span className="absolute -bottom-2 -right-2 flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500"></span>
                    </span>
                </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
                <p className="font-semibold text-gray-800 dark:text-white">Delivery Location</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{address}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic">*Live map view is for illustrative purposes only.</p>
            </div>
        </div>
    );
};