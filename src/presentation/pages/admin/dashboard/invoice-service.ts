import { supabase } from "@/infrastructure/supabase/supabase";
import type { Invoice, InvoiceItem } from "./types";

export const invoiceService = {
  // Récupérer toutes les factures
  async getInvoices(userId: number) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Invoice[];
  },

  // Récupérer une facture par ID
  async getInvoiceById(invoiceId: number) {
    const { data, error } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", invoiceId)
      .single();

    if (error) throw error;
    return data as Invoice;
  },

  // Créer une nouvelle facture
  async createInvoice(
    invoice: Omit<Invoice, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("invoices")
      .insert([invoice])
      .select()
      .single();

    if (error) throw error;
    return data as Invoice;
  },

  // Mettre à jour une facture
  async updateInvoice(invoiceId: number, updates: Partial<Invoice>) {
    const { data, error } = await supabase
      .from("invoices")
      .update(updates)
      .eq("id", invoiceId)
      .select()
      .single();

    if (error) throw error;
    return data as Invoice;
  },

  // Supprimer une facture
  async deleteInvoice(invoiceId: number) {
    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", invoiceId);

    if (error) throw error;
  },

  // Générer un numéro de facture
  async generateInvoiceNumber(userId: number): Promise<string> {
    const { count, error } = await supabase
      .from("invoices")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    if (error) throw error;

    const year = new Date().getFullYear();
    const number = (count || 0) + 1;
    return `INV-${year}-${String(number).padStart(5, "0")}`;
  },

  // Récupérer les statistiques de facturation
  async getInvoiceStats(userId: number) {
    const { data, error } = await supabase
      .from("invoices")
      .select("total_amount, status, created_at")
      .eq("user_id", userId);

    if (error) throw error;

    return {
      total_invoices: data?.length || 0,
      total_revenue: data?.reduce((sum, inv) => sum + inv.total_amount, 0) || 0,
      pending_invoices:
        data?.filter((inv) => inv.status === "sent").length || 0,
      paid_invoices: data?.filter((inv) => inv.status === "paid").length || 0,
    };
  },
};
