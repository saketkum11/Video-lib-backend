import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
type child = {
  children: React.ReactNode;
};
type AuthContextType = {
  store: boolean;
  setStore: React.Dispatch<React.SetStateAction<boolean>>;
};
type StateType = boolean;

const AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: child) => {
  const [store, setStore] = useState<StateType>(true);

  useEffect(() => {
    const obj: object = {
      email: "saketkumar@gameil.com",
      password: "saket@123",
      username: "ganesh"
    };
    const fetch = async () => {
      try {
        const response = await axios.post("/api/v1/users/login",{
             ...obj
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);
  const data = {
    store,
    setStore,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export { AuthProvider };
