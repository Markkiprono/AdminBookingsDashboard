import { createContext } from "react";

import OrderApi from "../api/OrderApi";

export const OrderState = createContext();

export const OrderProvider = ({ children }) => {
  const state = {
    orderApi: OrderApi(),
  };

  return <OrderState.Provider value={state}>{children}</OrderState.Provider>;
};
