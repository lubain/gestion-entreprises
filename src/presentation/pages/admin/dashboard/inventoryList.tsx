import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { InventoryItem } from "./types";

const items: InventoryItem[] = [];

const InventoryList = () => {
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState("0");

  const handleOpenStockDialog = (itemId: number) => {
    setSelectedItemId(itemId);
    setOpenStockDialog(true);
  };

  const handleCloseStockDialog = () => {
    setOpenStockDialog(false);
    setQuantity("0");
    setSelectedItemId(null);
  };

  const onEdit = (item: InventoryItem) => {};
  const onDelete = (id: number) => {};
  const onNew = () => {};
  const onUpdateStock = (id: number, quantity: number) => {};

  const handleUpdateStock = () => {
    if (selectedItemId && quantity) {
      onUpdateStock(selectedItemId, parseInt(quantity));
      handleCloseStockDialog();
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">Inventaire</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onNew}
        >
          Ajouter un Article
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Nom du Produit</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell align="right">Quantité</TableCell>
              <TableCell align="right">Stock Min</TableCell>
              <TableCell align="right">Prix Unitaire</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {item.product_name}
                </TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.minimum_quantity}</TableCell>
                <TableCell align="right">
                  {item.unit_price.toFixed(2)}€
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      item.quantity <= item.minimum_quantity
                        ? "Stock Faible"
                        : "OK"
                    }
                    color={
                      item.quantity <= item.minimum_quantity
                        ? "error"
                        : "success"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    startIcon={<AddCircleIcon />}
                    onClick={() => handleOpenStockDialog(item.id)}
                  >
                    Réapprovisionner
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(item)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(item.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {items.length === 0 && (
        <Paper sx={{ p: 3, textAlign: "center", mt: 2 }}>
          <Typography color="textSecondary">Aucun article trouvé</Typography>
        </Paper>
      )}

      <Dialog open={openStockDialog} onClose={handleCloseStockDialog}>
        <DialogTitle>Réapprovisionner le Stock</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Quantité à ajouter"
            type="number"
            fullWidth
            variant="outlined"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStockDialog}>Annuler</Button>
          <Button
            onClick={handleUpdateStock}
            variant="contained"
            color="primary"
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryList;
