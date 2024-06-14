import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Box from "@mui/material/Box";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

dayjs.extend(utc);

function AvailableDate() {
  const initState = {
    workDay: null,
    workDate: null,
    doctorId: "",
  };

  const [successMessage, setSuccessMessage] = useState(null); // Başarı mesajı
  const [deleteMessage, setDeleteMessage] = useState(null); // Silme mesajı
  const [availableDate, setAvailableDate] = useState([]); // Mevcut tarihler
  const [doctor, setDoctor] = useState([]); // API'den gelen doktor listesi
  const [newDate, setNewDate] = useState({ ...initState }); // Yeni tarih eklemek için

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

  // Veri çekme işlemleri için bir fonksiyon tanımlayalım
  const fetchData = () => {
    // Available Dates'leri çek
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/available-dates")
      .then((res) => {
        console.log("Available Dates:", res.data.content);
        const fetchedDates = res.data.content.map((item) => ({
          ...item,
          workDay: item.workDay
            ? dayjs(item.workDay).format("YYYY-MM-DD")
            : "N/A",
        }));
        setAvailableDate(fetchedDates);
      });

    // Doktor verilerini API'den çekmek için kullanılan useEffect
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors")
      .then((res) => {
        setDoctor(res.data.content);
      });
  };

  // Sayfa yüklendiğinde ve veri güncellendiğinde verileri çek
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Yeni müsait gün eklemek
  const handleAddNewDate = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/available-dates", {
        ...newDate,
        workDate: newDate.workDay,
      })
      .then((res) => {
        console.log(res);
        setSuccessMessage("Doctor's available day added successfully!");
        setNewDate({ ...initState });
        fetchData(); // Verileri güncelle
      });
  };

  // Müsait gün silme işlemi
  const handleDeleteDate = (id) => {
    axios
      .delete(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/available-dates/${id}`
      )
      .then(() => {
        setDeleteMessage("Doctor's available day deleted successfully!");
        fetchData(); // Verileri güncelle
      });
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

  return (
    <div>
      <div>
        <br />
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
          Add Available Date
        </Typography>
        <br />
        <br />
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ minWidth: 260, marginTop: 1 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Select Doctor
            </InputLabel>
            <Select
              labelId="Doctor"
              id="SelectDoctor select-label"
              value={newDate.doctorId || ""}
              label="Select Doctor"
              onChange={(e) =>
                setNewDate({ ...newDate, doctorId: e.target.value })
              }
            >
              {doctor?.map((doc, index) => (
                <MenuItem key={index} value={doc.id}>
                  {doc.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                format="YYYY-MM-DD"
                disablePast
                views={["year", "month", "day"]}
                sx={{ width: 260 }}
                label="Select Date"
                value={newDate.workDay ? dayjs(newDate.workDay) : null}
                onChange={(date) =>
                  setNewDate({
                    ...newDate,
                    workDay: date ? dayjs(date).format("YYYY-MM-DD") : null,
                  })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <Button
            sx={{ height: 50, marginTop: 1 }}
            variant="contained"
            color="success"
            onClick={handleAddNewDate}
          >
            Add New Available Date
          </Button>
        </Box>
        {successMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
        <br />
        <br />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                align="center"
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Date
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
                Doctor
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
            {availableDate?.map((date, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row" align="center">
                  {date.workDay !== "N/A"
                    ? dayjs(date.workDay).format("YYYY-MM-DD")
                    : "Invalid Date"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {date.doctor.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteDate(date.id)}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        {deleteMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="error">{deleteMessage}</Alert>
          </Stack>
        )}
        <br />
        <br />
      </TableContainer>
    </div>
  );
}

export default AvailableDate;
