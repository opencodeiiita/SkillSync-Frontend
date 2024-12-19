import { useState, useEffect } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import dummy from "../dummy.json"; // Import dummy JSON
import GlobalSearchBar from "./Search";
import NotificationBell from "./Notifications";

const Navbar = () => {
  // Initialize state based on dummy JSON data for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(dummy.auth.isLoggedIn);
  const [user, setUser] = useState(dummy.auth.user);

  // Effect hook to check if the login state or user details change
  useEffect(() => {
    // Normally, we would fetch the user data or authentication status from an API
    // or global state (e.g., Redux or Context), but here we just use dummy data.
    setIsLoggedIn(dummy.auth.isLoggedIn);
    setUser(dummy.auth.user);
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    alert("Logged out");
    window.location.href = "/login"; // Redirect to login page
  };

  // Handle login logic
  const handleLogin = () => {
    alert("Redirecting to login page");
    window.location.href = "/login"; // Redirect to login page
  };

  // Profile menu for logged-in users
  const profileMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link
          to="/profile"
          className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <UserOutlined />
          <span>Profile</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link
          to="/settings"
          className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <SettingOutlined />
          <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={handleLogout}
        className="hover:bg-red-500 hover:text-white transition-colors duration-200"
      >
        <LogoutOutlined />
        <span>Logout</span>
      </Menu.Item>
    </Menu>
  );

  // Profile menu for logged-out users
  const guestMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link
          to="/settings"
          className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200"
        >
          <SettingOutlined />
          <span>Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={handleLogin}
        className="hover:bg-green-500 hover:text-white transition-colors duration-200"
      >
        <LoginOutlined />
        <span>Login</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-800 shadow-md z-50 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-200"
          >
            SkillSync
          </Link>

          <div className="w-full items-center">
            <GlobalSearchBar />
          </div>

          {/* Navigation Links - pushed to the right */}
          <div className="flex ml-auto space-x-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white text-lg transition-colors duration-200 flex items-center"
            >
              <HomeOutlined className="mr-1" />
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white text-lg transition-colors duration-200 flex items-center"
            >
              <InfoCircleOutlined className="mr-1" />
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-300 hover:text-white text-lg transition-colors duration-200 flex items-center"
            >
              <PhoneOutlined className="mr-1" />
              Contact
            </Link>
          </div>

          <div className="pl-4"><NotificationBell /></div>

          {/* User Profile Dropdown */}
          <div className="ml-6">
            <Dropdown
              overlay={isLoggedIn ? profileMenu : guestMenu}
              trigger={["click"]}
              placement="bottomRight"
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar
                  size="large"
                  src={isLoggedIn ? user.profilePic : undefined}
                  icon={!isLoggedIn && <UserOutlined />}
                  className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                />
                {isLoggedIn && (
                  <span className="text-white text-lg">{user.name}</span>
                )}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
