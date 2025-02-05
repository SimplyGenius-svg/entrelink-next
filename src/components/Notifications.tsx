import React from "react";

interface Notification {
  id: number;
  message: string;
}

interface NotificationsProps {
  notifications: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  if (notifications.length === 0) {
    return <p className="text-gray-500">No new notifications.</p>;
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700"
          >
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
