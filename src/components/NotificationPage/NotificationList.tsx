import React, { useState } from 'react';
import  NotificationPage from '../../styles/NotificationPage.css'
import NotificationCard from './NotificationCard';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

const mockNotifications = [
  {
    id: 1,
    type: 'Workspace',
    content: 'You have been invited to join the "Design Team" workspace.',
    timestamp: '2025-01-05T10:00:00Z',
    read: false
  },
  {
    id: 2,
    type: 'Meeting',
    content: 'Reminder: Project kickoff meeting at 3 PM.',
    timestamp: '2025-01-05T08:00:00Z',
    read: true
  },
  {
    id: 3,
    type: 'Resource',
    content: 'New resource "React Guide" has been shared in the "Development" workspace.',
    timestamp: '2025-01-04T15:00:00Z',
    read: false
  }
];

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = notifications.filter(notification =>
    notification.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(indexOfFirstNotification, indexOfLastNotification);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="notification-list">
      <SearchFilter setSearchTerm={setSearchTerm} />
      {currentNotifications.map(notification => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
      <Pagination 
        notificationsPerPage={notificationsPerPage} 
        totalNotifications={filteredNotifications.length} 
        paginate={paginate} 
      />
    </div>
  );
};

export default NotificationList;