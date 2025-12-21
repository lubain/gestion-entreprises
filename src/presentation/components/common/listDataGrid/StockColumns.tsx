import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Badge } from "../../ui/Badge";
import { ArrowUpDown, Printer } from "lucide-react";

export const StockColumns = (): GridColDef[] => {
  return [
    {
      field: "name",
      headerName: "Produit",
      width: 160,
      valueFormatter: (params: string) => params,
      headerClassName: "font-semibold",
    },
    {
      field: "price",
      headerName: "Prix Unitaire",
      width: 150,
      renderCell: (params) => <p>{params.row.price.toFixed(2)} €</p>,
      headerClassName: "font-semibold",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 150,
      valueFormatter: (params: number) => (params >= 9999 ? "∞" : params),
      headerClassName: "font-semibold",
    },
    {
      field: "statut",
      headerName: "État",
      width: 150,
      renderCell: (params) => (
        <p>
          {params.row.stock <= params.row.minStock &&
          params.row.stock < 9999 ? (
            <Badge color="red">Stock Faible</Badge>
          ) : (
            <Badge color="green">OK</Badge>
          )}
        </p>
      ),
      headerClassName: "font-semibold",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <p>
          {params.row.stock < 9999 && (
            <button
              onClick={
                () => ""
                // setAdjustmentData({
                //   product: p,
                //   type: "add",
                //   quantity: 1,
                // })
              }
              className="text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Ajuster le stock"
            >
              <ArrowUpDown size={18} />
            </button>
          )}
        </p>
      ),
      headerClassName: "font-semibold",
    },
  ];
};
