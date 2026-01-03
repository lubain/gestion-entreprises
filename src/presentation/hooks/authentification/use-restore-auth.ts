import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { restoreData } from "@/application/slices/auth/authSlice";
import { useEffect, useState } from "react";

export const useRestoreAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authentification);
  const [isRestoreDone, setIsRestoreDone] = useState<boolean>(false);

  const restore = async () => {
    if (!user && !isRestoreDone) {
      await dispatch(restoreData());
    }
    setIsRestoreDone(true);
  };

  useEffect(() => {
    restore();
  }, []);

  return { isRestoreDone };
};
