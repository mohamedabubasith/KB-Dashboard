import React, { useState } from 'react';
import { parsedDocuments, EMBEDDING_MODELS } from '../../../constants';
import type { ParsedDocument } from '../../../types';
import CustomInput from '../../common/CustomInput';

interface CreateIndexViewProps {
  onCreate: (newIndexData: { name: string; documents: number[] }) => void;
  onCancel: () => void;
}

const CreateIndexView: React.FC<CreateIndexViewProps> = ({ onCreate, onCancel }) => {
  const [indexName, setIndexName] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  const [embeddingModel, setEmbeddingModel] = useState(EMBEDDING_MODELS[0]);
  const [chunkingStrategy, setChunkingStrategy] = useState('simple');

  const handleDocSelection = (docId: number) => {
    setSelectedDocs(prev =>
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const isAllSelected = selectedDocs.length > 0 && selectedDocs.length === parsedDocuments.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(parsedDocuments.map(d => d.id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (indexName.trim() && selectedDocs.length > 0) {
      onCreate({ name: indexName, documents: selectedDocs });
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100">Create New Vector Index</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure the details for your new vector index.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput 
                id="index-name"
                label="Index Name"
                type="text"
                value={indexName}
                onChange={(e) => setIndexName(e.target.value)}
                placeholder="e.g., financial-reports-2024"
                required
            />

            <div>
              <label htmlFor="embedding-model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Embedding Model</label>
              <select 
                id="embedding-model"
                value={embeddingModel}
                onChange={(e) => setEmbeddingModel(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              >
                {EMBEDDING_MODELS.map(model => <option key={model}>{model}</option>)}
              </select>
            </div>
            
            <div>
              <label htmlFor="chunking-strategy" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chunking Strategy</label>
              <select 
                id="chunking-strategy"
                value={chunkingStrategy}
                onChange={(e) => setChunkingStrategy(e.target.value)}
                className="mt-1 block w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              >
                <option value="simple">Simple Fixed-Size</option>
                <option value="recursive">Recursive Character</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Select Documents</h4>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-left">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="py-3 px-4 w-12">
                        <input 
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                      </th>
                      <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
                      <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Size</th>
                      <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Uploaded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedDocuments.map((doc: ParsedDocument) => (
                      <tr key={doc.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4">
                            <input 
                                type="checkbox"
                                checked={selectedDocs.includes(doc.id)}
                                onChange={() => handleDocSelection(doc.id)}
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-medium">{doc.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.size}</td>
                        <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{doc.uploadedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={!indexName.trim() || selectedDocs.length === 0}
                className="px-6 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed"
            >
                Create Index
            </button>
        </div>
      </form>
    </div>
  );
};

export default CreateIndexView;