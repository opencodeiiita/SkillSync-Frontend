import React, { useState, useEffect } from "react";
import Workspace from "../components/Workspace";
import { useNavigate } from "react-router-dom";
import placeholderImage from '../assets/placeholder.jpg';
import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import NewMeetingCreationForm from '../components/NewMeetingCreationForm';

// Mock data for workspaces
// Removed unused mockWorkspaces declaration

const WorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(""); 
  const [sortOption, setSortOption] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false); 
  const itemsPerPage = 3;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user] = useState({ role: 'mentor' }); // Mock user data
  
    const handleMeetingCreated = () => {
      // TODO: Implement logic to refresh the meetings list
      console.log('Meeting created, refreshing list...');
    };

  const navigate = useNavigate();


  const mockWorkspaces = [
    {
      id: 1,
      workspaceName: "Tech Innovators",
      mentorName: "Alice Johnson",
      description: "A workspace for tech enthusiasts.",
      currentMembers: 25,
      workspaceType: "Public",
      tags: ["Tech", "Innovation"],
      workspacePhoto: null,
      creationDate: "2023-12-01",
      isMeetingLive: false,
      photo: placeholderImage
    },
    {
      id: 2,
      workspaceName: "Artistic Minds",
      mentorName: "Bob Smith",
      description: "Collaborate with artists worldwide.",
      currentMembers: 18,
      workspaceType: "Private",
      tags: ["Arts", "Creativity"],
      workspacePhoto: null,
      creationDate: "2023-11-15",
      isMeetingLive: true,
      photo: placeholderImage
    },
    {
      id: 3,
      workspaceName: "Graphic Gig",
      mentorName: "Carl Smith",
      description: "Collaborate with designers worldwide.",
      currentMembers: 10,
      workspaceType: "Public",
      tags: ["Arts", "Creativity"],
      workspacePhoto: null,
      creationDate: "2023-11-15",
      isMeetingLive: false,
      photo: placeholderImage
    },
    {
    id: 4,
    workspaceName: "SkillSync",
    mentorName: "Dwayne Johnson",
    description: "Collaborate with the most skillfull people in the world.",
    currentMembers: 13,
    workspaceType: "Public",
    tags: ["Arts", "Creativity"],
    workspacePhoto: null,
    creationDate: "2023-11-16",
    isMeetingLive: true,
    photo: placeholderImage
  }
  ];

  useEffect(() => {
    setWorkspaces(mockWorkspaces);
  }, []);


  const filteredWorkspaces = workspaces
    .filter(
      (workspace) =>
        workspace.workspaceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workspace.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .filter(
      (workspace) =>
        filterType === "All" || workspace.workspaceType === filterType || filterType === ""
    )
    .sort((a, b) => {
      if (sortOption === "Alphabetical") {
        return a.workspaceName.localeCompare(b.workspaceName);
      } else if (sortOption === "Most Recently Created") {
        return new Date(b.creationDate) - new Date(a.creationDate);
      } else if (sortOption === "Most Members") {
        return b.currentMembers - a.currentMembers;
      }
      return 0;
    });


  const paginatedWorkspaces = filteredWorkspaces.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 bg-purple-50">
      {/* Search and Filters */}
      <div className="mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search workspaces..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 border rounded-lg w-full border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        
        <div className="md:hidden mt-4">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg w-full text-left hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
          >
            {menuOpen ? "Close Filters" : "Open Filters"}
          </button>
          {menuOpen && (
            <div className="bg-white border border-purple-300 rounded-lg p-4 mt-2 shadow-sm">
              {/* Filter Options */}
              <label className="block mb-2 font-semibold text-purple-700">Filter by Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="p-2 border rounded-lg w-full border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Filter
                </option>
                <option value="All">All</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              
              <label className="block mt-4 mb-2 font-semibold text-purple-700">Sort By</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="p-2 border rounded-lg w-full border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Sort By
                </option>
                <option value="Alphabetical">Alphabetical Order</option>
                <option value="Most Recently Created">Most Recently Created</option>
                <option value="Most Members">Most Members</option>
              </select>
            </div>
          )}
        </div>

        
        <div className="hidden md:flex justify-between items-center mt-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Filter
            </option>
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-lg border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="" disabled>
              Sort By
            </option>
            <option value="Alphabetical">Alphabetical Order</option>
            <option value="Most Recently Created">Most Recently Created</option>
            <option value="Most Members">Most Members</option>
          </select>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedWorkspaces.map((workspace) => (
          <Workspace
            key={workspace.id}
            workspaceName={workspace.workspaceName}
            mentorName={workspace.mentorName}
            description={workspace.description}
            currentMembers={workspace.currentMembers}
            workspaceType={workspace.workspaceType}
            workspacePhoto={workspace.workspacePhoto}
            isMeetingLive={workspace.isMeetingLive}
            workspacePhoto={workspace.photo}
            onJoin={() => console.log(`Joined ${workspace.workspaceName}`)}
            onViewDetails={() => navigate(`/workspaces/${workspace.id}`)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        {Array.from(
          { length: Math.ceil(filteredWorkspaces.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === i + 1
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-lg hover:bg-purple-500 hover:text-white`}
            >
              {i + 1}
            </button>
          )
        )}
      {user?.role === 'mentor' && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            onClick={() => setIsModalOpen(true)}
            sx={{
              mb: 3,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              color: 'white',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
          >
            Create Meeting
          </Button>
        </motion.div>
      )}
      {/* Your existing meetings list component would go here */}
      <NewMeetingCreationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onMeetingCreated={handleMeetingCreated}
        workspaces={mockWorkspaces}
      />
      </div>
    </div>
  );
};

export default WorkspacesPage;
