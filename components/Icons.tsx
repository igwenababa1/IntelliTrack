import React from 'react';
import { Carrier } from '../types';

export const CarrierIcon: React.FC<{ carrier: Carrier; className?: string }> = ({ carrier, className = "w-10 h-10" }) => {
  if (carrier === Carrier.UPS) {
    return (
        <svg className={`${className} text-[#351C15]`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.583 3.033h4.482c1.47 0 2.41.22 3.161.733a3.5 3.5 0 011.313 1.303c.513.75.723 1.69.723 3.161v5.619h-3.801v-4.521c0-.84-.14-1.42-.42-1.74a1.8 1.8 0 00-1.283-.49h-3.001v6.751h-5.26V7.41c0-1.47.22-2.41.733-3.16a3.5 3.5 0 011.303-1.314c.75-.513 1.69-.723 3.16-.723m11.378 12.378c.84 0 1.42-.14 1.74-.42.27-.28.48-.83.48-1.71V7.41c0-1.47-.22-2.41-.733-3.16a3.5 3.5 0 00-1.303-1.314c-.75-.513-1.69-.723-3.16-.723h-4.512v5.3h3.001c.84 0 1.42.14 1.74.42.28.28.49.83.49 1.71v3.831h-6.751v5.26h7.025Z"></path>
        </svg>
    );
  }
  if (carrier === Carrier.USPS) {
    return (
        <svg className={`${className} text-[#004B87]`} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m18.26 15.15-4.14-4.14L22 3.12 18.26 15.15M12 12l-4.14-4.14L2 15.75l6.39-1.39L12 12m0 0 3.75 3.75L18.87 2 12 12M5.74 8.85l4.14 4.14-7.76 2.12 3.62-6.26Z"></path>
        </svg>
    );
  }
  if (carrier === Carrier.FedEx) {
    return (
        <svg className={className} viewBox="0 0 250 125" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2">
            <path d="M-.001-.001h250v125H-.001z" fill="#4d148c" transform="matrix(.99999 0 0 .99999 .001 .001)"/>
            <g transform="matrix(2.4 0 0 2.4 -24 -24)">
                <path d="M22.51 22.84h-4.3v19.45h4.3v-8.12h3.29c3.78 0 6.57-2.52 6.57-6.32s-2.79-6.01-6.57-6.01zm0 8.35v-4.18h3.29c1.43 0 2.31 1.05 2.31 2.09s-.88 2.09-2.31 2.09h-3.29zM40.75 30.04c-.33-2.61-2.02-4.12-4.78-4.12s-5.28 2.29-5.28 5.3v.1c0 3.22 2.3 5.3 5.54 5.3 2.59 0 4.56-1.46 4.9-3.86h-4.4c-.1.88-.8 1.46-1.74 1.46-.88 0-1.6-.61-1.6-1.62v-.1c0-1.05.72-1.62 1.78-1.62h4.58zm-1.12-7.09c.9-1.02 2.25-1.6 3.86-1.6 2.11 0 3.83 1.14 3.83 3.12 0 1.21-.6 2.01-1.48 2.51l1.95 5.86h-4.63l-1.62-4.88h-2v4.88h-4.28V22.08h6.35l.02-.02zM58.91 41.4h4.3V22.08h-4.3v19.32zm8.12-19.32h4.28v19.32h-4.28V22.08zm9.58 0h4.28v14.18h6.12v4.25h-10.4V22.08z" fill="#fff"/>
                <path d="M50.41 30.43H48.3l5.38-8.35h4.43l-5.4 8.35z" fill="#ff6600"/>
            </g>
        </svg>
    );
  }
   if (carrier === Carrier.DHL) {
    return (
        <svg className={className} viewBox="0 0 110 50" xmlns="http://www.w3.org/2000/svg">
            <rect width="110" height="50" fill="#FFCC00"/>
            <path d="M10 15 H 25 L 30 20 V 30 L 25 35 H 10 Z" fill="#D40511"/>
            <path d="M35 15 H 50 V 35 H 35 Z" fill="#D40511"/>
            <path d="M55 15 L 70 15 L 75 25 L 70 35 L 55 35 L 60 25 Z" fill="#D40511"/>
            <path d="M80 15 H 95 V 35 H 80 Z" fill="#D40511"/>
            <path d="M100 15 H 105 L 100 25 L 105 35 H 100 Z" fill="#D40511" stroke="#D40511" stroke-width="2"/>
        </svg>
    );
  }
  return null;
};

export const StatusIcon: React.FC<{ status: string; isCurrent: boolean; className?: string }> = ({ status, isCurrent, className = "w-5 h-5" }) => {
    const iconColor = isCurrent ? 'currentColor' : 'text-gray-500';

    if (status.toLowerCase().includes('delivered')) {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
    }
    if (status.toLowerCase().includes('transit')) {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>;
    }
    if (status.toLowerCase().includes('picked up')) {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"></path><circle cx="12" cy="10" r="3"></circle><circle cx="12" cy="12" r="10"></circle></svg>
    }
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
};

export const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

export const TruckIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="1" y="3" width="15" height="13"></rect>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
        <circle cx="5.5" cy="18.5" r="2.5"></circle>
        <circle cx="18.5" cy="18.5" r="2.5"></circle>
    </svg>
);

export const PackageBoxIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

export const HomeIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className = "h-4 w-4" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

export const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
);

export const SignOutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

export const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238
	C42.775,34.917,44,30.038,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

export const FlagIcon: React.FC<{ countryCode: string, className?: string }> = ({ countryCode, className }) => {
    switch (countryCode.toUpperCase()) {
        case 'US':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className={className}>
                    <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
                    <path d="M0 0v30h60V0z" fill="#00247d"/>
                    <g clipPath="url(#a)">
                        <path d="M0 0v3h60V0zm0 6v3h60V6zm0 6v3h60v-3zm0 6v3h60v-3zm0 6v3h60v-3zm0 6v3h60v-3z" fill="#fff"/>
                        <path d="M0 3v3h60V3zm0 6v3h60V9zm0 6v3h60v-3zm0 6v3h60v-3zm0 6v3h60v-3z" fill="#cf142b"/>
                        <path d="M0 0v15h24V0z" fill="#fff"/>
                        <path d="M4 1.5h2.8L5.4 4 6.8 1.5h2.8l-2.2 2.5 1 3.5-2.8-1.8L3 7.5l1-3.5zm10 0h2.8L15.4 4 16.8 1.5h2.8l-2.2 2.5 1 3.5-2.8-1.8-2.8 1.8 1-3.5zm-5 3h2.8L10.4 7l1.4-2.5h2.8l-2.2 2.5 1 3.5-2.8-1.8L9 10l1-3.5zm10 0h2.8L20.4 7l1.4-2.5h2.8l-2.2 2.5 1 3.5-2.8-1.8-2.8 1.8 1-3.5zM4 7.5h2.8L5.4 10l1.4-2.5h2.8l-2.2 2.5 1 3.5-2.8-1.8L3 13.5l1-3.5zm10 0h2.8L15.4 10l1.4-2.5h2.8l-2.2 2.5 1 3.5-2.8-1.8-2.8 1.8 1-3.5z" fill="#00247d"/>
                    </g>
                </svg>
            );
        case 'CA':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 500" className={className}>
                    <path fill="#d52b1e" d="M0 0h250v500H0zM750 0h250v500H750z"/>
                    <path fill="#fff" d="M250 0h500v500H250z"/>
                    <path fill="#d52b1e" d="M500 80l-45 45-90-45v90l-90-45-45 45 45 45-45 45 90 45 45-90 45 90 90-45-45-45 45-45-90 45v-90l90 45z"/>
                </svg>
            );
        case 'MX':
            return (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 5" className={className}>
                    <path fill="#006847" d="M0 0h3v5H0z"/>
                    <path fill="#fff" d="M3 0h3v5H3z"/>
                    <path fill="#CE1126" d="M6 0h3v5H6z"/>
                    <path d="M4.5 2.05a.45.45 0 00-.23.09.42.42 0 00-.17.36v.1a.42.42 0 00.17.36.45.45 0 00.46 0 .42.42 0 00.17-.36v-.1a.42.42 0 00-.17-.36.45.45 0 00-.23-.09z" fill="#C19A6B"/>
                </svg>
            );
        default:
            return (
                <div className={`flex items-center justify-center bg-gray-300 text-gray-500 font-bold ${className}`}>
                    {countryCode}
                </div>
            );
    }
};

export const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
);

export const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export const ImageIcon: React.FC<{ className?: string }> = ({ className = "h-6 w-6 text-brand-secondary" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);

export const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);