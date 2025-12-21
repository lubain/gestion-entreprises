import { useDispatch } from 'react-redux';
import { addNotification, NotificationType } from '@/application/slices/notification/notificationSlice';

export const useToast = () => {
    const dispatch = useDispatch();

    return {
        success: (message: string) => {
            dispatch(addNotification({ message, type: 'success' }));
        },
        error: (message: string) => {
            dispatch(addNotification({ message, type: 'error' }));
        },
        warning: (message: string) => {
            dispatch(addNotification({ message, type: 'warning' }));
        },
        info: (message: string) => {
            dispatch(addNotification({ message, type: 'info' }));
        },
        notify: (message: string, type: NotificationType) => {
            dispatch(addNotification({ message, type }));
        }
    };
};
