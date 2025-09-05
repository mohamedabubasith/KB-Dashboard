import React from 'react';
import { SunIcon, MoonIcon } from '../constants';
import { Theme } from '../types';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: Theme;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        {/* Search Bar can be added here if needed */}
        <div className="relative text-gray-600 focus-within:text-gray-400">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </span>
          <input type="search" name="q" className="py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search..." autoComplete="off" />
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800"
        >
          {currentTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
        <div className="ml-4">
          <button className="flex items-center">
            <img className="object-cover w-8 h-8 rounded-full" src="https://via.placeholder.com/32" alt="User" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;