import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationPayload {
    message: string;
    type: NotificationType;
}

interface NotificationState {
    notifications: NotificationPayload[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<NotificationPayload>) => {
            state.notifications.push(action.payload);
        },
        removeNotification: (state) => {
            state.notifications.shift();
        },
    },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
