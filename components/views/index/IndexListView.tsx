import React from 'react';
import type { VectorIndex } from '../../../types';
import { ProcessingStatus } from '../../../types';
import { parsedDocuments } from '../../../constants';

interface IndexListViewProps {
    vectorIndexes: VectorIndex[];
    onGoToCreate: () => void;
}

const getStatusBadge = (status: ProcessingStatus) => {
  switch (status) {
    case ProcessingStatus.Completed:
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Completed</span>;
    case ProcessingStatus.Indexing:
      return (
        <span className="flex items-center px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
            <svg className="animate-spin -ml-1 mr-1.5 h-3 w-3 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Indexing
        </span>
      );
    case ProcessingStatus.Failed:
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Failed</span>;
    default:
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pending</span>;
  }
};


const IndexListView: React.FC<IndexListViewProps> = ({ vectorIndexes, onGoToCreate }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">Parsed Documents</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Select documents to chunk, embed, and store in a vector index.</p>
            </div>
            <button 
              onClick={onGoToCreate}
              className="px-4 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Create New Index
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Size</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {parsedDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{doc.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.size}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.uploadedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">Vector Indexes</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your existing vector indexes.</p>
        <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Index Name</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Documents</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Created At</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {vectorIndexes.map((index) => (
                  <tr key={index.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{index.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{index.documents}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{index.createdAt}</td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{getStatusBadge(index.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default IndexListView;
