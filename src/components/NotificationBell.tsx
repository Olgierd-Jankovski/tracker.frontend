import React from 'react';

interface NotificationBellProps {
    unreadCount: number;
    onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, onClick }) => {
    return (
        <div onClick={onClick}>
          <span>Bell Icon</span>
          {unreadCount > 0 && <span>{unreadCount}</span>}
        </div>
      );
}

export default NotificationBell;