import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

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

  const [successMessage, setSuccessMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [appointment, setAppointment] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ ...initState });
  const [updateAppointment, setUpdateAppointment] = useState({ ...initState });
  const [searchDoctor, setSearchDoctor] = useState("");
  const [searchAnimal, setSearchAnimal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
      .then((res) => {
        console.log(res);
        setSuccessMessage("Added successfully!");
        setUpdate(true);
        setNewAppointment({ ...initState });
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
      .then((res) => {
        console.log(res);
        setUpdateMessage("Updated successfully!");
        setUpdate(false);
        setUpdateAppointment({ ...initState });
      });
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/appointments/${id}`)
      .then(() => {
        setAppointment(appointment.filter((app) => app.id !== id));
        setDeleteMessage("Deleted successfully!");
      });
  };

  const handleNewUpdateAppointment = (appointment) => {
    setUpdateAppointment(appointment);
  };

  const handleDoctorSearchTermChange = (e) => {
    setSearchDoctor(e.target.value);
  };

  const handleAnimalSearchTermChange = (e) => {
    setSearchAnimal(e.target.value);
  };

  const clearFilters = () => {
    setSearchDoctor("");
    setSearchAnimal("");
    setStartDate("");
    setEndDate("");
  };

  const filterAppointment = (
    appointment,
    doctorTerm,
    animalTerm,
    startDate,
    endDate
  ) => {
    return appointment.filter((appointment) => {
      const doctorName = appointment.doctor.name.toLowerCase();
      const animalName = appointment.animal.name.toLowerCase();
      const doctorSearchTermMatch = doctorName.includes(
        doctorTerm.toLowerCase()
      );
      const animalSearchTermMatch = animalName.includes(
        animalTerm.toLowerCase()
      );
      const startDateMatch = startDate
        ? new Date(appointment.appointmentDate) >= new Date(startDate)
        : true;
      const endDateMatch = endDate
        ? new Date(appointment.appointmentDate) <= new Date(endDate)
        : true;
      return (
        doctorSearchTermMatch &&
        animalSearchTermMatch &&
        startDateMatch &&
        endDateMatch
      );
    });
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
        {successMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
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
        {updateMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="success">{updateMessage}</Alert>
          </Stack>
        )}
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

      <div>
        <Typography
          style={{
            color: "white",
            backgroundColor: "#1aec9c",
            padding: "10px",
            fontSize: "20px",
          }}
          sx={{ fontWeight: "700" }}
        >
          Filter Appointments
        </Typography>
        <br />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1, width: 223 }}
          label="Search by Doctor Name"
          variant="standard"
          value={searchDoctor}
          onChange={handleDoctorSearchTermChange}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1, width: 223 }}
          label="Search by Animal Name"
          variant="standard"
          value={searchAnimal}
          onChange={handleAnimalSearchTermChange}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Start Date"
          type="datetime-local"
          variant="standard"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="End Date"
          type="datetime-local"
          variant="standard"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          sx={{ marginLeft: 4, height: 54, width: 223 }}
          variant="contained"
          color="success"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      <TableContainer component={Paper}>
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
          Appointments
        </Typography>
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
            {filterAppointment(
              appointment,
              searchDoctor,
              searchAnimal,
              startDate,
              endDate
            ).map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.appointmentDate}</TableCell>
                <TableCell>{appointment.doctor.name}</TableCell>
                <TableCell>{appointment.animal.name}</TableCell>
                <TableCell>
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleNewUpdateAppointment(appointment)}
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
          {deleteMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{deleteMessage}</Alert>
            </Stack>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Appointment;
