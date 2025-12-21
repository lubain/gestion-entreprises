import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Badge } from "../../ui/Badge";
import { Printer } from "lucide-react";
import { Chip, IconButton } from "@mui/material";

const statusColors = {
  ["payée"]: "green",
  ["en_attente"]: "orange",
} as const;

export const FacturationColumns = (): GridColDef[] => {
  return [
    {
      field: "id",
      headerName: "N°",
      width: 160,
      valueFormatter: (params: string) => "#" + params,
      headerClassName: "font-semibold",
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
      headerClassName: "font-semibold",
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
      valueFormatter: (params: string) => new Date(params).toLocaleDateString(),
      headerClassName: "font-semibold",
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 150,
      renderCell: (params) => (
        <Badge color={statusColors["payée" as keyof typeof statusColors]}>
          payée
        </Badge>
      ),
      headerClassName: "font-semibold",
    },
    {
      field: "total",
      headerName: "Total",
      width: 150,
      valueFormatter: (params: number) => params.toFixed(2) + " €",
      headerClassName: "font-semibold",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton>
          <Printer size={16} className="mx-auto" />
        </IconButton>
      ),
      headerClassName: "font-semibold",
    },
  ];
};
