import { supabase } from "@/infrastructure/supabase/supabase";
import type { InventoryItem } from "./types";

export const inventoryService = {
  // Récupérer tous les articles d'inventaire
  async getInventoryItems(userId: number) {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId)
      .order("product_name", { ascending: true });

    if (error) throw error;
    return data as InventoryItem[];
  },

  // Récupérer les articles avec stock faible
  async getLowStockItems(userId: number) {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", userId)
      .filter("quantity", "lte", "minimum_quantity");

    if (error) throw error;
    return data as InventoryItem[];
  },

  // Créer un nouvel article
  async createItem(
    item: Omit<InventoryItem, "id" | "created_at" | "updated_at">
  ) {
    const { data, error } = await supabase
      .from("inventory")
      .insert([item])
      .select()
      .single();

    if (error) throw error;
    return data as InventoryItem;
  },

  // Mettre à jour un article
  async updateItem(itemId: string, updates: Partial<InventoryItem>) {
    const { data, error } = await supabase
      .from("inventory")
      .update(updates)
      .eq("id", itemId)
      .select()
      .single();

    if (error) throw error;
    return data as InventoryItem;
  },

  // Supprimer un article
  async deleteItem(itemId: string) {
    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", itemId);

    if (error) throw error;
  },

  // Augmenter le stock
  async increaseStock(itemId: string, quantity: number) {
    const item = await this.getItemById(itemId);
    return this.updateItem(itemId, {
      quantity: item.quantity + quantity,
      last_restocked: new Date().toISOString(),
    });
  },

  // Diminuer le stock
  async decreaseStock(itemId: string, quantity: number) {
    const item = await this.getItemById(itemId);
    return this.updateItem(itemId, {
      quantity: Math.max(0, item.quantity - quantity),
    });
  },

  // Récupérer un article par ID
  async getItemById(itemId: string) {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("id", itemId)
      .single();

    if (error) throw error;
    return data as InventoryItem;
  },

  // Récupérer les statistiques d'inventaire
  async getInventoryStats(userId: number) {
    const items = await this.getInventoryItems(userId);
    const lowStockItems = await this.getLowStockItems(userId);

    return {
      total_items: items.length,
      total_value: items.reduce(
        (sum, item) => sum + item.quantity * item.unit_price,
        0
      ),
      low_stock_count: lowStockItems.length,
      categories: [...new Set(items.map((item) => item.category))].length,
    };
  },
};
