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
  id: null,
  title: "",
  diagnosis: "",
  price: 0,
  appointmentId: "",
};

function Report() {
  const [searchValue, setSearchValue] = useState(""); // Arama değeri
  const [successMessage, setSuccessMessage] = useState(null); // Başarı mesajı
  const [updateMessage, setUpdateMessage] = useState(null); // Güncelleme mesajı
  const [deleteMessage, setDeleteMessage] = useState(null); // Silme mesajı
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı
  const [report, setReport] = useState([]); // Tüm raporlar
  const [appointment, setAppointment] = useState([]); // Tüm randevular
  const [newReport, setNewReport] = useState({ ...initReport }); // Yeni rapor
  const [update, setUpdate] = useState(false); // Güncelleme tetikleyici
  const [updateReport, setUpdateReport] = useState({ ...initReport }); // Güncellenecek rapor

  // Silme başarılıysa göster ve 3 saniye göster
  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  // Ekleme başarılıysa göster ve 3 saniye göster
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Güncelleme başarılıysa göster ve 3 saniye göster
  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(() => {
        setUpdateMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [updateMessage]);

  // Hata mesajı göster ve 3 saniye göster
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Verilerin API'den çekilmesi
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

  // Yeni rapor eklemek
  const handleAddNewReport = () => {
    const { title, diagnosis, price } = newReport;

    // Alanların boş olup olmadığını kontrol et
    if (!title || !diagnosis || !price) {
      setErrorMessage("Please fill in all fields!");
      return;
    }
    // Seçilen randevunun geçerliliğini kontrol et
    const selectedAppointment = appointment.find(
      (app) => app.id === newReport.appointmentId
    );

    if (!selectedAppointment) {
      setDeleteMessage("Invalid appointment selected");
      return;
    }

    // Yeni rapor objesini güncelle
    const updatedReport = {
      ...newReport,
      customerName: selectedAppointment.customerName,
      doctorName: selectedAppointment.doctorName,
      animalName: selectedAppointment.animalName,
    };

    // API'ye yeni raporu ekle
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/reports",
        updatedReport
      )
      .then(() => {
        setUpdate((prevUpdate) => !prevUpdate);
        setSuccessMessage("Report added successfully!");
        setNewReport({ ...initReport });
      })
      .catch((error) => {
        console.error("Error adding report:", error);
        setErrorMessage(
          "The report could not be added. Because the report was created before this date."
        );
      });
  };

  // Raporu güncelleme
  const handleUpdateReport = (id, updatedReport) => {
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`,
        updatedReport
      )
      .then(() => {
        setUpdate((prevUpdate) => !prevUpdate);
        setUpdateMessage("Report updated successfully!");
        setUpdateReport({ ...initReport });
      });
  };

  // Raporu silme
  const handleDeleteReport = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/reports/${id}`)
      .then(() => setUpdate((prevUpdate) => !prevUpdate));
    setDeleteMessage("Report deleted successfully!");
  };

  // Yeni rapor eklerken randevu seçimi
  const handleAppointmentSelectChange = (e) => {
    const id = e.target.value;
    setNewReport((prevReport) => ({
      ...prevReport,
      appointmentId: id,
    }));
  };

  // Güncellenen rapor için randevu seçimi
  const handleUpdateAppointmentSelectChange = (e) => {
    const id = e.target.value;
    setUpdateReport((prevReport) => ({
      ...prevReport,
      appointmentId: id,
    }));
  };

  // Bir raporu düzenlemek için işlemler
  const handleUpdatedReport = (rep) => {
    setUpdateReport({
      id: rep.id,
      title: rep.title,
      diagnosis: rep.diagnosis,
      price: rep.price,
      appointmentId: rep.appointment.id,
    });
  };

  // Arama değerine göre raporları filtrele
  const filteredReport = report?.filter((rep) =>
    rep.title.toLowerCase().includes(searchValue.toLowerCase())
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
    <div>
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
        Add Report
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
            id="SelectAppointmentId"
            label="Select Appointment ID"
            value={newReport.appointmentId}
            onChange={handleAppointmentSelectChange}
          >
            {appointment.map((appo) => (
              <MenuItem key={appo.id} value={appo.id}>
                {`Date:${appo.appointmentDate.split("T")[0]} / Time:${
                  appo.appointmentDate.split("T")[1]
                } /  Animal: ${appo.animal.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="success"
          onClick={handleAddNewReport}
        >
          Add Report
        </Button>
      </Box>
      {successMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="success">{successMessage}</Alert>
        </Stack>
      )}
      {errorMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      )}
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
        Update Report
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
            value={updateReport.title}
            onChange={(e) =>
              setUpdateReport({ ...updateReport, title: e.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <TextField
            label="Diagnosis"
            value={updateReport.diagnosis}
            onChange={(e) =>
              setUpdateReport({ ...updateReport, diagnosis: e.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <TextField
            label="Price"
            type="number"
            value={updateReport.price}
            onChange={(e) =>
              setUpdateReport({
                ...updateReport,
                price: parseFloat(e.target.value),
              })
            }
          />
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="appointment-id-label">Appointment ID</InputLabel>
          <Select
            labelId="Appointment-id"
            id="SelectAppointmentId"
            label="Select Appointment ID"
            value={updateReport.appointmentId}
            onChange={handleUpdateAppointmentSelectChange}
          >
            {appointment.map((appo) => (
              <MenuItem key={appo.id} value={appo.id}>
                {`Date:${appo.appointmentDate.split("T")[0]} / Time:${
                  appo.appointmentDate.split("T")[1]
                } /  Animal: ${appo.animal.name}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="success"
          onClick={() =>
            handleUpdateReport(updateReport.id, {
              title: updateReport.title,
              diagnosis: updateReport.diagnosis,
              price: updateReport.price,
              appointmentId: updateReport.appointmentId,
            })
          }
        >
          Update Report
        </Button>
      </Box>
      {updateMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="success">{updateMessage}</Alert>
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
        Search Report
      </Typography>
      <br />
      <TextField
        sx={{ marginLeft: 5, marginTop: 1 }}
        variant="outlined"
        placeholder="Search Report"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <br />
      <br />
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
            {filteredReport?.map((rep, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {rep.title}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.diagnosis}
                </StyledTableCell>
                <StyledTableCell align="center">{rep.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {rep.appointment.customerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.appointment.animalName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {rep.appointment.doctorName}
                </StyledTableCell>

                <StyledTableCell align="center">
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleUpdatedReport(rep)}
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
        </Table>
      </TableContainer>
      {deleteMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="error">{deleteMessage}</Alert>
        </Stack>
      )}
    </div>
  );
}

export default Report;
