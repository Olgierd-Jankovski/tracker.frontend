import React from 'react';
import { AppNotification } from '../redux/notificationsReducer'
import './styles/NotificationList.css'

interface NotificationListProps {
    notifications: AppNotification[];
    onNotificationClick: (id: string) => void;
    onClose: () => void;
}

const Notificationlist: React.FC<NotificationListProps> = ({ notifications, onNotificationClick, onClose }) => {
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
                    {notifications.map((notification => (
                        <li key={notification.id} onClick={() => onNotificationClick(notification.id)}>
                            {notification.message}
                        </li>
                    )))}
                </ul>
            </div>
        </div>
    )
}

export default Notificationlist;