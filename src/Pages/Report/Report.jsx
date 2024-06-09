import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const initReport = {
  title: "",
  diagnosis: "",
  price: 0,
  appointmentId: "",
};

function Report() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [report, setReport] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [newReport, setNewReport] = useState({ ...initReport });
  const [update, setUpdate] = useState(false);

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
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/reports")
      .then((res) => {
        console.log("Reports:", res.data.content);
        setReport(res.data.content);
      });

    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/appointments")
      .then((res) => {
        console.log("Appointments:", res.data.content);
        setAppointment(res.data.content);
      });
  }, [update]);

  const handleAddNewReport = () => {
    const selectedAppointment = appointment.find(
      (app) => app.id === newReport.appointmentId
    );

    if (selectedAppointment) {
      const updatedReport = {
        ...newReport,
        customerName: selectedAppointment.customerName,
        doctorName: selectedAppointment.doctorName,
        animalName: selectedAppointment.animalName,
      };

      axios
        .post(
          import.meta.env.VITE_APP_BASE_URL + "/api/v1/reports",
          updatedReport
        )
        .then(() => {
          setUpdate((prevUpdate) => !prevUpdate);
          setNewReport({ ...initReport });
          setSuccessMessage("Added successfully!");
        });
    }
  };

  const handleUpdateReport = (id) => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`,
        newReport
      )
      .then(() => setUpdate((prevUpdate) => !prevUpdate))
      .then(() => setNewReport({ ...initReport }))
      .catch((error) => {
        console.error("Error updating report:", error);
      });
  };

  const handleDeleteReport = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`)
      .then(() => setUpdate((prevUpdate) => !prevUpdate));
    setDeleteMessage("Deleted successfully!");
  };

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

  const handleAppointmentSelectChange = (e) => {
    const id = e.target.value;
    setNewReport((prevReport) => ({
      ...prevReport,
      appointmentId: id,
    }));
  };

  return (
    <div>
      <Typography
        align="center"
        variant="h4"
        style={{
          color: "white",
          backgroundColor: "#1abc9c",
          padding: "10px",
          borderRadius: "4px",
          fontSize: "30px",
        }}
      >
        Report Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px 0",
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <TextField
            label="Title"
            value={newReport.title}
            onChange={(e) =>
              setNewReport({ ...newReport, title: e.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <TextField
            label="Diagnosis"
            value={newReport.diagnosis}
            onChange={(e) =>
              setNewReport({ ...newReport, diagnosis: e.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Price"
            type="number"
            value={newReport.price}
            onChange={(e) =>
              setNewReport({ ...newReport, price: parseFloat(e.target.value) })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="appointment-id-label">Appointment ID</InputLabel>
          <Select
            labelId="Appointment-id"
            id="SelectAppointmentId select-label"
            label="Select Appointment ID"
            value={newReport.appointmentId}
            onChange={handleAppointmentSelectChange}
          >
            {appointment.map((appo) => (
              <MenuItem key={appo.id} value={appo.id}>
                {new Date(appo.appointmentDate).toLocaleDateString()}
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
          variant="contained"
          color="success"
          onClick={handleAddNewReport}
        >
          Add Report
        </Button>
      </Box>
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
                align="center"
              >
                Title
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="center"
              >
                Diagnosis
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="center"
              >
                Price
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="center"
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
                align="center"
              >
                Animal Name
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="center"
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
                align="center"
              >
                Update
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                align="center"
              >
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report?.map((rep, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {rep.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.diagnosis}
                </StyledTableCell>
                <StyledTableCell align="center">{rep.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {rep.customerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.animalName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.doctorName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleUpdateReport(rep.id)}
                  >
                    UPDATE
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteReport(rep.id)}
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
    </div>
  );
}

export default Report;
