
import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-10">
      <div className="w-16 h-16 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
