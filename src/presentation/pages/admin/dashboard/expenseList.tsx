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
  TextField,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Expense } from "./types";

const categoryLabels: { [key: string]: string } = {
  salaires: "Salaires",
  loyer: "Loyer",
  utilitaires: "Utilitaires",
  marketing: "Marketing",
  fournitures: "Fournitures",
  transport: "Transport",
  maintenance: "Maintenance",
  autre: "Autre",
};

const categoryColors: { [key: string]: string } = {
  salaires: "#FF6B6B",
  loyer: "#4ECDC4",
  utilitaires: "#45B7D1",
  marketing: "#FFA07A",
  fournitures: "#98D8C8",
  transport: "#F7DC6F",
  maintenance: "#BB8FCE",
  autre: "#95A5A6",
};

const expenses: Expense[] = [];

const ExpenseList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  React.useEffect(() => {
    if (selectedCategory) {
      setFilteredExpenses(
        expenses.filter((exp) => exp.category === selectedCategory)
      );
    } else {
      setFilteredExpenses(expenses);
    }
  }, [selectedCategory, expenses]);

  const totalAmount = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const onEdit = (expense: Expense) => {};
  const onDelete = (id: number) => {};
  const onNew = () => {};

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
        <Typography variant="h5">Dépenses</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onNew}
        >
          Ajouter une Dépense
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Filtrer par catégorie"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Toutes les catégories</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ p: 1, backgroundColor: "#f5f5f5", borderRadius: 1 }}>
            <Typography variant="subtitle2" color="textSecondary">
              Total: <strong>{totalAmount.toFixed(2)}€</strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell align="right">Montant</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id} hover>
                <TableCell>
                  {new Date(expense.date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  {expense.description}
                </TableCell>
                <TableCell>
                  <Chip
                    label={categoryLabels[expense.category]}
                    size="small"
                    sx={{
                      backgroundColor: categoryColors[expense.category],
                      color: "#fff",
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  {expense.amount.toFixed(2)}€
                </TableCell>
                <TableCell>{expense.notes || "-"}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(expense)}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(expense.id)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredExpenses.length === 0 && (
        <Paper sx={{ p: 3, textAlign: "center", mt: 2 }}>
          <Typography color="textSecondary">Aucune dépense trouvée</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default ExpenseList;
