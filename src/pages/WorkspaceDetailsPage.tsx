import React from 'react';
import WorkspaceInfo from '../components/WorkspaceInfo/WorkspaceInfo';
import ChatComponent from '../components/ChatComponent/ChatComponent';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const WorkspaceDetailsPage: React.FC = () => {
  const workspaceDetails = {
    workspaceName: 'Example Workspace',
    mentorName: 'John Doe',
    description: 'This is an example workspace.',
    workspaceType: 'Public',
    ongoingMeeting: {
      title: 'Current Meeting',
      startTime: '10:00 AM',
    },
    members: [
      { id: '1', name: 'John Doe', role: 'mentor', profileImage: 'path/to/image' },
      { id: '2', name: 'Jane Doe', role: 'participant', profileImage: 'path/to/image' },
    ],
    sharedResources: [
      { id: '1', name: 'Resource 1', type: 'PDF', uploadDate: '2024-01-01' },
    ],
    scheduledMeetings: [
      { id: '1', title: 'Future Meeting', scheduledDate: '2024-01-02' },
    ],
    onJoinMeeting: () => {},
    onRemoveParticipant: () => {},
    onLeaveWorkspace: () => {},
  };

  const [messages, setMessages] = React.useState<Message[]>([]);

  const chatDetails = {
    chatTitle: 'Workspace Chat',
    chatAvatar: 'path/to/avatar',
    messages: messages,
    setMessages: setMessages,
  };

  return (
    <div className="workspace-details-page">
      <div className="left-section">
        <WorkspaceInfo {...workspaceDetails} />
      </div>
      <div className="right-section">
        <ChatComponent {...chatDetails} />
      </div>
    </div>
  );
};

export default WorkspaceDetailsPage;