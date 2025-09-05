export type Theme = 'light' | 'dark';

export enum OrderStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  customerName: string;
  amount: number;
  status: OrderStatus;
}

export enum FileStatus {
    Ready = 'Ready',
    Parsing = 'Parsing',
    Completed = 'Completed',
}
  
export interface UploadableFile {
    file: File;
    status: FileStatus;
}

export enum ProcessingStatus {
    Indexing = 'Indexing',
    Completed = 'Completed',
    Failed = 'Failed',
    Pending = 'Pending',
}
  
export interface VectorIndex {
    id: number;
    name: string;
    documents: number;
    createdAt: string;
    status: ProcessingStatus;
}

export interface ParsedDocument {
    id: number;
    name: string;
    size: string;
    uploadedAt: string;
}
