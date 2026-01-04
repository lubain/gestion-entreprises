import { Product } from "@/domain/models";
import { useEffect, useState } from "react";
import { useProduct } from "./use-product";

export const useProductState = () => {
  const { products, getAll, create: addProduct, updateStock } = useProduct();
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    stock: 0,
    minStock: 5,
  });

  // État pour la gestion des mouvements de stock
  const [adjustmentData, setAdjustmentData] = useState<{
    product: Product | null;
    type: "add" | "remove";
    quantity: number;
  }>({
    product: null,
    type: "add",
    quantity: 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newItem);
    setIsAdding(false);
    setNewItem({ name: "", price: 0, stock: 0, minStock: 5 });
  };

  const handleStockAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustmentData.product) return;

    const { product, type, quantity } = adjustmentData;
    const qty = parseInt(String(quantity)) || 0; // Safe parse
    if (qty <= 0) return;

    const newStock =
      type === "add" ? product.stock + qty : Math.max(0, product.stock - qty);

    // const updatedProducts = products.map((p: Product) =>
    //   p.id === product.id ? { ...p, stock: newStock } : p
    // );

    updateStock([{ id: product.id, newStock: newStock }]);
    setAdjustmentData({ product: null, type: "add", quantity: 1 });
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    adjustmentData,
    isAdding,
    newItem,
    products,
    setIsAdding,
    setAdjustmentData,
    handleStockAdjustment,
    handleSubmit,
    setNewItem,
  };
};
