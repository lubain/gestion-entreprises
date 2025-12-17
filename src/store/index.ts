import { configureStore } from "@reduxjs/toolkit";
import notificationSliceReducer from "@/application/slices/notification/notificationSlice";
import userSliceReducer from "@/application/slices/auth/userSlice";
import authSliceReducer from "@/application/slices/auth/authSlice";

export const store = configureStore({
  reducer: {
    authentification: authSliceReducer,
    notification: notificationSliceReducer,
    user: userSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
