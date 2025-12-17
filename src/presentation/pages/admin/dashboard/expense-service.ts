import { supabase } from "@/infrastructure/supabase/supabase";
import type { Expense } from "./types";

export const expenseService = {
  // Récupérer toutes les dépenses
  async getExpenses(userId: number) {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Expense[];
  },

  // Récupérer les dépenses par catégorie
  async getExpensesByCategory(userId: number, category: string) {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .eq("category", category)
      .order("date", { ascending: false });

    if (error) throw error;
    return data as Expense[];
  },

  // Récupérer les dépenses du mois
  async getMonthlyExpenses(userId: number, date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .gte("date", startOfMonth.toISOString().split("T")[0])
      .lte("date", endOfMonth.toISOString().split("T")[0]);

    if (error) throw error;
    return data as Expense[];
  },

  // Créer une nouvelle dépense
  async createExpense(
    expense: Omit<Expense, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("expenses")
      .insert([expense])
      .select()
      .single();

    if (error) throw error;
    return data as Expense;
  },

  // Mettre à jour une dépense
  async updateExpense(expenseId: string, updates: Partial<Expense>) {
    const { data, error } = await supabase
      .from("expenses")
      .update(updates)
      .eq("id", expenseId)
      .select()
      .single();

    if (error) throw error;
    return data as Expense;
  },

  // Supprimer une dépense
  async deleteExpense(expenseId: string) {
    const { error } = await supabase
      .from("expenses")
      .delete()
      .eq("id", expenseId);

    if (error) throw error;
  },

  // Récupérer les statistiques de dépenses
  async getExpenseStats(userId: number) {
    const expenses = await this.getExpenses(userId);

    const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory: { [key: string]: number } = {};

    expenses.forEach((exp) => {
      byCategory[exp.category] = (byCategory[exp.category] || 0) + exp.amount;
    });

    return {
      total_expenses: totalAmount,
      expense_count: expenses.length,
      by_category: byCategory,
      average_expense: expenses.length > 0 ? totalAmount / expenses.length : 0,
    };
  },
};
