import React, { useState, useCallback } from 'react';
import { UploadIcon, PdfFileIcon, SpinnerIcon, CheckIcon } from '../../constants';
import { FileStatus } from '../../types';
import type { UploadableFile } from '../../types';

const ParseView: React.FC = () => {
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const newFiles: UploadableFile[] = Array.from(e.target.files).map(file => ({ file, status: FileStatus.Ready }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const newFiles: UploadableFile[] = Array.from(event.dataTransfer.files)
        .filter(file => file.type === 'application/pdf')
        .map(file => ({ file, status: FileStatus.Ready }));
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      event.dataTransfer.clearData();
    }
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
    
  const onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
    
  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleParse = async () => {
    const filesToParse = files.filter(f => f.status === FileStatus.Ready);
    if (filesToParse.length === 0) return;

    setIsParsing(true);

    // Set status to Parsing
    setFiles(currentFiles =>
      currentFiles.map(f =>
        f.status === FileStatus.Ready ? { ...f, status: FileStatus.Parsing } : f
      )
    );

    // Simulate parsing for each file with a delay
    for (const fileToParse of filesToParse) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
        setFiles(currentFiles =>
            currentFiles.map(f =>
                f.file.name === fileToParse.file.name && f.status === FileStatus.Parsing
                    ? { ...f, status: FileStatus.Completed }
                    : f
            )
        );
    }
    
    setIsParsing(false);
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const renderFileStatus = (status: FileStatus) => {
    switch (status) {
        case FileStatus.Parsing:
            return <div className="flex items-center text-sm text-blue-500"><SpinnerIcon className="w-4 h-4 mr-2" /> Parsing...</div>;
        case FileStatus.Completed:
            return <div className="flex items-center text-sm text-green-500"><CheckIcon className="w-4 h-4 mr-2" /> Completed</div>;
        default:
            return <span className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(files.find(f=>f.status === status)?.file.size || 0)}</span>;
    }
  };
  
  const hasReadyFiles = files.some(f => f.status === FileStatus.Ready);

  return (
    <div className="mt-8 grid grid-cols-1 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-1">Upload Documents</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Upload PDF documents to parse and prepare them for indexing.</p>
        
        <div 
            onDrop={onDrop} 
            onDragOver={onDragOver}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200
            ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}
        >
          <UploadIcon />
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Drag & drop PDF files here, or
            <label htmlFor="file-upload" className="font-medium text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"> browse your files</label>
            .
          </p>
          <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple accept=".pdf" onChange={handleFileChange} />
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
           <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Uploaded Documents</h4>
           <ul className="space-y-3">
             {files.map((uploadableFile, index) => (
               <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                 <div className="flex items-center space-x-3">
                   <PdfFileIcon />
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{uploadableFile.file.name}</span>
                 </div>
                 {uploadableFile.status === FileStatus.Ready 
                    ? <span className="text-sm text-gray-500 dark:text-gray-400">{formatBytes(uploadableFile.file.size)}</span>
                    : renderFileStatus(uploadableFile.status)
                 }
               </li>
             ))}
           </ul>
           {hasReadyFiles && <div className="mt-6 flex justify-end">
             <button
               onClick={handleParse}
               disabled={isParsing}
               className="px-6 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed flex items-center"
             >
               {isParsing && <SpinnerIcon className="-ml-1 mr-3 h-5 w-5 text-white" />}
               {isParsing ? 'Parsing...' : `Parse ${files.filter(f => f.status === 'Ready').length} Document(s)`}
             </button>
           </div>}
        </div>
      )}
    </div>
  );
};

export default ParseView;
