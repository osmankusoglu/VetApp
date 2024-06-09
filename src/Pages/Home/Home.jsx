import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

import PetsIcon from "@mui/icons-material/Pets";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

// Assets klasöründen resmi ekleyin
import welcomeCatImage from "../../assets/welcome-cat.jpg";

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/customer");
  };

  const handlePetsIconClick = () => {
    // PetsIcona tıklandığında customer sayfasına yönlendirme
    navigate("/customer");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${welcomeCatImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          boxShadow: 9,
          borderRadius: "44px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "rgba(178, 190, 195,0.4)",
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            component="p"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2em",
              color: "#2c3e50",
            }}
          >
            WELCOME
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.5em",
              color: "#2c3e50",
            }}
          >
            Vet Management System
          </Typography>

          <Typography variant="h6" component="p" />
          <Button onClick={handlePetsIconClick} sx={{ p: 0 }}>
            <PetsIcon
              sx={{
                alignItems: "center",
                fontSize: "7rem",
                color: "#f39c12",
                "&:hover": {
                  color: "#1abc9c",
                },
              }}
            />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Home;
