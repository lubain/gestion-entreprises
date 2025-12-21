import { Plus, Trash2, Save, Printer } from "lucide-react";
import { Card } from "@/presentation/components/ui/Card";
import { Button } from "@/presentation/components/ui/Button";
import { Input } from "@/presentation/components/ui/Input";
import { Badge } from "@/presentation/components/ui/Badge";
import { Client, Invoice, Product } from "@/domain/models";
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
    setCurrentProduct,
    setQty,
    setView,
    setSelectedClient,
    addToCart,
    removeFromCart,
    handleSaveInvoice,
  } = useInvoiceState();

  if (view === "create") {
    const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);

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
                onChange={(e) => setSelectedClient(Number(e.target.value))}
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
                2. Ajouter des produits
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

              {/* Liste des articles ajoutés */}
              <div className="mt-6">
                <table className="w-full text-sm text-left">
                  <thead className="text-slate-500 border-b border-slate-100">
                    <tr>
                      <th className="pb-2">Désignation</th>
                      <th className="pb-2 text-right">Qté</th>
                      <th className="pb-2 text-right">Prix</th>
                      <th className="pb-2 text-right">Total</th>
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
              <div className="flex justify-between mb-2 text-slate-300">
                <span>Articles</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between mb-6 text-slate-300">
                <span>Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="border-t border-slate-600 pt-4 flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-green-400">
                  {cartTotal.toFixed(2)} €
                </span>
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
