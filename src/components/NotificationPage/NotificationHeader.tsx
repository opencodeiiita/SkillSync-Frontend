import React from 'react';

const NotificationHeader: React.FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center justify-between">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Notifications</h1>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 w-full sm:w-auto">
          Mark All as Read
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300 w-full sm:w-auto">
          Clear All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationHeader;

