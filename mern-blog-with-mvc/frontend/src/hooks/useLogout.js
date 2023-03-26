import { useAuthContext } from "./useAuthContext";
import { useBlogsContext } from "./useBlogsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: blogDispatch } = useBlogsContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispath logout action
    dispatch({ type: "LOGOUT" });
    blogDispatch({ type: "SET_BLOGS", payload: null });
  };

  return {
    logout,
  };
};