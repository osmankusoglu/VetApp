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
  const initState = {
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    colour: "",
    customer: {},
  };

  const [successMessage, setSuccessMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [customerSearchValue, setCustomerSearchValue] = useState("");
  const [animal, setAnimal] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [update, setUpdate] = useState(false);
  const [newAnimal, setNewAnimal] = useState({
    ...initState,
  });

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
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content))
      .then(() => setUpdate(true));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(newAnimal);
  };

  const handleCustomerSelectChange = (e) => {
    const id = e.target.value;
    const newCustomer = customer.find((cus) => cus.id === +id);
    setNewAnimal((prev) => ({
      ...prev,
      customer: newCustomer,
    }));
    console.log(newAnimal);
  };

  const handleAddNewAnimal = () => {
    axios
      .post(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals", newAnimal)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Animal added successfully!");
        setUpdate(false);
        setNewAnimal({ ...initState });
      });
  };

  const handleUpdateAnimal = () => {
    const { id } = updateAnimal;
    axios.put(
      `${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`,
      updateAnimal
    );
    setUpdateMessage("Updated successfully!");
    setUpdate(false);
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

  const handleUpdateAnimalInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateAnimalBtn = (e) => {
    const index = e.target.id;
    setUpdateAnimal({ ...animal[index] });
  };

  const handleDeleteAnimal = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/animals/${id}`)
      .then(() => setUpdate(false));
    setDeleteMessage("Deleted successfully!");
  };

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
          label="Date of Birth"
          variant="standard"
          name="dateOfBirth"
          value={newAnimal.dateOfBirth}
          onChange={handleNewAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Colour"
          variant="standard"
          name="colour"
          value={newAnimal.colour}
          onChange={handleNewAnimalInputChange}
        />

        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Customer
          </InputLabel>
          <Select
            labelId="Customer"
            id="SelectCustomer select-label"
            value={newAnimal.customer?.id || ""}
            label="Müşteri Seçiniz"
            onChange={handleCustomerSelectChange}
          >
            {customer?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>
                {cus.name}
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
          onClick={handleAddNewAnimal}
        >
          Add Animal
        </Button>
        <br />
        <br />
      </div>
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
          Update Animal
        </Typography>
        <br />
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
          label="Date of Birth"
          variant="standard"
          name="dateOfBirth"
          value={updateAnimal.dateOfBirth}
          onChange={handleUpdateAnimalInputChange}
        />

        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Colour"
          variant="standard"
          name="colour"
          value={updateAnimal.colour}
          onChange={handleUpdateAnimalInputChange}
        />

        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Customer
          </InputLabel>
          <Select
            labelId="Customer"
            id="SelectCustomer select-label"
            value={updateAnimal.customer?.id || ""}
            label="Select Customer"
            onChange={(e) => {
              const id = e.target.value;
              const selectedCustomer = customer.find((cus) => cus.id === +id);
              setUpdateAnimal((prev) => ({
                ...prev,
                customer: selectedCustomer,
              }));
            }}
          >
            {customer?.map((cus, index) => (
              <MenuItem key={index} value={cus.id}>
                {cus.name}
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
          onClick={handleUpdateAnimal}
        >
          Update Animal
        </Button>
        <br />
        <br />
        <br />
      </div>
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
        Search By Animal Name
      </Typography>
      <br />
      <TextField
        sx={{ marginLeft: 5, marginTop: 1 }}
        variant="outlined"
        placeholder="Search Animal Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <br />
      <Typography
        style={{
          color: "white",
          backgroundColor: "#1aec9c",
          padding: "10px",
          fontSize: "20px",
        }}
        sx={{ fontWeight: "700", marginTop: 2 }}
      >
        Search by Customer Name
      </Typography>
      <br />
      <TextField
        sx={{ marginLeft: 5, marginTop: 1 }}
        variant="outlined"
        placeholder="Search Customer Name"
        value={customerSearchValue}
        onChange={(e) => setCustomerSearchValue(e.target.value)}
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
                Animal Species
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
                Animal Breed
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
                Animal Gender
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
                Animal Colour
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
                Animal Date of Birth
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
                Animal Customer
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
                Animal Update
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
                Animal Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAnimals?.map((anim, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {anim.name}
                </StyledTableCell>
                <StyledTableCell align="left">{anim.species}</StyledTableCell>
                <StyledTableCell align="left">{anim.breed}</StyledTableCell>
                <StyledTableCell align="left">{anim.gender}</StyledTableCell>
                <StyledTableCell align="left">{anim.colour}</StyledTableCell>
                <StyledTableCell align="left">
                  {anim.dateOfBirth}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {anim.customer.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#f39c12", color: "white" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleUpdateAnimalBtn}
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
                    onClick={handleDeleteAnimal}
                    id={anim.id}
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
    </Box>
  );
}

export default Animal;
