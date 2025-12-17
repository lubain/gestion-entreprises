import { useState, useEffect } from "react";
import { Invoice } from "../pages/admin/dashboard/types";
import { invoiceService } from "../pages/admin/dashboard/invoice-service";

export const useInvoices = (userId?: number) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await invoiceService.getInvoices(userId);
      setInvoices(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [userId]);

  const createInvoice = async (
    invoice: Omit<Invoice, "id" | "created_at" | "updated_at">
  ) => {
    try {
      const newInvoice = await invoiceService.createInvoice(invoice);
      setInvoices([newInvoice, ...invoices]);
      return newInvoice;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create invoice");
    }
  };

  const updateInvoice = async (id: number, updates: Partial<Invoice>) => {
    try {
      const updated = await invoiceService.updateInvoice(id, updates);
      setInvoices(invoices.map((inv) => (inv.id === id ? updated : inv)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update invoice");
    }
  };

  const deleteInvoice = async (id: number) => {
    try {
      await invoiceService.deleteInvoice(id);
      setInvoices(invoices.filter((inv) => inv.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete invoice");
    }
  };

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
};
