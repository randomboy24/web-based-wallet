import React, { useState } from 'react';

interface AccordionProps {
    title: string;
    content: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <h2>
                <button
                    type="button"
                    onClick={toggleAccordion}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                >
                    <span className="flex items-center">
                        {/* Replace this with your icon */}
                        <svg className="w-5 h-5 me-2 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                        </svg>
                        {title}
                    </span>
                    <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div
                className={`p-5 border border-b-0 border-gray-200 dark:border-gray-700 ${isOpen ? '' : 'hidden'}`}
                aria-labelledby="accordion-heading"
            >
                {content}
            </div>
        </div>
    );
};

