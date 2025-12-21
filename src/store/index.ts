import { configureStore } from "@reduxjs/toolkit";
import notificationSliceReducer from "@/application/slices/notification/notificationSlice";
import userSliceReducer from "@/application/slices/auth/userSlice";
import authSliceReducer from "@/application/slices/auth/authSlice";
import clientSliceReducer from "@/application/slices/admin/clientSlice";
import expenseSliceReducer from "@/application/slices/admin/expenseSlice";
import productSliceReducer from "@/application/slices/admin/productSlice";
import invoiceSliceReducer from "@/application/slices/admin/invoiceSlice";

export const store = configureStore({
  reducer: {
    authentification: authSliceReducer,
    notification: notificationSliceReducer,
    user: userSliceReducer,
    client: clientSliceReducer,
    expense: expenseSliceReducer,
    product: productSliceReducer,
    invoice: invoiceSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
