import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Avatar, theme } from 'antd';
import { Link } from 'react-router-dom';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PhoneOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import dummy from '../dummy.json'; // Import dummy JSON
import { DarkMode } from '@mui/icons-material';

const Navbar = ({isDarkMode,setIsDarkMode}) => {
  // Initialize state based on dummy JSON data for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(dummy.auth.isLoggedIn);
  const [user, setUser] = useState(dummy.auth.user);

  // Effect hook to check if the login state or user details change
  useEffect(() => {
    // Normally, we would fetch the user data or authentication status from an API
    // or global state (e.g., Redux or Context), but here we just use dummy data.
    setIsLoggedIn(dummy.auth.isLoggedIn);
    setUser(dummy.auth.user);
  }, [dummy.auth.isLoggedIn, dummy.auth.user]);

  
  // Handle logout logic
  const handleLogout = () => {
    alert('Logged out');
    window.location.href = '/login'; // Redirect to login page
  };

  // Handle login logic
  const handleLogin = () => {
    alert('Redirecting to login page');
    window.location.href = '/login'; // Redirect to login page
  };

  useEffect(()=> {
    const storedTheme=localStorage.getItem('theme')
    if(storedTheme==='dark') {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
    else {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  },[])

  useEffect(()=> {
    const newTheme=isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme',newTheme)
    document.documentElement.classList.toggle('dark',isDarkMode);
  },[isDarkMode])

  

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
    <div className={`fixed top-0 left-0 w-full  shadow-md z-50 ${isDarkMode?'bg-gray-800':'bg-white'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
          >
            <img className='w-32 h-10' src="src\assets\logo.png"></img>
          </Link>

          {/* Navigation Links - pushed to the right */}
          <div className="flex ml-auto space-x-6">
            <Link
              to="/"
              className={`${isDarkMode? 'text-white':'text-black'} hover:text-white text-lg transition-colors duration-200 flex items-center`}
            >
              <HomeOutlined className="mr-1" />
              Home
            </Link>
            <Link
              to="/about"
              className={`${isDarkMode? 'text-white':'text-black'} hover:text-white text-lg transition-colors duration-200 flex items-center`}
            >
              <InfoCircleOutlined className="mr-1" />
              About
            </Link>
            <Link
              to="/contact"
              className={`${isDarkMode? 'text-white':'text-black'} hover:text-white text-lg transition-colors duration-200 flex items-center`}
            >
              <PhoneOutlined className="mr-1" />
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {!isDarkMode && <img src="data:image/png;base64,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" className='w-7 h-6 ml-5'></img>
            }<button onClick={()=> {setIsDarkMode(!isDarkMode)}} className={`w-10 h-6 rounded-full p-1 ml-4 items-center ${isDarkMode? 'bg-gray-600':'bg-gray-300'}`}>
              <div className={` w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                  isDarkMode ? 'translate-x-4 bg-black' : 'bg-yellow-500'}`}></div>
            </button>
            {isDarkMode && <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCz9xRW247HvC2Mhj4El17wl-KOo2yJ6VxAz5p5AHiicSj0Eq67ES643cxFJfDaN2Vjfw&usqp=CAU" className='w-7 h-6 '></img>
            }
          </div>

          {/* User Profile Dropdown */}
          <div className="ml-6">
            <Dropdown
              overlay={isLoggedIn ? profileMenu : guestMenu}
              trigger={['click']}
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
