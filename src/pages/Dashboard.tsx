"use client";
import React, { useState, ChangeEvent, MouseEvent } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
    datasets: [
      {
        data: [20, 10],
        backgroundColor: ["#81C784", "#FF7043"], // Soft green and coral colors for the pie chart
      },
    ],
  };

  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Events Participated",
        data: [3, 5, 2, 4],
        backgroundColor: "#64B5F6", // Soft blue color for the bar chart
      },
    ],
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
  const handleSaveChanges = () => {
    setProfileData({
      username: editedUsername,
      email: editedEmail,
    });
    alert("Profile updated successfully!");
  };

  const handleLogout = (e: MouseEvent<HTMLDivElement>) => {
    console.log("User logged out");
    // Perform logout logic
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#FAFAFA" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          "& .MuiDrawer-paper": {
            width: 200,
            boxSizing: "border-box",
            backgroundColor: "#333333", // Dark background
            color: "#fff",
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            padding: 2,
            textAlign: "center",
            borderBottom: "1px solid #444444",
          }}
        >
          Dashboard
        </Typography>
        <List>
          <ListItem button onClick={() => setActivePage("dashboard")}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#FFEB3B" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => setActivePage("dashboard")}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#FFEB3B" }} />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={() => setActivePage("editProfile")}>
            <ListItemIcon>
              <EditIcon sx={{ color: "#FFEB3B" }} />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: "#FFEB3B" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: "#FAFAFA" }}>
        <AppBar position="static" sx={{ backgroundColor: "#FFFFFF", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "#333" }}>
              {activePage === "dashboard"
                ? `Hi, ${profileData.username || "User"}`
                : "Edit Profile"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Dashboard Page */}
        {activePage === "dashboard" && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
              {`${profileData.username || "User"}'s Activity Overview`}
            </Typography>
            <Divider sx={{ mb: 3, backgroundColor: "#DDDDDD" }} />
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {/* Pie Chart */}
              <Paper
                sx={{
                  flex: 1,
                  padding: 2,
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "auto",
                  backgroundColor: "#FFFFFF", // Light background for the paper
                  borderRadius: 2,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
                  Active vs Inactive Days
                </Typography>
                <Pie data={pieData} />
              </Paper>

              {/* Bar Graph */}
              <Paper
                sx={{
                  flex: 1,
                  padding: 2,
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "auto",
                  backgroundColor: "#FFFFFF", // Light background for the paper
                  borderRadius: 2,
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ color: "#333" }}>
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
            <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
              Edit Profile
            </Typography>
            <Divider sx={{ mb: 3, backgroundColor: "#DDDDDD" }} />
            <form>
              <TextField
                label="Username"
                name="username"
                value={editedUsername}
                onChange={handleProfileChange}
                fullWidth
                margin="normal"
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#333",
                  input: { color: "#333" },
                  border: "1px solid #DDDDDD",
                }}
              />
              <TextField
                label="Email"
                name="email"
                value={editedEmail}
                onChange={handleProfileChange}
                fullWidth
                margin="normal"
                type="email"
                sx={{
                  backgroundColor: "#FFFFFF",
                  color: "#333",
                  input: { color: "#333" },
                  border: "1px solid #DDDDDD",
                }}
              />
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#FFEB3B", color: "#121212" }}
                onClick={handleSaveChanges}
              >
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
