import { AdminRoutesNavigations } from "@/shared/constants/AppRoutesNavigation";
import { lazy } from "react";

const Dashboard = lazy(
  () => import("@/presentation/pages/admin/dashboard/Dashboard")
);

const Expense = lazy(
  () => import("@/presentation/pages/admin/dashboard/expenseList")
);

const Inventory = lazy(
  () => import("@/presentation/pages/admin/dashboard/inventoryList")
);

const Invoice = lazy(
  () => import("@/presentation/pages/admin/dashboard/invoiceList")
);

const adminRoutes = [
  { path: `/${AdminRoutesNavigations.DASHBOARD}`, element: <Dashboard /> },
  { path: `/${AdminRoutesNavigations.EXPENSE}`, element: <Expense /> },
  { path: `/${AdminRoutesNavigations.INVENTORY}`, element: <Inventory /> },
  { path: `/${AdminRoutesNavigations.INVOICE}`, element: <Invoice /> },
];

export default adminRoutes;
