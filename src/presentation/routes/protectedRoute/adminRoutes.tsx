import { AdminRoutesNavigations } from "@/shared/constants/AppRoutesNavigation";
import { lazy } from "react";

const Dashboard = lazy(
  () => import("@/presentation/pages/admin/dashboard/DashboardView")
);

const Expense = lazy(
  () => import("@/presentation/pages/admin/expense/ExpensesView")
);

const Stock = lazy(() => import("@/presentation/pages/admin/stock/StockView"));

const Clients = lazy(
  () => import("@/presentation/pages/admin/client/ClientsView")
);

const Invoices = lazy(
  () => import("@/presentation/pages/admin/invoices/InvoicesView")
);

const adminRoutes = [
  { path: `/${AdminRoutesNavigations.DASHBOARD}`, element: <Dashboard /> },
  { path: `/${AdminRoutesNavigations.INVOICES}`, element: <Invoices /> },
  { path: `/${AdminRoutesNavigations.EXPENSE}`, element: <Expense /> },
  { path: `/${AdminRoutesNavigations.STOCK}`, element: <Stock /> },
  { path: `/${AdminRoutesNavigations.CLIENTS}`, element: <Clients /> },
];

export default adminRoutes;
