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

  const [vaccination, setVaccination] = useState([]);
  const [animal, setAnimal] = useState([]);
  const [newVaccination, setNewVaccination] = useState({ ...initState });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations")
      .then((res) => setVaccination(res.data.content));
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/animals")
      .then((res) => setAnimal(res.data.content));
  }, []);

  const handleNewVaccinationInputChange = (e) => {
    const { name, value } = e.target;
    setNewVaccination((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAnimalSelectChange = (e) => {
    const id = e.target.value;
    const selectedAnimal = animal.find((ani) => ani.id === +id);
    setNewVaccination((prev) => ({
      ...prev,
      animalWithoutCustomer: selectedAnimal,
    }));
  };

  const handleAddNewVaccination = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/vaccinations",
        newVaccination
      )
      .then(() => {
        setNewVaccination({ ...initState });
        window.location.reload();
      });
  };

  const handleDeleteVaccination = (id) => {
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/vaccinations/${id}`)
      .then(() => {
        setVaccination(vaccination.filter((vac) => vac.id !== id));
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
            {animal.map((ani) => (
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
      </div>
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
            {vaccination.map((vac) => (
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
    </Box>
  );
}

export default Vaccination;
