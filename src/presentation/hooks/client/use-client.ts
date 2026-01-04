import { Client } from "@/domain/models";
import { AppDispatch, RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedClientSlice,
  clearSelectedClientSlice,
} from "@/application/slices/admin/client";
import { createClientSlice } from "@/application/slices/admin/client/createClientSlice";
import { getAllClientSlices } from "@/application/slices/admin/client/getAllClientSlices";
import { updateClientSlice } from "@/application/slices/admin/client/updateClientSlice";
import { deleteClientSlice } from "@/application/slices/admin/client/deleteClientSlice";

export const useClient = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, selectedClientSlice, loading, error } = useSelector(
    (state: RootState) => state.client
  );

  const create = useCallback(
    async (data: Omit<Client, "id">) => {
      await dispatch(createClientSlice(data));
    },
    [dispatch]
  );

  const getAll = useCallback(async () => {
    await dispatch(getAllClientSlices());
  }, [dispatch]);

  const update = useCallback(
    async (id: number, data: Partial<Client>) => {
      await dispatch(updateClientSlice({ id, data }));
    },
    [dispatch]
  );

  const remove = useCallback(
    async (id: number) => {
      await dispatch(deleteClientSlice(id));
    },
    [dispatch]
  );

  const select = useCallback(
    (client: Client | null) => {
      dispatch(setSelectedClientSlice(client));
    },
    [dispatch]
  );

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedClientSlice());
  }, [dispatch]);

  return {
    loading,
    clients,
    selectedClientSlice,
    error,
    create,
    select,
    getAll,
    update,
    remove,
    clearSelected,
  };
};
