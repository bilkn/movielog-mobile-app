import React, { useEffect, useState } from "react";
import { UserContext } from "../context";
import { useSecureStore } from "../hooks";

function UserProvider(props) {
  const { children } = props;
  const secureStore = useSecureStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initUser = () => {
      secureStore
        .getValueFor("tokens")
        .then((data) => setUser(data))
        .catch((err) => console.log(err));
    };

    initUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
