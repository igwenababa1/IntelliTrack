import React, { useState } from 'react';
import { MOCK_SAVED_PACKAGES } from '../constants';
import { SunIcon, MoonIcon, ImageIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const FingerprintIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-secondary"><path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4"/><path d="M5 19.5A8.5 8.5 0 0 1 12 11a8.5 8.5 0 0 1 7 8.5"/><path d="M12 11v11"/><path d="M7 11a5 5 0 0 1 10 0"/></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-secondary"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-secondary"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const AppearanceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-brand-secondary"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;

const InTransitIllustration = () => (
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 90 H 200" stroke="#a0aec0" strokeWidth="2" strokeDasharray="4"/>
        <g className="animate-drive">
            <rect x="70" y="60" width="60" height="30" fill="#cbd5e0"/>
            <rect x="130" y="70" width="20" height="20" fill="#e2e8f0"/>
            <circle cx="85" cy="90" r="5" fill="#4a5568"/>
            <circle cx="125" cy="90" r="5" fill="#4a5568"/>
        </g>
    </svg>
);

const DeliveredIllustration = () => (
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(60, 20)">
            <path d="M30,80 V40 H40 L50,30 H70 L80,40 V80 H30 Z" fill="#e2e8f0" stroke="#a0aec0" strokeWidth="1"/>
            <circle cx="55" cy="20" r="10" fill="#f7fafc" stroke="#a0aec0" strokeWidth="1"/>
            <g className="animate-pulse-package">
                <rect x="0" y="60" width="25" height="20" fill="#c4a287" stroke="#8b5e3c" strokeWidth="1"/>
                <line x1="0" y1="70" x2="25" y2="70" stroke="#8b5e3c" strokeWidth="1"/>
            </g>
        </g>
    </svg>
);

const journeySteps = [
    { title: 'In Transit', description: 'Your package is on its way.', illustration: <InTransitIllustration /> },
    { title: 'Delivered', description: 'Successfully delivered.', illustration: <DeliveredIllustration /> },
];


interface SettingsModalProps {
    onClose: () => void;
    onTrackFromSaved: (trackingNumber: string) => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onTrackFromSaved, theme, onToggleTheme }) => {
    const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would save the data
        alert('Information saved!');
        onClose();
    };
    
    const handleBiometricsToggle = () => {
        if (!isBiometricsEnabled) {
            // Simulate biometric prompt when enabling
            if (window.confirm('Do you want to enable Biometric Unlock? This will require FaceID/TouchID to proceed.')) {
                setIsBiometricsEnabled(true);
            }
        } else {
            // No prompt needed to disable
            setIsBiometricsEnabled(false);
        }
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % journeySteps.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + journeySteps.length) % journeySteps.length);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all animate-fade-in-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 flex justify-between items-center p-4 sm:p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-brand-primary dark:text-brand-light">Advanced Settings</h2>
                    <button onClick={onClose} aria-label="Close settings" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="p-4 sm:p-6 space-y-8">
                    {/* Section: Journey Visualizer */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <ImageIcon />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Shipment Journey Visualizer</h3>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
                            <div className="relative h-32 w-full overflow-hidden">
                                {journeySteps.map((step, index) => (
                                    <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                        {step.illustration}
                                    </div>
                                ))}
                            </div>
                             <div className="flex justify-between items-center mt-2">
                                <button onClick={prevSlide} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <ChevronLeftIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                </button>
                                <div className="text-center">
                                    <p className="font-semibold text-gray-800 dark:text-white">{journeySteps[currentSlide].title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{journeySteps[currentSlide].description}</p>
                                </div>
                                <button onClick={nextSlide} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <ChevronRightIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Appearance */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <AppearanceIcon />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Appearance</h3>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="theme-toggle" className="font-medium text-gray-700 dark:text-gray-200">Dark Mode</label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce glare and improve readability.</p>
                                 </div>
                                <button
                                    id="theme-toggle"
                                    onClick={onToggleTheme}
                                    className="relative inline-flex h-8 w-14 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                    role="switch"
                                    aria-checked={theme === 'dark'}
                                >
                                    <span className="sr-only">Toggle dark mode</span>
                                    <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}><SunIcon className="h-5 w-5 text-yellow-500" /></span>
                                    <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}><MoonIcon className="h-5 w-5 text-brand-secondary" /></span>
                                    <span className={`${theme === 'dark' ? 'translate-x-3' : '-translate-x-3'} inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform`}/>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Section: Biometrics */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <FingerprintIcon />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Biometrics & Security</h3>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg border dark:border-gray-600">
                            <div className="flex justify-between items-center">
                                <div>
                                    <label htmlFor="biometrics-toggle" className="font-medium text-gray-700 dark:text-gray-200">Enable Biometric Unlock</label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Use FaceID or TouchID for quick access.</p>
                                </div>
                                <button
                                    id="biometrics-toggle"
                                    onClick={handleBiometricsToggle}
                                    className={`${isBiometricsEnabled ? 'bg-brand-secondary' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
                                    role="switch"
                                    aria-checked={isBiometricsEnabled}
                                >
                                    <span className={`${isBiometricsEnabled ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}/>
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
                                * In a real application, enabling this would require biometric verification upon app launch for added security.
                            </p>
                        </div>
                    </section>
                    
                    {/* Section: Information Form */}
                    <section>
                         <div className="flex items-center gap-4 mb-4">
                            <UserIcon />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">My Information</h3>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                <input type="text" id="fullName" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="John Doe" />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Address</label>
                                <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-secondary focus:border-brand-secondary bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="123 Main St, Anytown, USA"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-brand-secondary hover:bg-brand-primary text-white font-bold py-2 px-4 rounded-lg transition duration-300">Save Information</button>
                        </form>
                    </section>
                    
                    {/* Section: Click to Track */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <PackageIcon />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Click to Track My Packages</h3>
                        </div>
                        <ul className="space-y-2">
                           {MOCK_SAVED_PACKAGES.map(pkg => (
                               <li key={pkg.number}>
                                   <button onClick={() => onTrackFromSaved(pkg.number)} className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-brand-light dark:hover:bg-brand-primary/20 border dark:border-gray-600 rounded-lg transition-colors group">
                                       <p className="font-semibold text-brand-primary dark:text-brand-light group-hover:text-brand-primary dark:group-hover:text-white">{pkg.name}</p>
                                       <p className="font-mono text-sm text-gray-600 dark:text-gray-400">{pkg.number}</p>
                                   </button>
                               </li>
                           ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};