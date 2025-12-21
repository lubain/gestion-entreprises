import { useEffect, useState } from "react";
import { useExpense } from "./use-expense";

export const useExpenseState = () => {
  const { expenses, create: addExpense, getAll } = useExpense();
  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({
    description: "",
    amount: 0,
    category: "Charges",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense(newExp);
    setIsAdding(false);
    setNewExp({
      description: "",
      amount: 0,
      category: "Charges",
      date: new Date().toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    isAdding,
    expenses,
    newExp,
    setIsAdding,
    setNewExp,
    handleSubmit,
  };
};
