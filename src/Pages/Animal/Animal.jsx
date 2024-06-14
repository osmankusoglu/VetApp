import { useEffect, useState } from "react";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
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

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Animal() {
  // Yeni hayvan ekleme formunun başlangıç durumu
  const initState = {
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    colour: "",
    customer: {}, // İlgili müşteri bilgisi
  };

  const [successMessage, setSuccessMessage] = useState(null); // Başarı mesajı
  const [updateMessage, setUpdateMessage] = useState(null); // Güncelleme mesajı
  const [deleteMessage, setDeleteMessage] = useState(null); // Silme mesajı
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajı
  const [searchValue, setSearchValue] = useState(""); // Arama değerleri için state'ler
  const [customerSearchValue, setCustomerSearchValue] = useState(""); // Arama değerleri için state'ler
  const [animal, setAnimal] = useState([]); // API'den gelen hayvan state
  const [customer, setCustomer] = useState([]); // API'den gelen müşteri
  const [update, setUpdate] = useState(false); // Güncelleme durumu
  const [newAnimal, setNewAnimal] = useState({
    // Yeni hayvan bilgileri
    ...initState,
  });

  // Hayvan güncelleme formu için kullanılan state
  const [updateAnimal, setUpdateAnimal] = useState({
    id: "",
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    colour: "",
    customer: {},
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

  // API'den hayvan ve müşteri verilerini çekmek için kullanılan useEffect
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  // Yeni hayvan formunun input değişikliklerini yönetir
  const handleNewAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newAnimal);
  };

  // Müşteri seçim değişikliğini yönetir
  const handleCustomerSelectChange = (e) => {
    const id = e.target.value;
    const newCustomer = customer.find((cus) => cus.id === +id);
    setNewAnimal((prev) => ({
      ...prev,
      customer: newCustomer,
    }));
    console.log(newAnimal);
  };

  // Yeni hayvan ekleme
  const handleAddNewAnimal = () => {
    const { name, species, breed, gender, dateOfBirth, colour, customer } =
      newAnimal;
    if (
      !name ||
      !species ||
      !breed ||
      !gender ||
      !dateOfBirth ||
      !colour ||
      !customer
    ) {
      setErrorMessage("Please fill in all fields!");
      return;
    }
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals", newAnimal)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Animal added successfully!");
        setUpdate(false);
        setNewAnimal({ ...initState });
      });
  };

  // Hayvan güncelleme işlemi
  const handleUpdateAnimal = () => {
    const { id } = updateAnimal;
    axios.put(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`,
      updateAnimal
    );
    setUpdate(false);
    setUpdateMessage("Animal updated successfully!");
    setUpdateAnimal({
      id: "",
      name: "",
      species: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      colour: "",
      customer: {},
    });
  };

  // Güncelleme formunun input değişikliklerini yönetir
  const handleUpdateAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Güncelleme düğmesine tıklanıldığında, ilgili hayvanı formda gösterir
  const handleUpdateAnimalBtn = (id) => {
    const selectedAnimal = animal.find((a) => a.id === id);
    setUpdateAnimal({ ...selectedAnimal });
  };

  // Hayvan silme için kullanulan fonksiyon
  const handleDeleteAnimal = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`)
      .then(() => setUpdate(false));
    setDeleteMessage("Animal deleted successfully!");
  };

  // Filtrelenmiş hayvan listesi
  const filteredAnimals = animal?.filter((anim) => {
    const animalNameMatch = anim.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const customerNameMatch = anim.customer.name
      .toLowerCase()
      .includes(customerSearchValue.toLowerCase());
    return animalNameMatch && customerNameMatch;
  });

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
          Add Animal
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Animal Name"
          variant="standard"
          name="name"
          value={newAnimal.name}
          onChange={handleNewAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Species"
          variant="standard"
          name="species"
          value={newAnimal.species}
          onChange={handleNewAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Breed"
          variant="standard"
          name="breed"
          value={newAnimal.breed}
          onChange={handleNewAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Gender"
          variant="standard"
          name="gender"
          value={newAnimal.gender}
          onChange={handleNewAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          type="date"
          label="Date of Birth"
          variant="standard"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimalInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Colour"
          variant="standard"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimalInputChange}
        />

        <FormControl
          variant="standard"
          sx={{ marginLeft: 4, marginTop: 1, minWidth: 200 }}
        >
          <InputLabel id="customer-label">Customer</InputLabel>
          <Select
            labelId="customer-label"
            value={newAnimal.customer.id || ""}
            onChange={handleCustomerSelectChange}
            label="Customer"
            name="customer"
          >
            {customer.map((cus) => (
              <MenuItem key={cus.id} value={cus.id}>
                {cus.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          sx={{ marginLeft: 4, marginTop: 1, height: "40px" }}
          variant="contained"
          color="success"
          onClick={handleAddNewAnimal}
        >
          Add Animal
        </Button>
      </div>

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
        Update Animal
      </Typography>

      <br />
      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Animal Name"
        variant="standard"
        name="name"
        value={updateAnimal.name}
        onChange={handleUpdateAnimalInputChange}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Species"
        variant="standard"
        name="species"
        value={updateAnimal.species}
        onChange={handleUpdateAnimalInputChange}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Breed"
        variant="standard"
        name="breed"
        value={updateAnimal.breed}
        onChange={handleUpdateAnimalInputChange}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Gender"
        variant="standard"
        name="gender"
        value={updateAnimal.gender}
        onChange={handleUpdateAnimalInputChange}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        type="date"
        label="Date of Birth"
        variant="standard"
        name="dateOfBirth"
        value={updateAnimal.dateOfBirth}
        onChange={handleUpdateAnimalInputChange}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Colour"
        variant="standard"
        name="colour"
        value={updateAnimal.colour}
        onChange={handleUpdateAnimalInputChange}
      />

      <FormControl
        variant="standard"
        sx={{ marginLeft: 4, marginTop: 1, minWidth: 200 }}
      >
        <InputLabel id="customer-label">Customer</InputLabel>
        <Select
          labelId="customer-label"
          value={updateAnimal.customer.id || ""}
          onChange={(e) => {
            const id = e.target.value;
            const newCustomer = customer.find((cus) => cus.id === +id);
            setUpdateAnimal((prev) => ({
              ...prev,
              customer: newCustomer,
            }));
          }}
          label="Customer"
          name="customer"
        >
          {customer.map((cus) => (
            <MenuItem key={cus.id} value={cus.id}>
              {cus.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        sx={{ marginLeft: 4, marginTop: 1, height: "40px" }}
        variant="contained"
        color="success"
        onClick={handleUpdateAnimal}
      >
        Update Animal
      </Button>

      {updateMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="success">{updateMessage}</Alert>
        </Stack>
      )}

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
                align="left"
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
                align="left"
              >
                Species
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
                Breed
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
                Gender
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
                Date of Birth
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
                Colour
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
                Update
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
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnimals?.map((anim) => (
              <StyledTableRow key={anim.id}>
                <StyledTableCell component="th" scope="row">
                  {anim.name}
                </StyledTableCell>
                <StyledTableCell>{anim.species}</StyledTableCell>
                <StyledTableCell>{anim.breed}</StyledTableCell>
                <StyledTableCell>{anim.gender}</StyledTableCell>
                <StyledTableCell>{anim.dateOfBirth}</StyledTableCell>
                <StyledTableCell>{anim.colour}</StyledTableCell>
                <StyledTableCell>{anim.customer.name}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={() => handleUpdateAnimalBtn(anim.id)}
                    id={anim.id} // id'yi doğrudan aktarıyoruz
                  >
                    UPDATE
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    onClick={handleDeleteAnimal}
                    id={anim.id}
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
        Search Animal Name
      </Typography>
      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Search Animal Name"
        variant="standard"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <br />
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

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Search Customer Name"
        variant="standard"
        value={customerSearchValue}
        onChange={(e) => setCustomerSearchValue(e.target.value)}
      />
      <br />
      <br />
    </Box>
  );
}

export default Animal;
