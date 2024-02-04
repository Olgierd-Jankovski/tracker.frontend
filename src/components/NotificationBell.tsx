import React from 'react';
import NotificationBellIcon from '../assets/icons/notificationBell.png';
import './styles/NotificationBell.css';

interface NotificationBellProps {
  unreadCount: number;
  onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount, onClick }) => {
  return (
    <div onClick={onClick}>
      {/* <span>Bell Icon</span> */}
      <img src={NotificationBellIcon}
        alt='Notification Bell'
        style={{
          width: '32px',
          height: '32px'
        }} />
      {unreadCount > 0 && <div className='unread-count'>{unreadCount}</div>}
    </div>
  );
}

export default NotificationBell;