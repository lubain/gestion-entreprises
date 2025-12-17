import { AdminRoutesNavigations } from "@/shared/constants/AppRoutesNavigation";
import { Navigation } from "@toolpad/core/AppProvider";
import { CircleDollarSign, Dock, LayoutDashboard } from "lucide-react";

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
    segment: AdminRoutesNavigations.INVOICE,
    title: "Factures",
    icon: <CircleDollarSign />,
  },
  {
    segment: AdminRoutesNavigations.INVENTORY,
    title: "Inventaire",
    icon: <Dock />,
  },
  {
    segment: AdminRoutesNavigations.EXPENSE,
    title: "Dépenses",
    icon: <CircleDollarSign />,
  },
];
