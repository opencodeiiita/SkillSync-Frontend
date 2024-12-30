import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import placeholderImage from '../assets/placeholder.jpg';

interface WorkspaceProps {
  workspaceName: string;
  mentorName: string;
  description: string;
  currentMembers: number;
  isMeetingLive: boolean;
  workspaceType: string;
  workspacePhoto: string;
  onJoin: () => void;
  onViewDetails: () => void;
}

const Workspace: React.FC<Partial<WorkspaceProps>> = (props) => {
  const {
    workspaceName = "SkillSync Workspace",
    mentorName = "John Smith",
    description = "A workspace for skill-building enthusiasts.",
    currentMembers = 12,
    isMeetingLive = true,
    workspaceType = "Public",
    workspacePhoto = placeholderImage,
    onJoin = () => console.log("Joined the workspace"),
    onViewDetails = () => console.log("Redirect to workspace details"),
  } = props;

  const [joinStatus, setJoinStatus] = useState('Join');
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    if (workspaceType === 'Public') {
      setJoinStatus('Joined');
    } else {
      setJoinStatus('Request Sent');
    }
    setIsJoined(true);
    onJoin();
  };

  const handleViewDetails = () => {
    onViewDetails();
    navigate('/workspace-details');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full lg:max-w-xl sm:max-w-lg bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        {/* Card Header */}
        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-t-lg">
          <h2 className="text-2xl font-bold">{workspaceName}</h2>
        </div>

        {/* Card Image */}
        <div className="flex justify-center mt-4">
          <img
            src={workspacePhoto || placeholderImage}
            alt="Workspace"
            className="lg:w-60 lg:h-60 sm:w-40 sm:h-40 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Card Body */}
        <div className="p-6 text-center">
          <div className="flex justify-center space-x-3 mb-4">
            {isMeetingLive && (
              <span className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-full shadow-md">
                🔴 Meeting Live
              </span>
            )}
            <span
              className={`px-4 py-2 text-xs font-semibold rounded-full shadow-md ${
                workspaceType === 'Public'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {workspaceType === 'Public' ? '🌐 Public' : '🔒 Private'}
            </span>
          </div>
          <p className="text-gray-700 text-lg mb-2">{description}</p>
          <p className="text-gray-500">
            <strong>Mentor:</strong> {mentorName}
          </p>
          <p className="text-gray-500 mr-9">
            <strong>Members:</strong> {currentMembers}
          </p>
        </div>

        {/* Card Footer */}
        <div className="p-6 border-t bg-purple-50 rounded-b-lg">
          <div className="flex justify-between items-center">
            <button
              onClick={handleJoin}
              className={`py-2 px-6 rounded-lg shadow transition-colors ${
                isJoined
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {joinStatus}
            </button>
            <button
              onClick={handleViewDetails}
              className="bg-gray-600 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-700 transition-colors"
            >
              View Details
            </button>
          </div>
          {isJoined && (
            <p className="mt-4 text-green-600 font-semibold text-center">
              {workspaceType === 'Public'
                ? 'You have successfully joined the workspace!'
                : 'Your request to join the workspace has been sent!'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
