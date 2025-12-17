// src/components/Dashboard/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import StatCard from "./StatCard";
import { invoiceService } from "./invoice-service";
import { inventoryService } from "./inventory-service";
import { expenseService } from "./expense-service";
import { useAppSelector } from "@/presentation/hooks/redux";

interface DashboardData {
  totalRevenue: number;
  totalExpenses: number;
  pendingInvoices: number;
  lowStockItems: number;
  monthlyData: { month: string; revenue: number; expenses: number }[];
  expensesByCategory: { category: string; amount: number }[];
}

const Dashboard = () => {
  const userId = useAppSelector((state) => state.authentification.userData?.id);
  const [data, setData] = useState<DashboardData>({
    totalRevenue: 0,
    totalExpenses: 0,
    pendingInvoices: 0,
    lowStockItems: 0,
    monthlyData: [],
    expensesByCategory: [],
  });
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [invoiceStats, inventoryStats, expenseStats] = await Promise.all([
          invoiceService.getInvoiceStats(userId),
          inventoryService.getInventoryStats(userId),
          expenseService.getExpenseStats(userId),
        ]);

        // Process monthly data
        const monthlyData = [];
        for (let i = 5; i >= 0; i--) {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          monthlyData.push({
            month: date.toLocaleDateString("fr-FR", {
              month: "short",
              year: "2-digit",
            }),
            revenue: Math.random() * 5000, // Replace with actual data
            expenses: Math.random() * 3000,
          });
        }

        // Process expenses by category
        const expensesByCategory = Object.entries(
          expenseStats.by_category || {}
        ).map(([category, amount]) => ({
          category,
          amount: amount as number,
        }));

        setData({
          totalRevenue: invoiceStats.total_revenue || 0,
          totalExpenses: expenseStats.total_expenses || 0,
          pendingInvoices: invoiceStats.pending_invoices || 0,
          lowStockItems: inventoryStats.low_stock_count || 0,
          monthlyData,
          expensesByCategory,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  if (loading) {
    return <Typography>Chargement...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Tableau de Bord
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Revenu Total"
            value={`${data.totalRevenue.toFixed(2)}€`}
            color="#0088FE"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Dépenses Total"
            value={`${data.totalExpenses.toFixed(2)}€`}
            color="#FF8042"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Factures en Attente"
            value={data.pendingInvoices}
            color="#FFBB28"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Stock Faible"
            value={data.lowStockItems}
            color="#00C49F"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* Revenue vs Expenses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Revenu vs Dépenses
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0088FE"
                  name="Revenu"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#FF8042"
                  name="Dépenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Expenses by Category */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Dépenses par Catégorie
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, amount }) => `${category}: ${amount}€`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {data.expensesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
