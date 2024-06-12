import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { Link } from "react-router-dom";

const pagesRouter = [
  // { route: "customer", title: "Customer" },
  // { route: "doctor", title: "Doctor" },
  // { route: "animal", title: "Animal" },
  { route: "appointment", title: "Appointment" },
  { route: "vaccination", title: "Vaccination" },
  { route: "report", title: "Report" },
];
const pagesRouters = [
  { route: "customer", title: "Customer" },
  { route: "doctor", title: "Doctor" },
  { route: "animal", title: "Animal" },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#16a085" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <PetsIcon
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  fontSize: "2.0rem",
                }}
              />
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  fontSize: "1.5rem",
                }}
              >
                VET
              </Typography>
            </Box>
          </Link>

          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            VET
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pagesRouter.map((page, index) => (
              <Button
                key={index}
                component={Link}
                to={page.route}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  textDecoration: "none",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".2rem",
                  fontSize: "1.1rem",
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Tooltip title="User Menu">
              <LocalHospitalIcon onClick={handleOpenUserMenu} />
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pagesRouters.map((page, index) => (
                <Button
                  key={index}
                  component={Link}
                  to={page.route}
                  onClick={handleCloseUserMenu}
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
