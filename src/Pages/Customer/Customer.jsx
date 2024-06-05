import { useState, useEffect } from "react";
import axios from "axios";

function Customer() {
  const [customer, setCustomer] = useState();
  const [update, setUpdate] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [updateCustomer, setUpdateCustomer] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers")
      .then((res) => setCustomer(res.data.content))
      .then(() => console.log(customer))
      .then(() => setUpdate(true));
  }, [update]);

  const handleNewCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNewCustomer = () => {
    axios
      .post(
        import.meta.env.VITE_APP_BASE_URL + "/api/v1/customers",
        newCustomer
      )
      .then((res) => console.log(res))
      .then(setUpdate(false))
      .then(() =>
        setNewCustomer({
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleUpdateCustomer = () => {
    const { id } = updateCustomer;
    axios
      .put(
        `${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/${id}`,
        updateCustomer
      )
      .then(() => setUpdate(false))
      .then(() =>
        setUpdateCustomer({
          id: "",
          name: "",
          phone: "",
          email: "",
          address: "",
          city: "",
        })
      );
  };

  const handleUpdateCustomerInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateCustomerBtn = (e) => {
    const index = e.target.id;
    setUpdateCustomer({ ...customer[index] });
  };

  const handleDeleteCustomer = (e) => {
    const { id } = e.target;
    axios
      .delete(`${import.meta.env.VITE_APP_BASE_URL}/api/v1/customers/${id}`)
      .then(() => setUpdate(false));
  };

  return (
    <div>
      <div>
        <h3>Update Customer</h3>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={updateCustomer.name}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={updateCustomer.email}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={updateCustomer.phone}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={updateCustomer.address}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={updateCustomer.city}
          onChange={handleUpdateCustomerInputChange}
        />
        <br />
        <button onClick={handleUpdateCustomer}>Update Customer</button>
      </div>
      <div>
        <h3>Add New Customer</h3>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCustomer.name}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={newCustomer.email}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newCustomer.phone}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newCustomer.address}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newCustomer.city}
          onChange={handleNewCustomerInputChange}
        />
        <br />
        <button onClick={handleAddNewCustomer}>Add Customer</button>
      </div>
      <hr />
      <hr />
      <hr />
      <ul>
        {customer?.map((cust, index) => (
          <li key={index}>
            {cust.name} - {cust.email} - {cust.phone} - {cust.address} -{" "}
            {cust.city} -{" "}
            <span onClick={handleDeleteCustomer} id={cust.id}>
              DELETE
            </span>{" "}
            -{" "}
            <span onClick={handleUpdateCustomerBtn} id={index}>
              UPDATE
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customer;
