import { useContext } from "react";
import { useSecureStore } from ".";
import { UserContext } from "../context";

function useUser() {
  const { user, setUser } = useContext(UserContext);
  const secureStore = useSecureStore();

  const signOut = () => {
    setUser(null);
    secureStore.deleteItem("tokens");
  };

  return { user, setUser, signOut };
}

export default useUser;
