import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { TrackingInput } from './components/TrackingInput';
import { TrackingResult } from './components/TrackingResult';
import { Spinner } from './components/Spinner';
import { identifyCarrier } from './services/trackingService';
import { getTrackingSummary } from './services/geminiService';
import { fetchTrackingData } from './services/trackingService';
import { SettingsModal } from './components/SettingsModal';
import { LoginPage } from './components/LoginPage';
import { WelcomeStep } from './components/Onboarding/WelcomeStep';
import { FirstTrackingStep } from './components/Onboarding/FirstTrackingStep';
import { ContactModal } from './components/ContactModal';
import { CheckCircleIcon, TruckIcon, MapPinIcon } from './components/Icons';
import type { Carrier, TrackingData } from './types';

type Theme = 'light' | 'dark';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; color: string }> = ({ icon, title, description, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border dark:border-gray-700 transform hover:scale-105 transition-transform duration-300 group">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-br ${color} transition-all duration-300 group-hover:scale-110`}>
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
  </div>
);

const HomePlaceholder: React.FC = () => (
    <div className="text-left animate-fade-in-slide-up">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Welcome to Your Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
            Track a new package above, or explore the features that make IntelliTrack powerful and simple.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
                icon={<CheckCircleIcon className="w-6 h-6 text-white" />}
                title="AI Summaries"
                description="Get clear, concise updates on your package's journey without reading through jargon."
                color="from-green-400 to-green-600"
            />
            <FeatureCard 
                icon={<TruckIcon className="w-6 h-6 text-white" />}
                title="Multi-Carrier Support"
                description="One single platform to track all your packages from UPS, USPS, FedEx, and DHL."
                color="from-blue-400 to-blue-600"
            />
            <FeatureCard 
                icon={<MapPinIcon className="w-6 h-6 text-white" />}
                title="Live Location"
                description="Visualize your package's location on a map for a more intuitive tracking experience."
                color="from-purple-400 to-purple-600"
            />
        </div>
    </div>
);


const App: React.FC = () => {
  const [appState, setAppState] = useState<'onboarding' | 'main'>('onboarding');
  const [onboardingStep, setOnboardingStep] = useState<'welcome' | 'auth' | 'first_tracking'>('welcome');
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setOnboardingStep('first_tracking');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // For simplicity, logging out returns to the auth step of onboarding
    setAppState('onboarding');
    setOnboardingStep('auth');
    setTrackingData(null);
    setError(null);
  };

  const handleTrackPackage = useCallback(async (numberToTrack: string) => {
    if (!numberToTrack) {
      setError('Please enter a tracking number.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackingData(null);

    try {
      const carrier = identifyCarrier(numberToTrack);
      if (carrier === 'UNKNOWN') {
        throw new Error('Could not identify the carrier. Please check the tracking number.');
      }

      const data = await fetchTrackingData(numberToTrack, carrier);
      const summary = await getTrackingSummary(data.history);

      setTrackingData({ ...data, summary });

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTrackFromSaved = useCallback((savedNumber: string) => {
    setTrackingNumber(savedNumber);
    setIsSettingsOpen(false);
    handleTrackPackage(savedNumber);
  }, [handleTrackPackage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSettingsOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (appState === 'onboarding') {
    switch (onboardingStep) {
        case 'welcome':
            return <WelcomeStep onNext={() => setOnboardingStep('auth')} />;
        case 'auth':
            return <LoginPage onLogin={handleLogin} />;
        case 'first_tracking':
            return (
                <FirstTrackingStep
                    onTrack={handleTrackPackage}
                    isLoading={isLoading}
                    error={error}
                    trackingData={trackingData}
                    trackingNumber={trackingNumber}
                    setTrackingNumber={setTrackingNumber}
                    onComplete={() => setAppState('main')}
                />
            );
        default:
            return <WelcomeStep onNext={() => setOnboardingStep('auth')} />;
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300">
      <Header 
        onSettingsClick={() => setIsSettingsOpen(true)}
        isAuthenticated={isAuthenticated}
        onSignOut={handleLogout}
      />
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary dark:text-brand-light mb-2">
            AI-Powered Package Tracking
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Get instant, intelligent summaries of your shipment's journey.
          </p>

          <TrackingInput
            trackingNumber={trackingNumber}
            setTrackingNumber={setTrackingNumber}
            onTrack={() => handleTrackPackage(trackingNumber)}
            isLoading={isLoading}
          />

          <div className="mt-12 text-left">
            {isLoading && <Spinner />}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}
            {trackingData && <TrackingResult data={trackingData} />}
            {!isLoading && !error && !trackingData && <HomePlaceholder />}
          </div>
        </div>
      </main>
      {isSettingsOpen && (
        <SettingsModal
          onClose={() => setIsSettingsOpen(false)}
          onTrackFromSaved={handleTrackFromSaved}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
      )}
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
      <footer className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
        <p>Built with React, Tailwind CSS, and the Gemini API.</p>
        <button onClick={() => setIsContactOpen(true)} className="mt-2 text-brand-secondary hover:underline dark:text-brand-light">Contact Us</button>
      </footer>
    </div>
  );
};

export default App;