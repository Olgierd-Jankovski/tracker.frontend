import React from 'react';
import { AppNotification } from '../redux/notificationsReducer'
import './styles/NotificationList.css'

interface NotificationListProps {
    notifications: AppNotification[];
    unreadCount: number;
    onNotificationClick: (id: string) => void;
    onClose: () => void;
}

const Notificationlist: React.FC<NotificationListProps> = ({ notifications, unreadCount, onNotificationClick, onClose }) => {
    // Separate warning notifications from regular ones
    const warningNotifications = notifications.filter(notification => notification.type === 'warning');
    const regularNotifications = notifications.filter(notification => notification.type === 'info');

    return ( 
        <div className='notification-list'>
            <div className='notification-header'>
                <span className="notification-title">Notifications</span>
                <span className='close-icon' onClick={onClose}>
                    [x]
                </span>
            </div>
            <div className='notification-content'>
                <ul>
                    {/* Display warning notifications first */}
                    {warningNotifications.map((notification) => (
                        <li
                            key={notification.id}
                            className={`warning-notification ${notification.read ? '' : 'unread-notification'}`}
                            onClick={() => onNotificationClick(notification.id)}>
                            <span className='warning-icon'>
                                [!]
                            </span>
                            {notification.message}
                        </li>
                    ))}

                    {/* Display regular notifications */}
                    {regularNotifications.map((notification => (
                        <li
                            key={notification.id}
                            className={notification.read ? '' : 'unread-notification'}
                            onClick={() => onNotificationClick(notification.id)}>
                            {notification.message}
                        </li>
                    )))}
                </ul>
            </div>
            <div className='notification-footer'>
                <span className='notification-footer-title'>Message Inbox: </span>
                {unreadCount > 0 ? `(${unreadCount} Unread messages)` : '(No unread messages!)'}
            </div>
        </div>
    )
}

export default Notificationlist;