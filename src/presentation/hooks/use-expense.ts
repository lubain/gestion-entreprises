import { Expense } from "@/domain/models";
import { AppDispatch, RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedExpenseSlice,
  clearSelectedExpenseSlice,
} from "@/application/slices/admin/expense";
import { createExpenseSlice } from "@/application/slices/admin/expense/createExpenseSlice";
import { getAllExpenseSlices } from "@/application/slices/admin/expense/getAllExpenseSlices";
import { updateExpenseSlice } from "@/application/slices/admin/expense/updateExpenseSlice";
import { deleteExpenseSlice } from "@/application/slices/admin/expense/deleteExpenseSlice";

export const useExpense = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, selectedExpenseSlice, loading, error } = useSelector(
    (state: RootState) => state.expense
  );

  const create = useCallback(
    async (data: Omit<Expense, "id">) => {
      await dispatch(createExpenseSlice(data));
    },
    [dispatch]
  );

  const getAll = useCallback(async () => {
    await dispatch(getAllExpenseSlices());
  }, [dispatch]);

  const update = useCallback(
    async (id: number, data: Partial<Expense>) => {
      await dispatch(updateExpenseSlice({ id, data }));
    },
    [dispatch]
  );

  const remove = useCallback(
    async (id: number) => {
      await dispatch(deleteExpenseSlice(id));
    },
    [dispatch]
  );

  const select = useCallback(
    (Expense: Expense | null) => {
      dispatch(setSelectedExpenseSlice(Expense));
    },
    [dispatch]
  );

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedExpenseSlice());
  }, [dispatch]);

  return {
    loading,
    expenses,
    selectedExpenseSlice,
    error,
    create,
    select,
    getAll,
    update,
    remove,
    clearSelected,
  };
};
