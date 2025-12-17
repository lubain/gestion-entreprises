import { RootState } from "@/store";
import { useSelector } from "react-redux";

const useGetAuthenticatedUser = () => {
  const { loading, error, user, userData } = useSelector(
    (state: RootState) => state.authentification
  );

  return {
    loading,
    error,
    user,
    id: userData?.id,
  };
};

export default useGetAuthenticatedUser;
