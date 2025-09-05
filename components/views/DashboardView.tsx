import React from 'react';
import DashboardCard from '../DashboardCard';
import SalesChart from '../SalesChart';
import RecentOrdersTable from '../RecentOrdersTable';
import { CardIcon, UsersIcon, RevenueIcon, GrowthIcon } from '../../constants';

const DashboardView: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Sales" 
          value="$3,450" 
          change="+5.6%" 
          changeType="increase"
          icon={<RevenueIcon />} />
        <DashboardCard 
          title="New Users" 
          value="215" 
          change="+12.1%" 
          changeType="increase"
          icon={<UsersIcon />} />
        <DashboardCard 
          title="Total Orders" 
          value="1,280" 
          change="-2.3%" 
          changeType="decrease"
          icon={<CardIcon />} />
        <DashboardCard 
          title="Growth" 
          value="+15.7%" 
          change="+1.8%" 
          changeType="increase"
          icon={<GrowthIcon />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <SalesChart />
        <RecentOrdersTable />
      </div>
    </div>
  );
};

export default DashboardView;
