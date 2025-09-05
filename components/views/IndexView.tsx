import React, { useState } from 'react';
import { vectorIndexes as initialVectorIndexes } from '../../constants';
import type { VectorIndex } from '../../types';
import { ProcessingStatus } from '../../types';
import IndexListView from './index/IndexListView';
import CreateIndexView from './index/CreateIndexView';

const IndexView: React.FC = () => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [vectorIndexes, setVectorIndexes] = useState<VectorIndex[]>(initialVectorIndexes);

  const handleCreateIndex = (newIndexData: { name: string; documents: number[] }) => {
    const newIndex: VectorIndex = {
        id: Date.now(),
        name: newIndexData.name,
        documents: newIndexData.documents.length,
        createdAt: new Date().toISOString().split('T')[0],
        status: ProcessingStatus.Indexing,
    };
    
    setVectorIndexes(prev => [...prev, newIndex]);
    setView('list');

    // Simulate indexing process
    setTimeout(() => {
        setVectorIndexes(prev =>
            prev.map(idx =>
                idx.id === newIndex.id ? { ...idx, status: ProcessingStatus.Completed } : idx
            )
        );
    }, 4000);
  };

  const handleCancelCreate = () => {
    setView('list');
  };

  if (view === 'create') {
    return <CreateIndexView onCreate={handleCreateIndex} onCancel={handleCancelCreate} />;
  }

  return <IndexListView vectorIndexes={vectorIndexes} onGoToCreate={() => setView('create')} />;
};

export default IndexView;
