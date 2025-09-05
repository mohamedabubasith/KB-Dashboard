
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'increase' | 'decrease';
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, change, changeType }) => {
  const isIncrease = changeType === 'increase';
  const changeColor = isIncrease ? 'text-green-500' : 'text-red-500';
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{value}</p>
        <p className={`text-xs ${changeColor} mt-1`}>{change}</p>
      </div>
      <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-600 dark:text-primary-300">
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
