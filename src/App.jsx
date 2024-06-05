import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Customer from "./Pages/Customer/Customer";
import Doctor from "./Pages/Doctor/Doctor";
import Animal from "./Pages/Animal/Animal";
import Navbar from "./Components/Navbar/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="customer" element={<Customer />} />
        <Route path="doctor" element={<Doctor />} />
        <Route path="animal" element={<Animal />} />
      </Routes>
    </>
  );
}

export default App;
