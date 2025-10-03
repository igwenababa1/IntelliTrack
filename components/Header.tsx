
import React from 'react';
import { BoxIcon, SettingsIcon, SignOutIcon } from './Icons';

interface HeaderProps {
    onSettingsClick: () => void;
    isAuthenticated: boolean;
    onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick, isAuthenticated, onSignOut }) => {
  return (
    <header className="bg-brand-primary dark:bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <BoxIcon className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white ml-3">IntelliTrack</h1>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={onSettingsClick} aria-label="Open settings menu" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <SettingsIcon className="h-6 w-6 text-white hover:text-gray-200" />
            </button>
            {isAuthenticated && (
                <button onClick={onSignOut} aria-label="Sign out" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                    <SignOutIcon className="h-6 w-6 text-white hover:text-gray-200" />
                </button>
            )}
        </div>
      </div>
    </header>
  );
};