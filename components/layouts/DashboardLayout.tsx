import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import DashboardView from '../views/DashboardView';
import ParseView from '../views/ParseView';
import IndexView from '../views/IndexView';
import QueryView from '../views/QueryView';
import SettingsView from '../views/SettingsView';
import { Theme } from '../../types';

type View = 'dashboard' | 'parse' | 'index' | 'query' | 'settings';

interface DashboardLayoutProps {
    onLogout: () => void;
    theme: Theme;
    toggleTheme: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onLogout, theme, toggleTheme }) => {
    const [currentView, setCurrentView] = useState<View>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return <DashboardView />;
            case 'parse':
                return <ParseView />;
            case 'index':
                return <IndexView />;
            case 'query':
                return <QueryView />;
            case 'settings':
                return <SettingsView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
            <Sidebar 
                currentView={currentView} 
                setCurrentView={setCurrentView} 
                isSidebarOpen={isSidebarOpen}
                onLogout={onLogout}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    toggleTheme={toggleTheme} 
                    currentTheme={theme} 
                    onLogout={onLogout}
                    setCurrentView={setCurrentView}
                />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;