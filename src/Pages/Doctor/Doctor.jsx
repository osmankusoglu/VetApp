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
  const [successMessage, setSuccessMessage] = useState(null); // Başarı mesajı
  const [updateMessage, setUpdateMessage] = useState(null); // Güncelleme mesajı
  const [deleteMessage, setDeleteMessage] = useState(null); // Silme mesajı
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı
  const [doctor, setDoctor] = useState(); // Doktor listesi
  const [update, setUpdate] = useState(false); // Güncelleme durumu
  const [newDoctor, setNewDoctor] = useState({
    // Yeni doktor bilgileri

    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  // Güncellenecek doktor bilgileri
  const [updateDoctor, setUpdateDoctor] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

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

  // Doktor listesini API'den çekmek için kullanılan useEffect
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors")
      .then((res) => setDoctor(res.data.content))
      .then(() => console.log(doctor))
      .then(() => setUpdate(true));
  }, [update]);

  // Yeni doktor bilgilerini güncelleme
  const handleNewDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Yeni doktor ekleme
  const handleAddNewDoctor = () => {
    const { name, phone, email, address, city } = newDoctor;

    // Alanların boş olup olmadığını kontrol et
    if (!name || !phone || !email || !address || !city) {
      setErrorMessage("Please fill in all fields!");
      return;
    }
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/doctors", newDoctor)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Doctor added successfully!");
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

  // Doktor bilgilerini güncelleme
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
        setUpdateMessage("Doctor updated successfully!");
      });
  };

  // Güncellenecek doktor bilgilerini ayarlama
  const handleUpdateDoctorInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Güncelleme butonuna tıklayınca ilgili doktor bilgilerini getiren buton
  const handleUpdateDoctorBtn = (e) => {
    const index = e.target.id;
    setUpdateDoctor({ ...doctor[index] });
  };

  // Doktor silme
  const handleDeleteDoctor = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/doctors/${id}`)
      .then(() => setUpdate(false));
    setDeleteMessage("Doctor deleted successfully!");
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
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
        {errorMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="error">{errorMessage}</Alert>
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

          <Button
            sx={{ marginLeft: 13, width: 200, height: 40 }}
            variant="contained"
            color="success"
            onClick={handleUpdateDoctor}
          >
            Update Doctor
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
        </Table>
      </TableContainer>
      {deleteMessage && (
        <Stack sx={{ width: "80%", marginLeft: 20, marginTop: 5 }} spacing={2}>
          <Alert severity="error">{deleteMessage}</Alert>
        </Stack>
      )}
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
