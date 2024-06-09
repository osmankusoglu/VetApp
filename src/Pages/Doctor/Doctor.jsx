import { useState, useEffect } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";

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
import AvailableDate from "../AvailableDate/AvailableDate";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Doctor() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [doctor, setDoctor] = useState();
  const [update, setUpdate] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateDoctor, setUpdateDoctor] = useState({
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
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content))
      .then(() => console.log(doctor))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewDoctor = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors", newDoctor)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Added successfully!");
        setUpdate(false);
        setNewDoctor({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
      });
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/${id}`,
        updateDoctor
      )
      .then((res) => {
        console.log(res);
        setUpdate(false);
        setUpdateDoctor({
          id: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        });
        setUpdateMessage("Updated successfully!");
      });
  };

  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDoctorBtn = (e) => {
    const index = e.target.id;
    setUpdateDoctor({ ...doctor[index] });
  };

  const handleDeleteDoctor = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/${id}`)
      .then(() => setUpdate(false));
    setDeleteMessage("Deleted successfully!");
  };

  /////////////////////////////////

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  ////////////////

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
          Add New Doctor
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="name"
          placeholder="Name"
          value={newDoctor.name}
          onChange={handleNewDoctorInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="email"
          placeholder="Email"
          value={newDoctor.email}
          onChange={handleNewDoctorInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="phone"
          placeholder="Phone"
          value={newDoctor.phone}
          onChange={handleNewDoctorInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="address"
          placeholder="Address"
          value={newDoctor.address}
          onChange={handleNewDoctorInputChange}
        />

        <TextField
          sx={{ marginLeft: 13, marginTop: 1 }}
          variant="standard"
          type="text"
          name="city"
          placeholder="City"
          value={newDoctor.city}
          onChange={handleNewDoctorInputChange}
        />

        <Button
          sx={{ marginLeft: 13, width: 200, height: 40 }}
          variant="contained"
          color="success"
          onClick={handleAddNewDoctor}
        >
          Add Doctor
        </Button>
        {successMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
        <br />
        <br />
        <div>
          <br />
          <Typography
            variant="h4"
            style={{
              color: "white",
              backgroundColor: "#1abc9c",
              padding: "10px",
              borderRadius: "4px",
              fontSize: "30px",
            }}
          >
            Update Doctor
          </Typography>
          <br />
          <br />
          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="name"
            placeholder="Name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="email"
            placeholder="Email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="phone"
            placeholder="Phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="address"
            placeholder="Address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputChange}
          />

          <TextField
            sx={{ marginLeft: 13, marginTop: 1 }}
            variant="standard"
            type="text"
            name="city"
            placeholder="City"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputChange}
          />
          {updateMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="success">{updateMessage}</Alert>
            </Stack>
          )}
          <Button
            sx={{ marginLeft: 13, width: 200, height: 40 }}
            variant="contained"
            color="success"
            onClick={handleUpdateDoctor}
          >
            Update Doctor
          </Button>
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
                Doctor Name
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
                Doctor Email
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
                Doctor Phone
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
                Doctor Address
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
                Doctor City
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
                Doctor Update
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
                Doctor Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody> </TableBody>
        </Table>
        <br />
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableBody>
            {doctor?.map((doct, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {doct.name}
                </StyledTableCell>
                <StyledTableCell align="left">{doct.email}</StyledTableCell>
                <StyledTableCell align="left">{doct.phone}</StyledTableCell>
                <StyledTableCell align="left">{doct.address}</StyledTableCell>
                <StyledTableCell align="left">{doct.city}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleUpdateDoctorBtn}
                    id={index}
                  >
                    UPDATE
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteDoctor}
                    id={doct.id}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          {deleteMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{deleteMessage}</Alert>
            </Stack>
          )}
        </Table>
      </TableContainer>
      <br />

      {/* <ul>
        {doctor?.map((cust, index) => (
          <li key={index}>
            <Button onClick={handleDeleteDoctor} id={cust.id}>
              DELETE
            </Button>{" "}
            -{" "}
            <Button onClick={handleUpdateDoctorBtn} id={index}>
              UPDATE
            </Button>
          </li>
        ))}
      </ul> */}
      <AvailableDate />
    </Box>
  );
}

export default Doctor;
