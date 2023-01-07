import { createContext } from "react";
import UserApi from "../api/UserApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    userApi: UserApi(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
