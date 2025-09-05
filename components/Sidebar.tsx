import React from 'react';
import { DashboardIcon, ParseIcon, IndexIcon, QueryIcon, SettingsIcon, LogoutIcon } from '../constants';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

  const links = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'Parse', icon: <ParseIcon /> },
    { name: 'Index', icon: <IndexIcon /> },
    { name: 'Query', icon: <QueryIcon /> },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400">Knowledge AI</h1>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <nav className="flex-grow">
          <p className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase">Menu</p>
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(link.name);
              }}
              className={`flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 rounded-md transition-colors duration-200
                ${
                  activeTab === link.name
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
            >
              {link.icon}
              <span className="mx-4 font-medium">{link.name}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <SettingsIcon />
            <span className="mx-4 font-medium">Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <LogoutIcon />
            <span className="mx-4 font-medium">Logout</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;