import React from 'react';
import  NotificationPage from '../../styles/NotificationPage.css'
interface Notification {
  id: number;
  type: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const NotificationCard: React.FC<{ notification: Notification }> = ({ notification }) => {
  return (
    <div className={`notification-card ${notification.read ? 'read' : 'unread'}`}>
      <h2>{notification.type} Notification</h2>
      <p>{notification.content}</p>
      <span>{new Date(notification.timestamp).toLocaleString()}</span>
      <div className="actions">
        <button>Mark as {notification.read ? 'Unread' : 'Read'}</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default NotificationCard;