import React, { useState } from "react";
import { UserContext } from "../context";

function UserProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
