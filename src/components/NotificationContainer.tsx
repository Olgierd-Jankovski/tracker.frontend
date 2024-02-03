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
        return Array.from({ length: 5 }, (_, index) => {
            const type = index % 2 === 0 ? 'info' : 'warning';
            const message = index % 2 === 0 ? `Dummy Notification ${index + 1}` : 'Ongoing maintenace in 1 hour!';
            return{

                id: `id_${index}`,
                message: message,
                read: false,
                type: type,
            }
        });
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

    const handleCloseNotificationsClick = () => {
        setShowNotificationList(!showNotificationList);
    }

    return (
        <div>
            <NotificationBell
                unreadCount={appNotifications.filter((notification) => !notification.read).length}
                onClick={handleBellClick}
            />
            {
                showNotificationList && (
                    <NotificationList
                        notifications={appNotifications}
                        onNotificationClick={handleNotificationsClick}
                        onClose={handleCloseNotificationsClick}
                    />)}
            {children}
        </div>
    )
}

export default NotificationContainer;