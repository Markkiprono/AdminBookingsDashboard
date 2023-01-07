import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IconButton, Button } from "@mui/material";
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

function createData(title, price, availability, date) {
  return { title, price, availability, date };
}

const rows = [
  createData("Rise and Fall", 1000, 1, "3-1-2023"),
  createData("Ups and Downs", 2000, 1, "1-9-2022"),
  createData("Odds and Evens", 3000, 0, "9-9-2022"),
  createData("Rich Dad poor Dad", 3000, 1, "1-9-2022"),
];

const Classes = () => {
  return (
    <>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Classes</h1>
        <Button
          style={{
            background: "#933FDF",
            color: "white",
            paddingRight: "5px",
            paddingLeft: "5px",
          }}
        >
          Add +
        </Button>
      </div>
      <TableContainer component={Paper} style={{ height: "min-content" }}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Availability</StyledTableCell>
              <StyledTableCell align="left">Date Added</StyledTableCell>
              <StyledTableCell align="left"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="left">{row.price}</StyledTableCell>
                <StyledTableCell align="left">
                  {row.availability}
                </StyledTableCell>
                <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton
                    size="small"
                    edge="start"
                    color="error"
                    aria-label="delete"
                    sx={{ mr: 2 }}
                  >
                    <MdOutlineDeleteOutline />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Classes;
