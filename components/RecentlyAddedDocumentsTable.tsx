import React from 'react';
import { recentlyAddedDocuments } from '../constants';

const RecentlyAddedDocumentsTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Recently Added Documents</h4>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Document Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Size</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Added At</th>
            </tr>
          </thead>
          <tbody>
            {recentlyAddedDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium truncate" style={{maxWidth: '250px'}}>{doc.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.size}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.addedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentlyAddedDocumentsTable;