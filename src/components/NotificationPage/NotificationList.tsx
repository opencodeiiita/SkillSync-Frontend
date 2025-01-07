import React, { useState } from 'react';
import NotificationCard from './NotificationCard';
import Pagination from './Pagination';
import SearchFilter from './SearchFilter';

interface Notification {
  id: number;
  type: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
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
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
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
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <SearchFilter setSearchTerm={setSearchTerm} />
        <div className="space-y-4 mt-6">
          {currentNotifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
        {filteredNotifications.length > notificationsPerPage && (
          <div className="mt-8">
            <Pagination 
              notificationsPerPage={notificationsPerPage} 
              totalNotifications={filteredNotifications.length} 
              paginate={paginate} 
              currentPage={currentPage}
            />
          </div>
        )}
        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No notifications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationList;
