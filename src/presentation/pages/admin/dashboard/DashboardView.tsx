import { AlertCircle } from "lucide-react";
import { Card } from "@/presentation/components/ui/Card";
import { Invoice, Product } from "@/domain/models";
import { useDashboardView } from "@/presentation/hooks/dashboard/use-dashboard-view";
import { StatusBadge } from "@/presentation/components/common/listDataGrid/columns/FacturationColumns";

const DashboardView = () => {
  const { totalExpenses, totalSales, lowStockItems, clients, invoices } =
    useDashboardView();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
        Tableau de Bord
      </h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white p-4 border-l-4 border-l-blue-500">
          <div className="text-slate-500 text-sm dark:text-white font-medium">
            Chiffre d'Affaires
          </div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            {totalSales.toFixed(2)} €
          </div>
        </Card>
        <Card className="bg-white p-4 border-l-4 border-l-red-500">
          <div className="text-slate-500 text-sm dark:text-white font-medium">
            Dépenses
          </div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            {totalExpenses.toFixed(2)} €
          </div>
        </Card>
        <Card className="bg-white p-4 border-l-4 border-l-green-500">
          <div className="text-slate-500 text-sm font-medium dark:text-white">
            Bénéfice Net
          </div>
          <div
            className={`text-2xl font-bold ${totalSales - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {(totalSales - totalExpenses).toFixed(2)} €
          </div>
        </Card>
        <Card className="bg-white p-4 border-l-4 border-l-orange-500">
          <div className="text-slate-500 text-sm dark:text-white font-medium">
            Clients
          </div>
          <div className="text-2xl font-bold text-slate-800 dark:text-white">
            {clients.length}
          </div>
        </Card>
      </div>

      {/* Alerte Stock & Dernières Factures */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              <AlertCircle size={18} className="text-orange-500" />{" "}
              <span className="text-slate-700 dark:text-white">
                Alertes Stock
              </span>
            </h3>
          </div>
          <div className="p-0">
            {lowStockItems.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-white">
                Tout va bien !
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 dark:text-white">
                  <tr>
                    <th className="p-3">Produit</th>
                    <th className="p-3">Stock Actuel</th>
                    <th className="p-3">Min</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockItems.map((p: Product) => (
                    <tr key={p.id} className="border-t border-slate-100">
                      <td className="p-3 font-medium text-slate-700 dark:text-white">
                        {p.name}
                      </td>
                      <td className="p-3 text-red-600 font-bold">{p.stock}</td>
                      <td className="p-3 text-slate-500 dark:text-white">
                        {p.minStock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        <Card className="bg-white p-0 overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-semibold text-slate-700 dark:text-white">
              Dernières Factures
            </h3>
          </div>
          <div className="p-0">
            {invoices.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-white">
                Aucune facture émise.
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-slate-500 dark:text-white">
                  <tr>
                    <th className="p-3">Client</th>
                    <th className="p-3">Statut</th>
                    <th className="p-3 text-right">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices
                    .slice(-5)
                    .reverse()
                    .map((inv: Invoice) => (
                      <tr
                        key={inv.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="p-3 font-medium text-slate-700 dark:text-white">
                          {inv.clientName}
                        </td>
                        <td className="p-3 text-slate-500 dark:text-white">
                          <StatusBadge status={inv.status} />
                        </td>
                        <td className="p-3 text-right font-bold text-slate-700 dark:text-white">
                          {inv.total.toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
