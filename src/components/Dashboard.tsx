"use client"
import React, { useState, ChangeEvent, MouseEvent } from "react";
import { Box, AppBar, Toolbar, Typography, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Button, TextField, Paper, Divider } from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

// Define types for profile data
interface ProfileData {
  username: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("dashboard"); // Tracks which view is active
  const [profileData, setProfileData] = useState<ProfileData>({ username: "", email: "" });

  const [editedUsername, setEditedUsername] = useState<string>(profileData.username); // Editable username
  const [editedEmail, setEditedEmail] = useState<string>(profileData.email); // Editable email

  // Dummy Data for Charts
  const pieData = {
    labels: ["Active Days", "Inactive Days"],
    datasets: [{ data: [20, 10], backgroundColor: ["#4caf50", "#f44336"] }],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [{ label: "Events Participated", data: [3, 5, 2, 4], backgroundColor: "#3f51b5" }],
  };

  // Handle changes in profile inputs
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") {
      setEditedUsername(value);
    } else if (name === "email") {
      setEditedEmail(value);
    }
  };

  // Save profile changes
  const handleSaveChanges = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProfileData({
      username: editedUsername,
      email: editedEmail,
    });
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Perform logout logic
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 200, "& .MuiDrawer-paper": { width: 200, boxSizing: "border-box", backgroundColor: "#956CD4", color: "#fff" } }}>
        <Typography variant="h6" sx={{ padding: 2, textAlign: "center", borderBottom: "1px solid white" }}>
          Dashboard
        </Typography>
        <List>
          <ListItemButton onClick={() => setActivePage("dashboard")}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => setActivePage("editProfile")}>
            <ListItemIcon>
              <EditIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <AppBar position="static" sx={{ backgroundColor: "#956CD4" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {activePage === "dashboard" ? `Hi, ${profileData.username || 'User'}` : "Edit Profile"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              {activePage === "dashboard" ? `${profileData.username || 'User'} Activity Overview` : "Edit Profile"}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {/* Pie Chart */}
              <Paper sx={{ flex: 1, padding: 2, textAlign: "center", width: '100%', maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Active vs Inactive Days
                </Typography>
                <Pie data={pieData} />
              </Paper>

              {/* Bar Graph */}
              <Paper sx={{ flex: 1, padding: 2, textAlign: "center", width: '100%', maxWidth: '600px', margin: 'auto' }}>
                <Typography variant="h6" gutterBottom>
                  Events Participation
                </Typography>
                <Bar data={barData} />
              </Paper>
            </Box>
          </Box>
        )}

        {/* Edit Profile Page */}
        {activePage === "editProfile" && (
          <Box sx={{ mt: 3, maxWidth: 500 }}>
            <Typography variant="h5" gutterBottom>
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <form>
              <TextField
                label="Username"
                name="username"
                value={editedUsername}
                onChange={handleProfileChange}
                fullWidth
                margin="normal"
                sx={{ backgroundColor: "#fff" }}
              />
              <TextField
                label="Email"
                name="email"
                value={editedEmail}
                onChange={handleProfileChange}
                fullWidth
                margin="normal"
                type="email"
                sx={{ backgroundColor: "#fff" }}
              />
              <Button variant="contained" sx={{ mt: 2, backgroundColor: "#956CD4" }} onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
