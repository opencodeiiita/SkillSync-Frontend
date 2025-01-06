import React from 'react';
import NotificationHeader from '../components/NotificationPage/NotificationHeader';
import NotificationList from '../components/NotificationPage/NotificationList';
import '../styles/NotificationPage.css';

const NotificationPage: React.FC = () => {
  return (
    <div className="notification-page">
      <NotificationHeader />
      <NotificationList />
    </div>
  );
};

export default NotificationPage;