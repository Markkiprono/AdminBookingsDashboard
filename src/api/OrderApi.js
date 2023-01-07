import { useEffect, useState } from "react";
import axios from "../api/axios";

const OrderApi = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/v1/order");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  console.log(orders);
  return {
    orders: [orders, setOrders],
  };
};

export default OrderApi;
