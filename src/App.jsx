import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Animal from "./Pages/Animal/Animal";
import Navbar from "./Components/Navbar/Navbar";
import Appointment from "./Pages/Appointment/Appointment";
import AvailableDate from "./Pages/AvailableDate/AvailableDate";
import Vaccination from "./Pages/Vaccination/Vaccination";
import Report from "./Pages/Report/Report";

function App() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="customer" element={<Customer />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="animal" element={<Animal />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="availableDate" element={<AvailableDate />} />
        <Route path="vaccination" element={<Vaccination />} />
        <Route path="report" element={<Report />} />
      </Routes>
    </div>
  );
}

export default App;
