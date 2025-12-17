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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import type { Invoice } from "./types";

const statusColors: {
  [key: string]:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
} = {
  draft: "default",
  sent: "primary",
  paid: "success",
  overdue: "error",
};

const statusLabels: { [key: string]: string } = {
  draft: "Brouillon",
  sent: "Envoyée",
  paid: "Payée",
  overdue: "En retard",
};

const invoices: Invoice[] = [];

const InvoiceList = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const onEdit = (invoice: Invoice) => {};
  const onDelete = (id: number) => {};
  const onNew = () => {};
  const onDownload = (invoice: Invoice) => {};

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
        <Typography variant="h5">Factures</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onNew}
        >
          Nouvelle Facture
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>N° Facture</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Montant</TableCell>
              <TableCell>Date d'émission</TableCell>
              <TableCell>Date d'échéance</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow
                key={invoice.id}
                hover
                selected={selectedId === invoice.id}
                onClick={() => setSelectedId(invoice.id)}
              >
                <TableCell sx={{ fontWeight: "bold" }}>
                  {invoice.invoice_number}
                </TableCell>
                <TableCell>{invoice.client_name}</TableCell>
                <TableCell>{invoice.total_amount.toFixed(2)}€</TableCell>
                <TableCell>
                  {new Date(invoice.issue_date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  {new Date(invoice.due_date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>
                  <Chip
                    label={statusLabels[invoice.status]}
                    color={statusColors[invoice.status]}
                    size="small"
                  />
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    startIcon={<DownloadIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownload(invoice);
                    }}
                  >
                    Télécharger
                  </Button>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(invoice);
                    }}
                  >
                    Modifier
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(invoice.id);
                    }}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {invoices.length === 0 && (
        <Paper sx={{ p: 3, textAlign: "center", mt: 2 }}>
          <Typography color="textSecondary">Aucune facture trouvée</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default InvoiceList;
