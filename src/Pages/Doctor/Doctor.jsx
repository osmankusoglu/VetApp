import { useState, useEffect } from "react";
import axios from "axios";
import "./Doctor.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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

function Doctor() {
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
      .then((res) => console.log(res))
      .then(setUpdate(false))
      .then(() =>
        setNewDoctor({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleUpdateDoctor = () => {
    const { id } = updateDoctor;
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/${id}`,
        updateDoctor
      )
      .then(() => setUpdate(false))
      .then(() =>
        setUpdateDoctor({
          id: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
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

  return (
    <div>
      <div className="div-table">
        <div>
          <h3 className="title-h3">Add New Doctor</h3>
          <br />
          <TextField
            variant="standard"
            type="text"
            name="name"
            placeholder="Name"
            value={newDoctor.name}
            onChange={handleNewDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={handleNewDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="phone"
            placeholder="Phone"
            value={newDoctor.phone}
            onChange={handleNewDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="address"
            placeholder="Address"
            value={newDoctor.address}
            onChange={handleNewDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="city"
            placeholder="City"
            value={newDoctor.city}
            onChange={handleNewDoctorInputChange}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={handleAddNewDoctor}
          >
            Add Doctor
          </Button>
          <br />
          <br />
        </div>
        <br />
        <div>
          <h3 className="title-h3">Update Doctor</h3>
          <br />
          <TextField
            variant="standard"
            type="text"
            name="name"
            placeholder="Name"
            value={updateDoctor.name}
            onChange={handleUpdateDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="email"
            placeholder="Email"
            value={updateDoctor.email}
            onChange={handleUpdateDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="phone"
            placeholder="Phone"
            value={updateDoctor.phone}
            onChange={handleUpdateDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="address"
            placeholder="Address"
            value={updateDoctor.address}
            onChange={handleUpdateDoctorInputChange}
          />
          <br />
          <TextField
            variant="standard"
            type="text"
            name="city"
            placeholder="City"
            value={updateDoctor.city}
            onChange={handleUpdateDoctorInputChange}
          />
          <br />
          <br />
          <Button
            variant="contained"
            color="success"
            onClick={handleUpdateDoctor}
          >
            Update Doctor
          </Button>
        </div>
        <br />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Doctor Name</StyledTableCell>
              <StyledTableCell align="left">Doctor Email</StyledTableCell>
              <StyledTableCell align="left">Doctor Phone</StyledTableCell>
              <StyledTableCell align="left">Doctor Address</StyledTableCell>
              <StyledTableCell align="left">Doctor City</StyledTableCell>
              <StyledTableCell align="left">Doctor Update</StyledTableCell>
              <StyledTableCell align="left">Doctor Delete</StyledTableCell>
            </TableRow>
          </TableHead>
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
        </Table>
      </TableContainer>

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
    </div>
  );
}

export default Doctor;
