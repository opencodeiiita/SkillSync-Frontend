import React from 'react';
import  NotificationPage from '../../styles/NotificationPage.css'
interface PaginationProps {
  notificationsPerPage: number;
  totalNotifications: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ notificationsPerPage, totalNotifications, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNotifications / notificationsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination">
      <ul className="pagination-list">
        {pageNumbers.map(number => (
          <li key={number} className="pagination-item">
            <a onClick={() => paginate(number)} href="!#" className="pagination-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;