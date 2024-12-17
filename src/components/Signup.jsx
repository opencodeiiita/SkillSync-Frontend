import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", username: "", password: "" };
    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }
    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]{3,15}$/.test(formData.username)) {
      newErrors.username = "Username must be 3-15 characters and contain only letters, numbers, or underscores";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include an uppercase letter, a number, and a special character";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setFormData({ name: "", username: "", email: "", password: "" });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg shadow-purple-500/50">
        <Typography variant="h4" className="text-center font-bold text-purple-700 py-4">
          Sign Up
        </Typography>

        {successMessage && (
          <Typography variant="body2" className="text-green-600 text-center mb-4">
            {successMessage}
          </Typography>
        )}
        {errorMessage && (
          <Typography variant="body2" className="text-red-600 text-center mb-4">
            {errorMessage}
          </Typography>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            name="name"
            label="Name"
            variant="standard"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            name="email"
            label="Email Address"
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="standard"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            variant="standard"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#9333EA",
              color: "white",
              height: "40px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            className="rounded-lg hover:bg-purple-800 transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Typography variant="body2" className="text-gray-500 mb-2">
            Or sign up with
          </Typography>
          <div className="flex justify-center gap-4 mt-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaGoogle />
            </div>
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
