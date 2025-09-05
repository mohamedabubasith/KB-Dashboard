import React from 'react';
import { LogoutIcon } from '../constants';

type View = 'dashboard' | 'parse' | 'index' | 'query' | 'settings';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isSidebarOpen: boolean;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isSidebarOpen, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'parse', label: 'Parse' },
    { id: 'index', label: 'Index' },
    { id: 'query', label: 'Query' },
    { id: 'settings', label: 'Settings' },
  ];

  return (
    <aside className={`bg-gray-800 text-gray-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col transition-width duration-300`}>
      <div className="h-16 flex items-center justify-center font-bold text-xl text-white border-b border-gray-700">
        {isSidebarOpen ? 'GenAI Platform' : 'G'}
      </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentView(item.id as View)}
                className={`flex items-center w-full p-3 my-1 rounded-lg hover:bg-gray-700 ${currentView === item.id ? 'bg-primary-600 text-white' : ''}`}
              >
                <span className="text-lg">{/* Icon can go here */}</span>
                {isSidebarOpen && <span className="ml-4">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
       <div className="px-4 py-4 border-t border-gray-700">
          <button
            onClick={onLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700"
          >
            <LogoutIcon />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </button>
      </div>
    </aside>
  );
};

export default Sidebar;