import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import "tailwindcss/tailwind.css";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Email/Username Validation
    if (!formData.email) {
      newErrors.email = "Email or Username is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email) && !/^[a-zA-Z0-9_]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email or username";
      valid = false;
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully", formData);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md bg-white shadow-lg p-8 rounded-lg">
        {/* Title */}
        <Typography
          variant="h4"
          className=" text-center font-bold text-purple-700 py-8"
        >
          Sign In
        </Typography>

       
        <form onSubmit={handleSubmit} className="space-y-6" style={{ minHeight: "300px" }}>
          
          <div>
            <div className="flex items-center border-b-2 pb-2 focus-within:border-purple-500 transition duration-300">
              <AccountCircleOutlinedIcon
                className={`mr-2 text-gray-400 mt-4`}
                fontSize="medium"
              />
              <TextField
                fullWidth
                name="email"
                label="Username or Email"
                variant="standard"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#9333EA" },
                  "& .MuiInput-underline:before": { borderBottom: "2px solid #e5e7eb" },
                  "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #9333EA" },
                  "& .MuiInput-underline:after": { borderBottom: "2px solid #9333EA" },
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center border-b-2 pb-2 focus-within:border-purple-500 transition duration-300">
              <HttpsOutlinedIcon
                className={`mr-2 text-gray-400 mt-4`}
                fontSize="medium"
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
                InputProps={{
                  disableUnderline: true,
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#9333EA" },
                  "& .MuiInput-underline:before": { borderBottom: "2px solid #e5e7eb" },
                  "& .MuiInput-underline:hover:before": { borderBottom: "2px solid #9333EA" },
                  "& .MuiInput-underline:after": { borderBottom: "2px solid #9333EA" },
                }}
              />
            </div>
          </div>

         
          <div className="text-right">
            <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
              Forgot Password?
            </a>
          </div>

         
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{
              backgroundColor: "#9333EA",
              color: "white",
              height: "50px",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            className="rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Sign In
          </Button>
        </form>

      
        <div className="mt-8 text-center">
          <Typography variant="body2" className="text-gray-500 mb-2">
            Or sign in with
          </Typography>
          <div className="flex justify-center gap-4 mt-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaFacebookF />
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaGoogle />
            </div>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-purple-700 transition duration-300 cursor-pointer">
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
