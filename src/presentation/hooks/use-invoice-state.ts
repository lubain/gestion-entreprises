import { useEffect, useState } from "react";
import { useInvoice } from "./use-invoice";
import { Client, Invoice, InvoiceItem, Product } from "@/domain/models";
import { useProduct } from "./use-product";
import { useClient } from "./use-client";

export const useInvoiceState = () => {
  const { products, updateStock } = useProduct();
  const { clients } = useClient();
  const { invoices, create: addInvoice, getAll } = useInvoice();
  const [view, setView] = useState<"list" | "create">("list");

  // Create Invoice State
  const [selectedClient, setSelectedClient] = useState<number>(null);
  const [cart, setCart] = useState<InvoiceItem[]>([]);
  const [productId, setProductId] = useState<
    { id: number; newStock: number }[]
  >([]);
  const [currentProduct, setCurrentProduct] = useState<number>(null);
  const [qty, setQty] = useState(1);

  // États pour les dates
  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  });

  // TVA State
  const [enableTax, setEnableTax] = useState(true);
  const [taxRate, setTaxRate] = useState(20);

  const addToCart = () => {
    const product = products.find((p: Product) => p.id === currentProduct);
    if (!product) return;

    const newStock = Math.max(0, product.stock - qty);

    setProductId((prev) => [...prev, { id: product.id, newStock: newStock }]);

    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: item.quantity + qty,
                total: (item.quantity + qty) * item.unitPrice,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product.id,
          productName: product.name,
          quantity: qty,
          unitPrice: product.price,
          total: qty * product.price,
        },
      ]);
    }
    setQty(1);
    setCurrentProduct(null);
  };

  const removeFromCart = (pId: number) => {
    setCart(cart.filter((i) => i.productId !== pId));
    setProductId((prev) => prev.filter((p) => p.id !== pId));
  };

  const handleSaveInvoice = () => {
    if (!selectedClient || cart.length === 0) return;

    const client = clients.find((c: Client) => c.id === selectedClient);
    const subtotal = cart.reduce((acc, item) => acc + item.total, 0);
    const finalTaxRate = enableTax ? taxRate : 0;
    const taxAmount = subtotal * (finalTaxRate / 100);
    const total = subtotal + taxAmount;

    addInvoice({
      clientId: selectedClient,
      clientName: client?.name || "Inconnu",
      issueDate: issueDate,
      dueDate: dueDate,
      subtotal: subtotal,
      taxRate: finalTaxRate,
      taxAmount: taxAmount,
      total: total,
      status: "en_attente", // Statut par défaut
    });

    updateStock(productId);

    setView("list");
    setCart([]);
    setProductId([]);
    setSelectedClient(null);
  };

  useEffect(() => {
    getAll();
  }, []);

  // Vérification automatique des retards et sauvegarde
  useEffect(() => {
    if (invoices) {
      // Logique pour mettre à jour automatiquement le statut 'en_retard'
      const today = new Date().toISOString().split("T")[0];
      let hasChanges = false;

      const updatedInvoices = invoices.map((inv: Invoice) => {
        // Si la facture est 'en_attente' et que la date d'échéance est passée
        if (inv.status === "en_attente" && inv.dueDate < today) {
          hasChanges = true;
          return { ...inv, status: "en_retard" };
        }
        return inv;
      });

      if (hasChanges) {
        // const newData = { ...data, invoices: updatedInvoices };
        // setData(newData);
        // db.save(newData);
      } else {
        // db.save(data);
      }
    }
  }, [invoices]);

  return {
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
    setView,
    setTaxRate,
    setEnableTax,
    setSelectedClient,
    setCurrentProduct,
    setQty,
    addToCart,
    removeFromCart,
    handleSaveInvoice,
    setIssueDate,
    setDueDate,
  };
};
