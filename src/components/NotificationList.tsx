import React from 'react';
import { AppNotification } from '../redux/notificationsReducer'

interface NotificationListProps {
    notifications: AppNotification[];
    onNotificationClick: (id: string) => void;
}

const Notificationlist: React.FC<NotificationListProps> = ({ notifications, onNotificationClick }) => {
    return (
        <div>
            <ul>
                {notifications.map((notification => (
                    <li key={notification.id} onClick={() => onNotificationClick(notification.id)}>
                        {notification.message}
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default Notificationlist;