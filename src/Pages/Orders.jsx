import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { SlOptions } from "react-icons/sl";
import { IconButton, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#933FDF",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/v1/order/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
      Swal.fire({ icon: "success", title: "Deleted!", text: "Order Deleted" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong Try again Later!",
      });
    }
  };
  const updateOrder = async (id) => {
    try {
      await axios.put(`/api/v1/order/${id}`, { status: "completed" });
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: "completed" } : order
        )
      );
      Swal.fire({ icon: "success", title: "Updated!", text: "Order Updated" });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong Try again Later!",
      });
      console.log(err.message);
    }
  };

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
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Bookings Made</h1>
        <h3>{orders.length} Bookings</h3>
      </div>
      <TableContainer component={Paper} style={{ height: "min-content" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Mode of Study</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <>
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">{row.amount}</StyledTableCell>
                  <StyledTableCell align="left">{row.mode}</StyledTableCell>
                  <StyledTableCell align="left">
                    {row.start}
                  </StyledTableCell>{" "}
                  <StyledTableCell align="left">{row.status}</StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton
                      size="small"
                      edge="start"
                      aria-controls={open ? "demo-customized-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      color="inherit"
                      aria-label="option"
                      sx={{ mr: 2 }}
                    >
                      <SlOptions />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      updateOrder(row._id);
                      handleClose();
                    }}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FaLongArrowAltLeft />
                    {"  "}
                    Status complete
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      deleteOrder(row._id);
                      handleClose();
                    }}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <MdDeleteOutline />
                    Delete Booking
                  </MenuItem>
                </StyledMenu>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
