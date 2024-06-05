import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="customer" element={<Customer />} />
        <Route path="doctor" element={<Doctor />} />
      </Routes>
    </>
  );
}

export default App;
