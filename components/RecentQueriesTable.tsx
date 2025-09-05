import React from 'react';
import { recentQueries } from '../constants';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Completed':
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Completed</span>;
    case 'Failed':
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Failed</span>;
    default:
      return null;
  }
};

const RecentQueriesTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Recent Queries</h4>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Query</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Timestamp</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentQueries.map((query) => (
              <tr key={query.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 truncate" style={{maxWidth: '300px'}}>{query.query}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{query.timestamp}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{getStatusBadge(query.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentQueriesTable;
