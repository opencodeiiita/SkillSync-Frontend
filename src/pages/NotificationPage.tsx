import React from 'react';
import NotificationHeader from '../components/NotificationPage/NotificationHeader';
import NotificationList from '../components/NotificationPage/NotificationList';

const NotificationPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <NotificationHeader />
        <div className="mt-8">
          <NotificationList />
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;

