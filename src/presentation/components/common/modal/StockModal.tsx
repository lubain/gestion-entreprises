import { Product } from "@/domain/models";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";

interface StockModalProps {
  isOpen: boolean;
  stock: Product;
  onClose: () => void;
}

const StockModal = ({ isOpen, stock, onClose }: StockModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        <Typography variant="h6">Aprovisionnement</Typography>
        <Tooltip title="Fermer">
          <IconButton onClick={onClose} size="small">
            <X className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent className="mt-4">
        <div></div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ textTransform: "none" }}
        >
          Annuler
        </Button>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockModal;
