"use client";

import { createContext, useContext } from "react";

export const CategoriesContext = createContext();

export function useCategoriesContext() {
  return useContext(CategoriesContext);
}

export const CategoriesProvider = ({ children, categories }) => {
  return <CategoriesContext.Provider value={categories}>{children}</CategoriesContext.Provider>;
};
