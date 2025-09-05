import React from 'react';
import DashboardCard from '../DashboardCard';
import DocumentsPerIndexChart from '../DocumentsPerIndexChart';
import RecentQueriesTable from '../RecentQueriesTable';
import QueriesOverTimeChart from '../QueriesOverTimeChart';
import RecentlyAddedDocumentsTable from '../RecentlyAddedDocumentsTable';
import { DocumentIcon, DatabaseIcon, ChatBubbleIcon, ClockIcon } from '../../constants';

const DashboardView: React.FC = () => {
    return (
        <div className="mt-8 grid grid-cols-1 gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard title="Total Documents" value="245" icon={<DocumentIcon />} change="+15 this week" changeType="increase" />
                <DashboardCard title="Indexes Created" value="12" icon={<DatabaseIcon />} change="+2 this month" changeType="increase" />
                <DashboardCard title="Total Queries" value="1,832" icon={<ChatBubbleIcon />} change="+21% this week" changeType="increase" />
                <DashboardCard title="Avg. Response Time" value="1.2s" icon={<ClockIcon />} change="-0.3s vs last week" changeType="decrease" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <QueriesOverTimeChart />
                <DocumentsPerIndexChart />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RecentQueriesTable />
                <RecentlyAddedDocumentsTable />
            </div>
        </div>
    );
};

export default DashboardView;