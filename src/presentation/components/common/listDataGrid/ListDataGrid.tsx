import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { localeText } from "@/shared/constants/localeText";
import { twMerge } from "tailwind-merge";
import { Expense, Invoice, Product } from "@/domain/models";
import { FacturationColumns } from "./FacturationColumns";
import { DepenseColumns } from "./DepenseColumns";
import { StockColumns } from "./StockColumns";

interface ListDataGridProps extends React.ComponentProps<"div"> {
  data: Invoice[] | Expense[] | Product[];
  type: string;
}

const getColumns = (type: string) => {
  switch (type) {
    case "invoice":
      return FacturationColumns();
    case "expense":
      return DepenseColumns();
    case "stock":
      return StockColumns();
    default:
      return [];
  }
};

const ListDataGrid = ({ type, data, className }: ListDataGridProps) => {
  const columns = getColumns(type);

  return (
    <Paper component="div" className={twMerge(`shadow-lg`, className)}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        localeText={localeText}
        sx={{
          "& .font-semibold": {
            fontWeight: "bold",
          },
        }}
        disableRowSelectionOnClick
        disableVirtualization
      />
    </Paper>
  );
};

export default ListDataGrid;
