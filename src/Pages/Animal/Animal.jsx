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
    setUpdate(false);
    setUpdateMessage("Updated successfully!");
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

  const handleUpdateAnimalBtn = (id) => {
    const selectedAnimal = animal.find((a) => a.id === id);
    setUpdateAnimal({ ...selectedAnimal });
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
          ADD
        </Button>
      </div>

      {successMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{successMessage}</Alert>
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
        UPDATE
      </Button>

      {updateMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{updateMessage}</Alert>
        </Stack>
      )}

      <br />
      <br />
      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Search Animal Name"
        variant="standard"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <TextField
        sx={{ marginLeft: 4, marginTop: 1 }}
        label="Search Customer Name"
        variant="standard"
        value={customerSearchValue}
        onChange={(e) => setCustomerSearchValue(e.target.value)}
      />

      <br />
      <br />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Animal Name</StyledTableCell>
              <StyledTableCell>Species</StyledTableCell>
              <StyledTableCell>Breed</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              <StyledTableCell>Date of Birth</StyledTableCell>
              <StyledTableCell>Colour</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
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
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">{deleteMessage}</Alert>
        </Stack>
      )}
    </Box>
  );
}

export default Animal;
