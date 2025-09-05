import React from 'react';
import CustomInput from '../common/CustomInput';

const SettingsView: React.FC = () => {
  return (
    <div className="mt-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Settings</h2>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Profile Information</h3>
        <div className="space-y-4">
            <CustomInput label="Full Name" id="full-name" type="text" defaultValue="GenAI User" />
            <CustomInput label="Email Address" id="email" type="email" defaultValue="user@example.com" />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">Change Password</h3>
        <div className="space-y-4">
            <CustomInput label="Current Password" id="current-password" type="password" />
            <CustomInput label="New Password" id="new-password" type="password" />
            <CustomInput label="Confirm New Password" id="confirm-password" type="password" />
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          className="px-6 py-2 text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
