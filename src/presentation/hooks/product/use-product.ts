import { Product } from "@/domain/models";
import { AppDispatch, RootState } from "@/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProductSlice,
  clearSelectedProductSlice,
} from "@/application/slices/admin/product";
import { getAllProductSlices } from "@/application/slices/admin/product/getAllProductSlices";
import { createProductSlice } from "@/application/slices/admin/product/createProductSlice";
import { updateProductSlice } from "@/application/slices/admin/product/updateProductSlice";
import { updateProductStockSlice } from "@/application/slices/admin/product/updateProductStockSlice";
import { deleteProductSlice } from "@/application/slices/admin/product/deleteProductSlice";

export const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, selectedProductSlice, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  const create = useCallback(
    async (data: Omit<Product, "id">) => {
      await dispatch(createProductSlice(data));
    },
    [dispatch]
  );

  const getAll = useCallback(async () => {
    await dispatch(getAllProductSlices());
  }, [dispatch]);

  const update = useCallback(
    async (id: number, data: Partial<Product>) => {
      await dispatch(updateProductSlice({ id, data }));
    },
    [dispatch]
  );

  const updateStock = useCallback(
    async (data: { id: number; newStock: number }[]) => {
      await dispatch(updateProductStockSlice(data));
    },
    [dispatch]
  );

  const remove = useCallback(
    async (id: number) => {
      await dispatch(deleteProductSlice(id));
    },
    [dispatch]
  );

  const select = useCallback(
    (Product: Product | null) => {
      dispatch(setSelectedProductSlice(Product));
    },
    [dispatch]
  );

  const clearSelected = useCallback(() => {
    dispatch(clearSelectedProductSlice());
  }, [dispatch]);

  return {
    loading,
    products,
    selectedProductSlice,
    error,
    create,
    select,
    getAll,
    update,
    updateStock,
    remove,
    clearSelected,
  };
};
