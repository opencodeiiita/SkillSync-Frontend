import React from 'react';

interface Notification {
  id: number;
  type: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300 ease-in-out ${notification.read ? 'opacity-75' : 'opacity-100 border-l-4 border-blue-500'}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{notification.type} Notification</h2>
      <p className="text-gray-600 mb-3">{notification.content}</p>
      <span className="text-sm text-gray-500 block mb-4">{new Date(notification.timestamp).toLocaleString()}</span>
      <div className="flex justify-end space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300">
          Mark as {notification.read ? 'Unread' : 'Read'}
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;