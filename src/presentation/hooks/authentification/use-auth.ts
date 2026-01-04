import { restoreData as restoreDataAction } from "@/application/slices/auth/restoreData";
import { getRoleUserSelected as getRoleUserSelectedAction } from "@/application/slices/user/getRoleUserSelected";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, userData } = useSelector(
    (state: RootState) => state.authentification
  );
  const { loading, roleUserSelected } = useSelector(
    (state: RootState) => state.user
  );

  const restoreData = async () => {
    if (!user || !userData) {
      await dispatch(restoreDataAction());
    }
  };

  const getRoleUserSelected = async (utilisateur_id: number) => {
    await dispatch(getRoleUserSelectedAction(utilisateur_id));
  };

  return { loading, roleUserSelected, restoreData, getRoleUserSelected };
};

export default useAuth;
