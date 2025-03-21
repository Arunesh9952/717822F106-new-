import React, { useState } from "react";

function Api() {
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    rollNo: "",
    ownerEmail: "",
    accessCode: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://20.244.56.144/products/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register Company</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
        <input type="text" name="ownerName" placeholder="Owner Name" onChange={handleChange} required />
        <input type="text" name="rollNo" placeholder="Roll No" onChange={handleChange} required />
        <input type="email" name="ownerEmail" placeholder="Owner Email" onChange={handleChange} required />
        <input type="text" name="accessCode" placeholder="Access Code" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Api;