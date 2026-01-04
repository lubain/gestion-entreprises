import { Product } from "@/domain/models";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { Input } from "@/presentation/components/ui/Input";
import { Button } from "@/presentation/components/ui/Button";
import { useState } from "react";

interface StockModalProps {
  isOpen: boolean;
  product: Product;
  onClose: () => void;
}

const StockModal = ({ isOpen, product, onClose }: StockModalProps) => {
  const [quantity, setQuantity] = useState<number>(0);
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
        <div className="mb-4 p-3 bg-slate-50 rounded text-sm text-slate-600">
          Produit :{" "}
          <span className="font-bold text-slate-800">{product.name}</span>
          <br />
          Stock actuel : <span className="font-bold">{product.stock}</span>
        </div>

        <form className="space-y-4">
          <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              className="flex-1 py-2 text-sm font-medium rounded-md transition-colors bg-white text-green-700 shadow-sm"
            >
              + Entrée
            </button>
          </div>
          <Input
            label="Quantité"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            autoFocus
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="ghost" type="button">
          Annuler
        </Button>
        <Button onClick={onClose} type="submit">
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StockModal;
