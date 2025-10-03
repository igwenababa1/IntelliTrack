import React from 'react';
import { MailIcon, PhoneIcon, MapPinIcon } from './Icons';

interface ContactModalProps {
    onClose: () => void;
}

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

const ContactInfoItem: React.FC<{ icon: React.ReactNode; title: string; content: string; href?: string }> = ({ icon, title, content, href }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-brand-light dark:bg-brand-primary/20 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
            {href ? (
                <a href={href} className="text-brand-secondary dark:text-brand-light hover:underline">{content}</a>
            ) : (
                <p className="text-gray-600 dark:text-gray-300">{content}</p>
            )}
        </div>
    </div>
);


export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg transform transition-all animate-fade-in-slide-up"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 sm:p-6 border-b dark:border-gray-700">
                    <h2 className="text-xl font-bold text-brand-primary dark:text-brand-light">Contact Information</h2>
                    <button onClick={onClose} aria-label="Close contact modal" className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="p-6 sm:p-8 space-y-6">
                    <ContactInfoItem 
                        icon={<MailIcon className="w-6 h-6 text-brand-primary dark:text-brand-light" />}
                        title="Email Us"
                        content="support@intellitrack.app"
                        href="mailto:support@intellitrack.app"
                    />
                    <ContactInfoItem 
                        icon={<PhoneIcon className="w-6 h-6 text-brand-primary dark:text-brand-light" />}
                        title="Call Us"
                        content="+1 (555) 123-4567"
                        href="tel:+15551234567"
                    />
                    <ContactInfoItem 
                        icon={<MapPinIcon className="w-6 h-6 text-brand-primary dark:text-brand-light" />}
                        title="Our Office"
                        content="123 Innovation Drive, Tech City, 10101"
                    />
                </div>
            </div>
        </div>
    );
};