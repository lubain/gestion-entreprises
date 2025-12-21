import { Invoice } from "@/domain/models";
import { AppDispatch, RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInvoiceSlice,
  getAllInvoiceSlices,
  updateInvoiceSlice,
  deleteInvoiceSlice,
  setSelectedInvoiceSlice,
  clearSelectedInvoiceSlice,
} from "@/application/slices/admin/invoiceSlice";

export const useInvoice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { invoices, selectedInvoiceSlice, loading, error } = useSelector(
    (state: RootState) => state.invoice
  );

  const create = useCallback(
    async (data: Omit<Invoice, "id">) => {
      await dispatch(createInvoiceSlice(data));
    },
    [dispatch]
  );

  const getAll = useCallback(async () => {
    await dispatch(getAllInvoiceSlices());
  }, [dispatch]);

  const update = useCallback(
    async (id: number, data: Partial<Invoice>) => {
      await dispatch(updateInvoiceSlice({ id, data }));
    },
    [dispatch]
  );

  const remove = useCallback(
    async (id: number) => {
      await dispatch(deleteInvoiceSlice(id));
    },
    [dispatch]
  );

  const select = useCallback(
    (Invoice: Invoice | null) => {
      dispatch(setSelectedInvoiceSlice(Invoice));
    },
    [dispatch]
  );

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedInvoiceSlice());
  }, [dispatch]);

  return {
    loading,
    invoices,
    selectedInvoiceSlice,
    error,
    create,
    select,
    getAll,
    update,
    remove,
    clearSelected,
  };
};
