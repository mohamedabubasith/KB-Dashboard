
import React from 'react';
import { OrderStatus } from '../types';
import type { Order } from '../types';
import { recentOrders } from '../constants';

const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.Completed:
      return <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Completed</span>;
    case OrderStatus.Pending:
      return <span className="px-2 py-1 text-xs font-semibold text-yellow-800 bg-yellow-200 rounded-full">Pending</span>;
    case OrderStatus.Cancelled:
      return <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">Cancelled</span>;
    default:
      return null;
  }
};

const RecentOrdersTable: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Recent Orders</h4>
      <div className="overflow-x-auto">
        <table className="w-full min-w-max text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Customer</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order: Order) => (
              <tr key={order.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{order.id}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{order.customerName}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">${order.amount.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{getStatusBadge(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
