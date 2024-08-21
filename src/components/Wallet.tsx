import React from 'react';
import { AccordionItem } from './Accordian';
export const Wallet: React.FC = () => {
    return (
        <div>
            <AccordionItem
                title="What is Flowbite?"
                content={
                    <>
                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                            Flowbite is an open-source library of interactive components...
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out this guide to learn how to{' '}
                            <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a>...
                        </p>
                    </>
                }
            />
        </div>
    );
};


