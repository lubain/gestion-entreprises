import { Invoice } from "@/domain/models";
import { AppDispatch, RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedInvoiceSlice,
  clearSelectedInvoiceSlice,
} from "@/application/slices/admin/invoice";
import { createInvoiceSlice } from "@/application/slices/admin/invoice/createInvoiceSlice";
import { getAllInvoiceSlices } from "@/application/slices/admin/invoice/getAllClientSlices";
import { updateInvoiceSlice } from "@/application/slices/admin/invoice/updateInvoiceSlice";
import { deleteInvoiceSlice } from "@/application/slices/admin/invoice/deleteInvoiceSlice";
import { MarkAsPaiedSlice } from "@/application/slices/admin/invoice/MarkAsPaiedSlice";

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

  const MarkAsPaied = useCallback(
    async (id: number) => {
      await dispatch(MarkAsPaiedSlice(id));
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
    MarkAsPaied,
    remove,
    clearSelected,
  };
};
