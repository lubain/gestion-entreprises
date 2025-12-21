import { useEffect, useState } from "react";
import { useInvoice } from "./use-invoice";
import { Client, InvoiceItem, Product } from "@/domain/models";
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
    const total = cart.reduce((acc, item) => acc + item.total, 0);

    addInvoice({
      clientId: selectedClient,
      clientName: client?.name || "Inconnu",
      date: new Date().toISOString(),
      total: total,
      status: "payée",
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

  return {
    view,
    cart,
    selectedClient,
    clients,
    currentProduct,
    products,
    qty,
    invoices,
    setView,
    setSelectedClient,
    setCurrentProduct,
    setQty,
    addToCart,
    removeFromCart,
    handleSaveInvoice,
  };
};
