import { AdminRoutesNavigations } from "@/shared/constants/AppRoutesNavigation";
import { Navigation } from "@toolpad/core/AppProvider";
import {
  LayoutDashboard,
  FileText,
  Package,
  Users,
  TrendingDown,
} from "lucide-react";

export const ADMIN_NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Principale",
  },
  {
    segment: AdminRoutesNavigations.DASHBOARD,
    title: "Tableau de bord",
    icon: <LayoutDashboard />,
  },
  {
    kind: "divider",
  },
  {
    segment: AdminRoutesNavigations.INVOICES,
    title: "Facturation",
    icon: <FileText />,
  },
  {
    segment: AdminRoutesNavigations.STOCK,
    title: "Stock",
    icon: <Package />,
  },
  {
    segment: AdminRoutesNavigations.CLIENTS,
    title: "Clients",
    icon: <Users />,
  },
  {
    segment: AdminRoutesNavigations.EXPENSE,
    title: "Dépenses",
    icon: <TrendingDown />,
  },
];
