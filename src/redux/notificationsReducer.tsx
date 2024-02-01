
// Define notification state and action types
export interface AppNotification { // Notification was renamed to AppNotification because one is declared in react-dom
    id: string;
    message: string;
    read: boolean;
    type: 'info' | 'warning' | 'error';
};

export interface AppNotificationsState {
    appNotifications: AppNotification[];
}

export const ActionTypes = {
    ADD_APP_NOTIFICATION: 'ADD_APP_NOTIFICATION',
    MARK_APP_NOTIFICATION_READ: 'MARK_APP_NOTIFICATION_READ'
} as const;

export const ActionCreators = {
    addAppNotification: (appNotification: AppNotification) => ({
        type: ActionTypes.ADD_APP_NOTIFICATION,
        payload: appNotification,
    }),
    markAppNotificationRead: (appNotificationId: string) => ({
        type: ActionTypes.MARK_APP_NOTIFICATION_READ,
        payload: appNotificationId
    }),
} as const;

type Action = ReturnType<typeof ActionCreators[keyof typeof ActionCreators]>;

// Initial state
const initialState: AppNotificationsState = {
    appNotifications: [],
};

// Reducer function
export default function NotificationsReducer(state: AppNotificationsState = initialState, action: Action): AppNotificationsState {
    switch (action.type) {
        case ActionTypes.ADD_APP_NOTIFICATION:
            return { ...state, appNotifications: [...state.appNotifications, action.payload] };
        case ActionTypes.MARK_APP_NOTIFICATION_READ:
            return {
                ...state,
                appNotifications: state.appNotifications.map((appNotification =>
                    appNotification.id === action.payload ? { ...appNotification, read: true } : appNotification))
            };
        default:
            return state;
    }
}

