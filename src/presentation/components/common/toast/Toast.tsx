import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeNotification } from '@/application/slices/notification/notificationSlice';

interface ToastContextType {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const { enqueueSnackbar } = useSnackbar();

    const value: ToastContextType = {
        success: (message: string) => enqueueSnackbar(message, { variant: 'success' }),
        error: (message: string) => enqueueSnackbar(message, { variant: 'error' }),
        warning: (message: string) => enqueueSnackbar(message, { variant: 'warning' }),
        info: (message: string) => enqueueSnackbar(message, { variant: 'info' }),
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

function ToastListener() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const notifications = useSelector((state: RootState) => state.notification.notifications);

    useEffect(() => {
        if (notifications.length > 0) {
            const notification = notifications[0];
            enqueueSnackbar(notification.message, { variant: notification.type });
            dispatch(removeNotification());
        }
    }, [notifications, enqueueSnackbar, dispatch]);

    return null;
}

export const Toast = ({ children }: { children?: React.ReactNode }) => {
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            TransitionProps={{ direction: 'up' }}
            maxSnack={3}
        >
            <ToastProvider>
                <ToastListener />
                {children}
            </ToastProvider>
        </SnackbarProvider>
    );
};
