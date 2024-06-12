import { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Customer() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(() => {
        setUpdateMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateMessage]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => console.log(customer))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers",
        newCustomer
      )
      .then((res) => {
        console.log(res);
        setSuccessMessage("Customer added successfully!");
        setUpdate(false);
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      });
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/${id}`,
        updateCustomer
      )
      .then(() => {
        setUpdateMessage("Customer updated successfully!");
        setUpdate(false);
        setUpdateCustomer({
          id: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      });
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomerBtn = (id) => {
    const selectedCustomer = customer.find((cust) => cust.id === id);
    if (selectedCustomer) {
      setUpdateCustomer(selectedCustomer);
    }
  };

  const handleDeleteCustomer = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/${id}`)
      .then(() => setUpdate(false));
    setDeleteMessage("Deleted successfully!");
  };

  const filteredCustomers = customer?.filter((cust) =>
    cust.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box>
      <TableContainer component={Paper}>
        <br />
        <Typography
          variant="h4"
          style={{
            color: "white",
            backgroundColor: "#1abc9c",
            padding: "20px",
            borderRadius: "4px",
            fontSize: "30px",
          }}
        >
          Add New Customer
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleNewCustomerInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleNewCustomerInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleNewCustomerInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleNewCustomerInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="city"
          placeholder="City"
          value={newCustomer.city}
          onChange={handleNewCustomerInputChange}
        />
        <Button
          sx={{ marginLeft: 13, width: 200, height: 40 }}
          variant="contained"
          color="success"
          onClick={handleAddNewCustomer}
        >
          Add Customer
        </Button>
        {successMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}

        <br />
        <div>
          <br />
          <Typography
            variant="h4"
            style={{
              color: "white",
              backgroundColor: "#1abc9c",
              padding: "20px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
            Update Customer
          </Typography>
          <br />
          <br />
          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="name"
            placeholder="Name"
            value={updateCustomer.name}
            onChange={handleUpdateCustomerInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="email"
            placeholder="Email"
            value={updateCustomer.email}
            onChange={handleUpdateCustomerInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="phone"
            placeholder="Phone"
            value={updateCustomer.phone}
            onChange={handleUpdateCustomerInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="address"
            placeholder="Address"
            value={updateCustomer.address}
            onChange={handleUpdateCustomerInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="city"
            placeholder="City"
            value={updateCustomer.city}
            onChange={handleUpdateCustomerInputChange}
          />

          <Button
            sx={{ marginLeft: 13, width: 200, height: 40 }}
            variant="contained"
            color="success"
            onClick={handleUpdateCustomer}
          >
            Update Customer
          </Button>
          {updateMessage && (
            <Stack
              sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
              spacing={2}
            >
              <Alert severity="success">{updateMessage}</Alert>
            </Stack>
          )}
        </div>
        <br />
        <br />
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Customer Name
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer Email
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer Phone
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer Address
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer City
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer Update
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="left"
              >
                Customer Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers?.map((cust, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {cust.name}
                </StyledTableCell>
                <StyledTableCell align="left">{cust.email}</StyledTableCell>
                <StyledTableCell align="left">{cust.phone}</StyledTableCell>
                <StyledTableCell align="left">{cust.address}</StyledTableCell>
                <StyledTableCell align="left">{cust.city}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleUpdateCustomerBtn(cust.id)} // ID'yi buradan geçiyoruz
                  >
                    UPDATE
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteCustomer}
                    id={cust.id}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="error">{deleteMessage}</Alert>
        </Stack>
      )}
      <br />
      <Typography
        style={{
          color: "white",
          backgroundColor: "#1aec9c",
          padding: "10px",
          fontSize: "20px",
        }}
        sx={{ fontWeight: "700" }}
      >
        Search Customer Name
      </Typography>
      <br />
      <TextField
        sx={{ marginLeft: 5, marginTop: 1 }}
        variant="outlined"
        placeholder="Search Customer Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <br />
      <br />
    </Box>
  );
}

export default Customer;
