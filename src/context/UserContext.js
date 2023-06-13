"use client";

import { createContext, useContext } from "react";

export const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider = ({ children, user }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
