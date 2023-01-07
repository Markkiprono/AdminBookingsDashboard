import { useEffect, useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
const UserApi = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const firstLogin = localStorage.getItem("user");
    if (firstLogin) {
      setIsLogged(true);

      const getUser = async () => {
        try {
          const res = await axios.get("/api/v1/user/me", {
            signal: controller.signal,
          });
          isMounted &&
            setIsAdmin(res.data.user.role === "admin" ? true : false);
        } catch (err) {
          console.log(err);
        }
      };
      getUser();
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
};

export default UserApi;
