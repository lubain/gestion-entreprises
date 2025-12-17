import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import { useState } from "react";
import { DatePickerModalProps } from "@/shared/types/DatePickerModalProps";

const DatePickerModal = ({
  open,
  onClose,
  onDateSelect,
}: DatePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleConfirm = () => {
    if (selectedDate) {
      onDateSelect(selectedDate);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sélectionner une date</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
          <DatePicker
            aria-hidden
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            sx={{ mt: 2 }}
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Annuler
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Confirmer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DatePickerModal;
