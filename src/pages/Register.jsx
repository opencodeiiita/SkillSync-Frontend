import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from "../assets/signup.png";
import '../index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, include one uppercase letter, one number, and one special character.';
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      console.log('Form data submitted:', formData);
      navigate('/dashboard'); // Redirect to dashboard
    }
  };

  return (
    <div className="register-container">
      {/* Left Image Section */}
      <div className="left-section">
        <img src={signupImage} alt="Join SkillSync Community" />
        <h2>Join SkillSync Community</h2>
      </div>

      {/* Right Form Section */}
      <div className="right-section">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
