import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../context";
import { useAxios, useSecureStore } from "../hooks";

function UserProvider(props) {
  const { children } = props;
  const secureStore = useSecureStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initUser = () => {
      secureStore
        .getValueFor("tokens")
        .then((data) => setUser({ tokens: data }))
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
