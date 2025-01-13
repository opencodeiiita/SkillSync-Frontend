import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import NewMeetingCreationForm from '../components/NewMeetingCreationForm';

// Mock data for workspaces
const mockWorkspaces = [
  { id: '1', name: 'Workspace 1' },
  { id: '2', name: 'Workspace 2' },
];

const ExploreMeetingPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useState({ role: 'mentor' }); // Mock user data

  const handleMeetingCreated = () => {
    // TODO: Implement logic to refresh the meetings list
    console.log('Meeting created, refreshing list...');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Explore Meetings
      </Typography>

    </Container>
  );
};

export default ExploreMeetingPage;

