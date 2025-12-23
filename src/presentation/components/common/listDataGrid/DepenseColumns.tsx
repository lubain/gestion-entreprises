import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Badge } from "../../ui/Badge";
import { Printer } from "lucide-react";
import { Chip, IconButton } from "@mui/material";

const statusColors = {
  ["payée"]: "green",
  ["en_attente"]: "orange",
} as const;

export const DepenseColumns = (): GridColDef[] => {
  return [
    {
      field: "date",
      headerName: "Date",
      width: 160,
      valueFormatter: (params: string) => new Date(params).toLocaleDateString(),
      headerClassName: "font-semibold",
    },
    {
      field: "description",
      headerName: "Description",
      width: 400,
      headerClassName: "font-semibold",
    },
    {
      field: "category",
      headerName: "Catégorie",
      width: 200,
      renderCell: (params) => (
        <Badge color="orange">{params.row.category}</Badge>
      ),
      headerClassName: "font-semibold",
    },
    {
      field: "amount",
      headerName: "Montant",
      width: 150,
      align: "right",
      renderCell: (params) => (
        <p className="font-bold text-red-600">
          -{params.row.amount.toFixed(2)} €
        </p>
      ),
      headerClassName: "font-semibold",
    },
  ];
};
