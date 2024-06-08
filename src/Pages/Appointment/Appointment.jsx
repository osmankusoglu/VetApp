import { useEffect, useState } from "react";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Box, Button, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

function Appointment() {
  const initState = {
    id: null,
    appointmentDate: "",
    doctor: {
      id: null,
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
    },
    animal: {
      id: null,
      name: "",
      species: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      colour: "",
    },
  };

  const [appointment, setAppointment] = useState();
  const [doctor, setDoctor] = useState();
  const [animal, setAnimal] = useState();
  const [newAppointment, setNewAppointment] = useState({ ...initState });
  const [updateAppointment, setUpdateAppointment] = useState({ ...initState });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments")
      .then((res) => setAppointment(res.data.content));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content));
  }, []);

  const handleNewAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditAppointmentInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDoctorSelectChange = (e) => {
    const id = e.target.value;
    const selectedDoctor = doctor.find((doc) => doc.id === +id);
    setNewAppointment((prev) => ({
      ...prev,
      doctor: selectedDoctor,
    }));
  };

  const handleEditDoctorSelectChange = (e) => {
    const id = e.target.value;
    const selectedDoctor = doctor.find((doc) => doc.id === +id);
    setUpdateAppointment((prev) => ({
      ...prev,
      doctor: selectedDoctor,
    }));
  };

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animal.find((ani) => ani.id === +id);
    setNewAppointment((prev) => ({
      ...prev,
      animal: selectedAnimal,
    }));
  };

  const handleEditAnimalSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animal.find((ani) => ani.id === +id);
    setUpdateAppointment((prev) => ({
      ...prev,
      animal: selectedAnimal,
    }));
  };

  const handleAddNewAppointment = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments",
        newAppointment
      )
      .then(() => {
        setNewAppointment({ ...initState });
        window.location.reload();
      });
  };

  const handleUpdateAppointment = () => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${
          updateAppointment.id
        }`,
        updateAppointment
      )
      .then(() => {
        setUpdateAppointment({ ...initState });
        window.location.reload();
      });
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`)
      .then(() => {
        setAppointment(appointment.filter((app) => app.id !== id));
      });
  };

  const handleEditAppointment = (appointment) => {
    setUpdateAppointment(appointment);
  };

  return (
    <Box>
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
          Add Appointment
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Appointment Date"
          type="datetime-local"
          variant="standard"
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleNewAppointmentInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Doctor
          </InputLabel>
          <Select
            labelId="Doctor"
            id="SelectDoctor select-label"
            label="Select Doctor"
            value={newAppointment.doctor?.id || ""}
            onChange={handleDoctorSelectChange}
          >
            {doctor?.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Animal
          </InputLabel>
          <Select
            labelId="Animal"
            id="SelectAnimal select-label"
            label="Select Animal"
            value={newAppointment.animal?.id || ""}
            onChange={handleAnimalSelectChange}
          >
            {animal?.map((ani) => (
              <MenuItem key={ani.id} value={ani.id}>
                {ani.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ marginLeft: 4, height: 54, width: 223 }}
          variant="contained"
          color="success"
          onClick={handleAddNewAppointment}
        >
          Add Appointment
        </Button>
      </div>
      <br />
      <Box>
        <Typography
          variant="h4"
          style={{
            color: "white",
            backgroundColor: "#1abc9c",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "30px",
            marginTop: "20px",
          }}
        >
          Update Appointment
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Appointment Date"
          type="datetime-local"
          variant="standard"
          name="appointmentDate"
          value={updateAppointment.appointmentDate}
          onChange={handleEditAppointmentInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Doctor
          </InputLabel>
          <Select
            labelId="Doctor"
            id="SelectDoctor select-label"
            label="Select Doctor"
            value={updateAppointment.doctor?.id || ""}
            onChange={handleEditDoctorSelectChange}
          >
            {doctor?.map((doc) => (
              <MenuItem key={doc.id} value={doc.id}>
                {doc.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Animal
          </InputLabel>
          <Select
            labelId="Animal"
            id="SelectAnimal select-label"
            label="Select Animal"
            value={updateAppointment.animal?.id || ""}
            onChange={handleEditAnimalSelectChange}
          >
            {animal?.map((ani) => (
              <MenuItem key={ani.id} value={ani.id}>
                {ani.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          sx={{ marginLeft: 4, height: 54, width: 223 }}
          variant="contained"
          color="success"
          onClick={handleUpdateAppointment}
        >
          Update Appointment
        </Button>
      </Box>
      <br />
      <br />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Appointment Date & Time
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Doctor Name
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Animal Name
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Appointment Update
              </TableCell>
              <TableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Appointment Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointment?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.doctor.name}</TableCell>
                <TableCell>{appointment.animal.name}</TableCell>
                <TableCell>
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleEditAppointment(appointment)}
                  >
                    UPDATE
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      marginRight: "10px",
                    }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteAppointment(appointment.id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Appointment;
