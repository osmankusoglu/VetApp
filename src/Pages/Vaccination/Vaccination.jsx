import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

function Vaccination() {
  const initState = {
    name: "",
    code: "",
    protectionStartDate: "",
    protectionFinishDate: "",
    animalWithoutCustomer: {
      id: 0,
      name: "",
      species: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      colour: "",
    },
  };

  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [filterMessage, setFilterMessage] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [newVaccination, setNewVaccination] = useState({ ...initState });
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations")
      .then((res) => setVaccinations(res.data.content));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals")
      .then((res) => setAnimals(res.data.content));
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);

      axios
        .get(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/api/v1/vaccinations/searchByVaccinationRange?startDate=${startDate}&endDate=${endDate}`
        )
        .then((res) => {
          setVaccinations(res.data.content);
        });
    }
  }, [startDate, endDate]);

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
    if (filterMessage) {
      const timer = setTimeout(() => {
        setFilterMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [filterMessage]);

  const handleNewVaccinationInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animals.find((ani) => ani.id === +id);
    setNewVaccination((prev) => ({
      ...prev,
      animalWithoutCustomer: selectedAnimal,
    }));
  };

  const handleAddNewVaccination = () => {
    axios
      .post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations`,
        newVaccination
      )
      .then((response) => {
        setSuccessMessage("New vaccination added successfully!");
        setVaccinations((prevVaccinations) => [
          ...prevVaccinations,
          response.data,
        ]); // Yeni aşıyı listeye ekleyin
        setNewVaccination({ ...initState });
      });
  };

  const handleDeleteVaccination = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${id}`)
      .then(() => {
        setVaccinations(vaccinations.filter((vac) => vac.id !== id));
        setDeleteMessage("Vaccination deleted successfully!");
      });
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchByAnimalName = (vaccinations, searchTerm) => {
    if (!Array.isArray(vaccinations) || vaccinations.length === 0) {
      return [];
    }
    if (!searchTerm) {
      return vaccinations;
    }
    return vaccinations.filter((vac) =>
      vac.animal.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setFilterMessage("Vaccination list reset!");
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations")
      .then((res) => setVaccinations(res.data.content));
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
          Add Vaccination
        </Typography>
        <br />
        <br />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Vaccination Name"
          variant="standard"
          name="name"
          value={newVaccination.name}
          onChange={handleNewVaccinationInputChange}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Vaccination Code"
          variant="standard"
          name="code"
          value={newVaccination.code}
          onChange={handleNewVaccinationInputChange}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Protection Start Date"
          type="date"
          variant="standard"
          name="protectionStartDate"
          value={newVaccination.protectionStartDate}
          onChange={handleNewVaccinationInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          sx={{ marginLeft: 4, marginTop: 1 }}
          label="Protection Finish Date"
          type="date"
          variant="standard"
          name="protectionFinishDate"
          value={newVaccination.protectionFinishDate}
          onChange={handleNewVaccinationInputChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl sx={{ minWidth: 223, marginLeft: 4, height: 20 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Animal
          </InputLabel>
          <Select
            labelId="Animal"
            id="SelectAnimal select-label"
            label="Select Animal"
            value={newVaccination.animalWithoutCustomer?.id || ""}
            onChange={handleAnimalSelectChange}
          >
            {animals.map((ani) => (
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
          onClick={handleAddNewVaccination}
        >
          Add Vaccination
        </Button>
        {successMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="success">{successMessage}</Alert>
          </Stack>
        )}
      </div>
      <br />

      <br />
      <br />
      <TableContainer component={Paper}>
        <Table>
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
                Vaccination Name
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Vaccination Code
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Protection Start Date
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Protection Finish Date
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Animal
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1abc9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
              >
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchByAnimalName(vaccinations, searchTerm).map((vac) => (
              <StyledTableRow key={vac.id}>
                <StyledTableCell>{vac.name}</StyledTableCell>
                <StyledTableCell>{vac.code}</StyledTableCell>
                <StyledTableCell>{vac.protectionStartDate}</StyledTableCell>
                <StyledTableCell>{vac.protectionFinishDate}</StyledTableCell>
                <StyledTableCell>{vac.animal.name}</StyledTableCell>
                <StyledTableCell align="left">
                  <Button
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteVaccination(vac.id)}
                  >
                    DELETE
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {deleteMessage && (
        <Stack sx={{ width: "80%", marginLeft: 10, marginTop: 5 }} spacing={2}>
          <Alert severity="error">{deleteMessage}</Alert>
        </Stack>
      )}
      <br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1aec9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                sx={{ fontWeight: "700" }}
              >
                Vaccination Search by Animal Name
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1aec9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                sx={{ fontWeight: "700" }}
              >
                Vaccination Search by Start Date
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1aec9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                sx={{ fontWeight: "700" }}
              >
                Vaccination Search by Finish Date
              </StyledTableCell>
              <StyledTableCell
                style={{
                  color: "white",
                  backgroundColor: "#1aec9c",
                  padding: "10px",
                  fontSize: "20px",
                }}
                sx={{ fontWeight: "700" }}
              >
                Clear Filter
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableCell>
              <TextField
                sx={{ marginLeft: 4, marginTop: 1 }}
                label="Search by Animal Name"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </StyledTableCell>
            <StyledTableCell>
              <TextField
                sx={{ marginLeft: 4, marginTop: 1 }}
                label="Start Date"
                type="date"
                variant="outlined"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <TextField
                sx={{ marginLeft: 4, marginTop: 1 }}
                label="End Date"
                type="date"
                variant="outlined"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledTableCell>
            <StyledTableCell>
              <Button
                sx={{ height: 54, width: 223, marginTop: 1 }}
                variant="contained"
                color="success"
                onClick={clearFilters}
              >
                Clear Filter
              </Button>
            </StyledTableCell>
          </TableBody>
        </Table>
        <br />
        {filterMessage && (
          <Stack
            sx={{ width: "80%", marginLeft: 10, marginTop: 5 }}
            spacing={2}
          >
            <Alert severity="success">{filterMessage}</Alert>
          </Stack>
        )}
        <br />
      </TableContainer>
    </Box>
  );
}

export default Vaccination;
