export interface DatePickerModalProps {
    open: boolean;
    onClose: () => void;
    onDateSelect: (date: Date) => void;
}