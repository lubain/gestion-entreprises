import { Badge } from "@/presentation/components/ui/Badge";
import { GridColDef } from "@mui/x-data-grid";
import FacturationAction from "../action/FacturationAction";

// Helper pour l'affichage des badges de statut
export const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case "payée":
      return <Badge color="green">Payée</Badge>;
    case "en_retard":
      return <Badge color="red">En retard</Badge>;
    default:
      return <Badge color="orange">En attente</Badge>;
  }
};

export const FacturationColumns = (): GridColDef[] => {
  return [
    {
      field: "id",
      headerName: "N°",
      width: 160,
      valueFormatter: (params: string) => {
        const year = new Date().getFullYear();
        const formattedId = params.toString().padStart(4, "0");
        return `FACT-${year}-${formattedId}`;
      },
      headerClassName: "font-semibold",
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
      headerClassName: "font-semibold",
    },
    {
      field: "issueDate",
      headerName: "Émission",
      width: 150,
      valueFormatter: (params: string) => new Date(params).toLocaleDateString(),
      headerClassName: "font-semibold",
    },
    {
      field: "dueDate",
      headerName: "Échéance",
      width: 150,
      valueFormatter: (params: string) => new Date(params).toLocaleDateString(),
      headerClassName: "font-semibold",
    },
    {
      field: "statut",
      headerName: "Statut",
      width: 150,
      renderCell: (params) => <StatusBadge status={params.row.status} />,
      headerClassName: "font-semibold",
    },
    {
      field: "total",
      headerName: "Total TTC",
      width: 150,
      valueFormatter: (params: number) => params.toFixed(2) + " €",
      headerClassName: "font-semibold",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => <FacturationAction invoice={params.row} />,
      headerClassName: "font-semibold",
    },
  ];
};
