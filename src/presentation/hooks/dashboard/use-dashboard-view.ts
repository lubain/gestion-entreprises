import { Expense, Invoice, Product } from "@/domain/models";
import { useExpense } from "../expense/use-expense";
import { useProduct } from "../product/use-product";
import { useClient } from "../client/use-client";
import { useInvoice } from "../invoice/use-invoice";
import { useEffect } from "react";

export const useDashboardView = () => {
  const { invoices, getAll: getAllInvoices } = useInvoice();
  const { expenses, getAll: getAllExpenses } = useExpense();
  const { products, getAll: getAllProducts } = useProduct();
  const { clients, getAll: getAllClients } = useClient();

  const totalSales = invoices.reduce(
    (acc: number, inv: Invoice) => acc + inv.total,
    0
  );
  const totalExpenses = expenses.reduce(
    (acc: number, exp: Expense) => acc + exp.amount,
    0
  );
  const lowStockItems = products.filter(
    (p: Product) => p.stock <= p.minStock && p.stock < 9999
  );

  useEffect(() => {
    getAllExpenses();
    getAllClients();
    getAllProducts();
    getAllInvoices();
  }, []);

  return {
    totalExpenses,
    totalSales,
    lowStockItems,
    clients,
    invoices,
  };
};
