import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  MessageSquare,
  RefreshCw,
  BookOpen,
  Check,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type NotificationType = "Message" | "Workspace Update" | "Learning Module";

type Notification = {
  id: number;
  type: NotificationType;
  content: string;
  timestamp: string;
  read: boolean;
  link: string;
};

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "Message",
      content: "New message from John",
      timestamp: "2024-12-19T10:30:00",
      read: false,
      link: "/",
    },
    {
      id: 2,
      type: "Workspace Update",
      content: "New update in your workspace",
      timestamp: "2024-12-18T14:45:00",
      read: false,
      link: "/",
    },
    {
      id: 3,
      type: "Learning Module",
      content: "You passed the quiz",
      timestamp: "2024-12-17T09:00:00",
      read: false,
      link: "/home",
    },
  ]);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationClick = (notificationId: number) => {
    console.log(`Navigating to notification ID: ${notificationId}`);
    // Add logic to navigate to the relevant page or section
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "Message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "Workspace Update":
        return <RefreshCw className="h-5 w-5 text-green-500" />;
      case "Learning Module":
        return <BookOpen className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 text-white/90" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {dropdownVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-10"
          >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Notifications
              </h2>
              <button
                onClick={markAllAsRead}
                className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
              >
                Mark all as read
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 ${
                    !notification.read ? "bg-indigo-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <span className="mr-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.type}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notification.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {format(
                          new Date(notification.timestamp),
                          "MMM d, h:mm a"
                        )}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(notification.id);
                      }}
                      className={`ml-2 p-1 rounded-full ${
                        notification.read
                          ? "text-gray-400 hover:text-gray-600"
                          : "text-indigo-600 hover:text-indigo-800"
                      } focus:outline-none`}
                      aria-label={
                        notification.read ? "Marked as read" : "Mark as read"
                      }
                    >
                      {notification.read ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <X className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <Link to={`/${notification.link}`}>
                    <button
                      onClick={() => handleNotificationClick(notification.id)}
                      className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      View details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
            {notifications.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
