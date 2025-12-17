export interface User {
  id: number;
  email: string;
  company_name: string;
  created_at: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  user_id: number;
  client_name: string;
  client_email?: string;
  client_address?: string;
  issue_date: string;
  due_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  status: "draft" | "sent" | "paid" | "overdue";
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface InventoryItem {
  id: number;
  user_id: number;
  product_name: string;
  sku: string;
  category: string;
  quantity: number;
  minimum_quantity: number;
  unit_price: number;
  supplier?: string;
  last_restocked: string;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: number;
  user_id: number;
  description: string;
  category: string;
  amount: number;
  date: string;
  receipt_url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total_invoices: number;
  total_revenue: number;
  pending_invoices: number;
  total_expenses: number;
  low_stock_items: number;
  monthly_data: {
    month: string;
    revenue: number;
    expenses: number;
  }[];
}

export type ExpenseCategory =
  | "salaires"
  | "loyer"
  | "utilitaires"
  | "marketing"
  | "fournitures"
  | "transport"
  | "maintenance"
  | "autre";
