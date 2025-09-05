export enum OrderStatus {
  Completed = 'Completed',
  Pending = 'Pending',
  Cancelled = 'Cancelled',
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: OrderStatus;
}

export type Theme = 'light' | 'dark';

export enum ProcessingStatus {
    Pending = 'Pending',
    Indexing = 'Indexing',
    Completed = 'Completed',
    Failed = 'Failed',
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

export interface ParsedDocument {
    id: number;
    name: string;
    size: string;
    uploadedAt: string;
}

export interface VectorIndex {
    id: number;
    name: string;
    documents: number;
    createdAt: string;
    status: ProcessingStatus;
}
