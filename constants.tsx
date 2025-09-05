import React from 'react';
import { OrderStatus, ProcessingStatus } from './types';
import type { Order, VectorIndex, ParsedDocument } from './types';

// Icons
export const SunIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
export const MoonIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>;
export const DocumentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
export const DatabaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M4 7c0-1.105 3.582-2 8-2s8 .895 8 2M4 17c0 1.105 3.582 2 8 2s8-.895 8-2M4 7v10" /></svg>;
export const ChatBubbleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
export const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const UploadIcon = () => <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
export const PdfFileIcon = () => <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-4v2H6V4H4zm2 2v2h8V4H6zm1 4h6v2H7V8zm0 3h6v2H7v-2z" clipRule="evenodd"></path></svg>;
export const SpinnerIcon = ({ className }: { className?: string }) => <svg className={`animate-spin h-5 w-5 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
export const CheckIcon = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
export const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export const recentOrders: Order[] = [
  { id: 'ORD-001', customerName: 'John Doe', amount: 250.00, status: OrderStatus.Completed },
  { id: 'ORD-002', customerName: 'Jane Smith', amount: 150.50, status: OrderStatus.Pending },
  { id: 'ORD-003', customerName: 'Sam Wilson', amount: 45.99, status: OrderStatus.Cancelled },
  { id: 'ORD-004', customerName: 'Alice Johnson', amount: 300.00, status: OrderStatus.Completed },
];

export const vectorIndexes: VectorIndex[] = [
  { id: 1, name: 'Financial Reports Q1 2024', documents: 25, createdAt: '2024-04-15', status: ProcessingStatus.Completed },
  { id: 2, name: 'Customer Support Tickets', documents: 150, createdAt: '2024-04-10', status: ProcessingStatus.Completed },
  { id: 3, name: 'Product Manuals v3', documents: 42, createdAt: '2024-03-28', status: ProcessingStatus.Completed },
];

export const parsedDocuments: ParsedDocument[] = [
    { id: 1, name: 'Q1_2024_Earnings_Call_Transcript.pdf', size: '2.3 MB', uploadedAt: '2024-04-12' },
    { id: 2, name: 'Market_Analysis_Report_2024.pdf', size: '5.1 MB', uploadedAt: '2024-04-10' },
    { id: 3, name: 'Competitor_Overview_April.pdf', size: '1.8 MB', uploadedAt: '2024-04-09' },
    { id: 4, name: 'User_Feedback_Summary_Mar.pdf', size: '850 KB', uploadedAt: '2024-04-05' },
];

export const EMBEDDING_MODELS = ['text-embedding-004', 'text-embedding-003'];

export const documentsData = [
    { name: 'Financial Reports Q1 2024', documents: 25 },
    { name: 'Customer Support Tickets', documents: 150 },
    { name: 'Product Manuals v3', documents: 42 },
    { name: 'Archived Invoices', documents: 580 },
];

export const recentQueries = [
    { id: 1, query: "What was the revenue growth in Q1 2024 compared to Q4 2023?", timestamp: "2024-05-10 14:32", status: "Completed" },
    { id: 2, query: "Summarize the key findings in the latest market analysis report.", timestamp: "2024-05-10 11:15", status: "Completed" },
    { id: 3, query: "What are the most common issues reported in customer support tickets last month?", timestamp: "2024-05-09 16:45", status: "Completed" },
    { id: 4, query: "Find the warranty information for 'Product X' in the product manuals.", timestamp: "2024-05-09 09:05", status: "Failed" },
];

export const queriesOverTimeData = [
    { name: '7 days ago', queries: 120 },
    { name: '6 days ago', queries: 150 },
    { name: '5 days ago', queries: 180 },
    { name: '4 days ago', queries: 210 },
    { name: '3 days ago', queries: 250 },
    { name: '2 days ago', queries: 230 },
    { name: 'Yesterday', queries: 280 },
    { name: 'Today', queries: 310 },
];

export const recentlyAddedDocuments = [
    { id: 1, name: "Q1_2024_Financial_Statement.pdf", size: "1.5 MB", addedAt: "2024-05-10 09:15" },
    { id: 2, name: "Project_Phoenix_Briefing.pdf", size: "3.2 MB", addedAt: "2024-05-09 14:00" },
    { id: 3, name: "Employee_Handbook_Update_v2.pdf", size: "800 KB", addedAt: "2024-05-09 11:30" },
    { id: 4, name: "Security_Audit_Report.pdf", size: "4.1 MB", addedAt: "2024-05-08 17:20" },
];