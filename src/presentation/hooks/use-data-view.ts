import { useEffect, useState } from "react";

// --- SIMULATION DATABASE (MOCK SUPABASE) ---

const STORAGE_KEY = "pme_gestion_data";

const initialData = {
  clients: [
    {
      id: "1",
      name: "Sophie Martin",
      email: "sophie@email.com",
      phone: "0601020304",
      address: "12 Rue de la Paix",
    },
    {
      id: "2",
      name: "Restaurant Le Gourmet",
      email: "contact@gourmet.com",
      phone: "0145454545",
      address: "45 Av. de la République",
    },
  ],
  products: [
    { id: "1", name: "Shampoing Pro", price: 15.0, stock: 24, minStock: 5 },
    { id: "2", name: "Coupe Homme", price: 25.0, stock: 9999, minStock: 0 },
    { id: "3", name: "Masque Capillaire", price: 30.0, stock: 3, minStock: 10 },
  ],
  invoices: [],
  expenses: [
    {
      id: "1",
      description: "Facture Électricité",
      amount: 120.5,
      date: "2023-10-01",
      category: "Charges",
    },
  ],
};

const db = {
  load: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initialData;
  },
  save: (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
};

export const useDataView = () => {
  const [data, setData] = useState<any>(null);

  // Initialisation des données
  useEffect(() => {
    const loadedData = db.load();
    setData(loadedData);
  }, []);

  // Sauvegarde automatique à chaque changement
  useEffect(() => {
    if (data) db.save(data);
  }, [data]);

  return {
    data,
  };
};
