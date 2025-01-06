import React from 'react';
import  NotificationPage from '../../styles/NotificationPage.css'
const NotificationHeader: React.FC = () => {
  return (
    <div className="notification-header">
      <h1>Notifications</h1>
      <button>Mark All as Read</button>
      <button>Clear All Notifications</button>
    </div>
  );
};

export default NotificationHeader;