import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppNotification, AppNotificationsState, ActionCreators } from '../redux/notificationsReducer'
import NotificationBell from './NotificationBell';
import NotificationList from './NotificationList';

interface NotificationContainerProps {
    children: React.ReactNode;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ children }) => {
    const { appNotifications } = useSelector((state: { notificationsReducer: AppNotificationsState }) => state.notificationsReducer);
    const dispatch = useDispatch();

    const [showNotificationList, setShowNotificationList] = useState(false);

    const generateDummyNotifications = (): AppNotification[] => {
        return Array.from({ length: 5 }, (_, index) => ({
            id: `id_${index}`,
            message: `Dummy Notification ${index + 1}`,
            read: false,
            type: 'info',
        }));
    };


    useEffect(() => {
        // We will fetch or handle notifications-logic there
        const fetchDummyData = async () => {
            // Simulate api call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // generate dummy notifications
            const dummyNotifications = generateDummyNotifications();

            for (const notification of dummyNotifications) {
                dispatch(ActionCreators.addAppNotification(notification));
            }
        };

        fetchDummyData();

    }, [dispatch])

    const handleNotificationsClick = (id: string) => {
        dispatch(ActionCreators.markAppNotificationRead(id));
    };

    const handleBellClick = () => {
        // Toggle visibility of the list
        setShowNotificationList(!showNotificationList);
    }

    return (
        <div>
            <NotificationBell
                unreadCount={appNotifications.filter((notification) => !notification.read).length}
                onClick={handleBellClick}
            />
            {showNotificationList && (
                <NotificationList
                    notifications={appNotifications}
                    onNotificationClick={handleNotificationsClick}
                />)}
            {children}
        </div>
    )
}

export default NotificationContainer;