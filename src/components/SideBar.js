import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { IconButton, Button } from "@mui/material";
import { categData } from "./categData";
import { Outlet } from "react-router-dom";
import pesa from "../assets/pesa.png";
const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    width: "auto",

    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "300px" : "50px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="sidebar"
      >
        <section className="navRoute">
          {" "}
          <>
            {" "}
            <AnimatePresence>
              <div>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggle}
                >
                  <HiBars3 />
                </IconButton>{" "}
                <motion.img
                  src={pesa}
                  alt=""
                  variants={showAnimation}
                  inital={{ width: 0, opacity: 0 }}
                  animate={{ width: "15vw", opacity: 1, marginLeft: 5 }}
                  exit={{ width: 0, opacity: 0 }}
                />
              </div>
              {categData.map((item, index) => (
                <NavLink
                  activeclassname="active"
                  to={item.to}
                  className="Link"
                  key={item.id}
                >
                  {" "}
                  <div className="icon">{item.icon}</div>
                  <AnimatePresence>
                    {" "}
                    {isOpen && (
                      <motion.p
                        variants={showAnimation}
                        inital="hidden"
                        animate="show"
                        exit="hidden"
                        className="Link_Text"
                      >
                        {item.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </NavLink>
              ))}
              <div style={{ flexGrow: 1 }} />
            </AnimatePresence>
          </>
        </section>
      </motion.div>
      <main className="mainchick">
        <Outlet />
      </main>
    </div>
  );
};
export default Sidebar;
