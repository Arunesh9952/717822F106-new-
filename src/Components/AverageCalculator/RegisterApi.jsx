import React, { useState } from "react";

function RegisterApi() {
  const [formData, setFormData] = useState({
    CompanyName: "",
    ownername: "",
    rollno: "",
    ownerEmail: "",
    accessCode:""
 
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Registration successful!");
        console.log(data)
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
        <input type="text" name="CompanyName" placeholder="CompanyName " onChange={handleChange} required />
        <input type="text" name="ownername" placeholder="ownername" onChange={handleChange} required />
        <input type="text" name="rollno" placeholder="rollno" onChange={handleChange} required />
        <input type="email" name="ownerEmail" placeholder="ownerEmail" onChange={handleChange} required />
        <input type="text" name="accessCode" placeholder="accessCode" onChange={handleChange} required />
        
        
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterApi;