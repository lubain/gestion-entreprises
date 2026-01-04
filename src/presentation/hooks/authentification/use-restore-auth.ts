import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { restoreData } from "@/application/slices/auth/restoreData";

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
