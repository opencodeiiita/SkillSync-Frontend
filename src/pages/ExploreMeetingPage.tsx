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
    </Container>
  );
};

export default ExploreMeetingPage;

