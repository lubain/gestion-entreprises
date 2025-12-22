import { Plus, Trash2, Save } from "lucide-react";
import { Card } from "@/presentation/components/ui/Card";
import { Button } from "@/presentation/components/ui/Button";
import { Input } from "@/presentation/components/ui/Input";
import { Client, Product } from "@/domain/models";
import { useInvoiceState } from "@/presentation/hooks/use-invoice-state";
import ListDataGrid from "@/presentation/components/common/listDataGrid/ListDataGrid";

const InvoicesView = () => {
  const {
    view,
    cart,
    selectedClient,
    clients,
    currentProduct,
    products,
    qty,
    invoices,
    enableTax,
    taxRate,
    issueDate,
    dueDate,
    setIssueDate,
    setDueDate,
    setTaxRate,
    setEnableTax,
    setCurrentProduct,
    setQty,
    setView,
    setSelectedClient,
    addToCart,
    removeFromCart,
    handleSaveInvoice,
  } = useInvoiceState();

  if (view === "create") {
    const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
    const finalTaxAmount = enableTax ? subtotal * (taxRate / 100) : 0;
    const totalTTC = subtotal + finalTaxAmount;

    return (
      <div className="space-y-6 animate-in slide-in-from-right-4">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={() => setView("list")}>
            ← Retour
          </Button>
          <h2 className="text-2xl font-bold text-slate-800">
            Nouvelle Facture
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulaire Gauche */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4 text-slate-700">
                1. Sélectionner le Client
              </h3>
              <select
                className="w-full p-3 border border-slate-300 rounded-md bg-white"
                value={selectedClient}
                onChange={(e) => setSelectedClient(parseInt(e.target.value))}
              >
                <option value="">-- Choisir un client --</option>
                {clients.map((c: Client) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4 text-slate-700">
                2. Ajouter des produits (HT)
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase mb-1 block">
                    Produit
                  </label>
                  <select
                    className="w-full p-2.5 border border-slate-300 rounded-md bg-white text-sm"
                    value={currentProduct}
                    onChange={(e) =>
                      setCurrentProduct(parseInt(e.target.value))
                    }
                  >
                    <option value="">-- Choisir --</option>
                    {products.map((p: Product) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.price} €)
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-24">
                  <Input
                    label="Qté"
                    type="number"
                    min="1"
                    value={qty}
                    onChange={(e: any) => setQty(parseInt(e.target.value) || 1)}
                  />
                </div>
                <Button onClick={addToCart} disabled={!currentProduct}>
                  Ajouter
                </Button>
              </div>

              <div className="mt-6">
                <table className="w-full text-sm text-left">
                  <thead className="text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="pb-2">Désignation</th>
                      <th className="pb-2 text-right">Qté</th>
                      <th className="pb-2 text-right">PU HT</th>
                      <th className="pb-2 text-right">Total HT</th>
                      <th className="w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <tr key={item.productId}>
                        <td className="py-3">{item.productName}</td>
                        <td className="py-3 text-right">{item.quantity}</td>
                        <td className="py-3 text-right">{item.unitPrice} €</td>
                        <td className="py-3 text-right font-medium">
                          {item.total.toFixed(2)} €
                        </td>
                        <td
                          className="py-3 text-center text-red-500 cursor-pointer"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 size={16} />
                        </td>
                      </tr>
                    ))}
                    {cart.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-4 text-center text-slate-400 italic"
                        >
                          Aucun article
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Résumé Droite */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6 bg-slate-800 text-white border-slate-700">
              <h3 className="font-bold text-lg mb-4">Résumé</h3>

              <div className="space-y-3 mb-6">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">
                    Date d'émission
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full bg-slate-700 border-none rounded text-white px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase block mb-1">
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full bg-slate-700 border-none rounded text-white px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Gestion TVA */}
              <div className="mb-6 p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Appliquer TVA</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="toggle"
                      id="toggle"
                      checked={enableTax}
                      onChange={(e) => setEnableTax(e.target.checked)}
                      className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5"
                    />
                    <label
                      htmlFor="toggle"
                      className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${enableTax ? "bg-blue-500" : "bg-gray-400"}`}
                    ></label>
                  </div>
                </div>
                {enableTax && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">Taux</span>
                    <select
                      value={taxRate}
                      onChange={(e) => setTaxRate(Number(e.target.value))}
                      className="bg-slate-600 text-white text-xs p-1 rounded border-none"
                    >
                      <option value={20}>20%</option>
                      <option value={10}>10%</option>
                      <option value={5.5}>5.5%</option>
                      <option value={0}>0%</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-600 pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-slate-300 text-sm">
                  <span>Total HT</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                {enableTax && (
                  <div className="flex justify-between text-slate-300 text-sm">
                    <span>TVA ({taxRate}%)</span>
                    <span>{finalTaxAmount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                  <span className="text-xl font-bold">Total TTC</span>
                  <span className="text-2xl font-bold text-green-400">
                    {totalTTC.toFixed(2)} €
                  </span>
                </div>
              </div>

              <button
                onClick={handleSaveInvoice}
                disabled={!selectedClient || cart.length === 0}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-md font-bold text-white transition-colors flex justify-center items-center gap-2"
              >
                <Save size={18} /> Valider Facture
              </button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          Factures
        </h2>
        <Button icon={Plus} onClick={() => setView("create")}>
          Créer Facture
        </Button>
      </div>

      <ListDataGrid type="invoice" data={invoices.slice().reverse()} />
    </div>
  );
};

export default InvoicesView;
