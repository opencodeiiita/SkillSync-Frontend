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
    workspaceName = 'SkillSync Workspace',
    mentorName = 'Alex Smith',
    description = 'Join our workspace to collaborate and grow.',
    currentMembers = 5,
    isMeetingLive = false,
    workspaceType = 'Public',
    workspacePhoto = placeholderImage,
    onJoin = () => console.log('Join clicked'),
    onViewDetails = () => console.log('View details clicked'),
  } = props;

  const [joinStatus, setJoinStatus] = useState('Join Now');
  const [isJoined, setIsJoined] = useState(false);
  const navigate = useNavigate();

  const handleJoin = () => {
    setJoinStatus(workspaceType === 'Private' ? 'Request Sent' : 'Joined');
    setIsJoined(true);
    onJoin();
  };

  const handleViewDetails = () => {
    onViewDetails();
    navigate('/workspace-details');
  };

  return (
    <div className="max-w-sm w-full bg-white border border-gray-500 rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300">
      {/* Header Section */}
      <div className="relative">
        <img
          src={workspacePhoto || placeholderImage}
          alt={workspaceName}
          className="w-full h-48 object-cover rounded-t-xl px-2 py-2"
        />
        {isMeetingLive && (
          <span className="absolute top-4 right-4 bg-red-400 text-white text-sm font-bold px-3 py-1 rounded-full">
              🔴 Meeting Live
          </span>
        )}
        <span
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${
            workspaceType === 'Public' ? 'bg-green-500' : 'bg-red-400'
          }`}
        >
         {workspaceType === 'Public' ? '🌐 Public' : '🔒 Private'}
        </span>
      </div>

      {/* Body Section */}
      <div className="p-4 text-left">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{workspaceName}</h3>
        <p className="text-base text-gray-500 mb-4">{description}</p>
        <p className="text-base text-gray-600">
          <span className="font-bold">Mentor  : </span>  {mentorName}
        </p>
        <div className="mt-0 mb-0">
          <p className="text-base text-gray-600">
            <span className="font-bold">Members :</span> {currentMembers}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-4 py-3 flex justify-between items-center bg-gray-100 rounded-b-xl">
        <button
          onClick={handleViewDetails}
          className="text-base font-semibold text-gray-700 hover:text-blue-500 border border-gray-800 rounded-lg px-4 py-2"
        >
          View Details
        </button>
        <button
          onClick={handleJoin}
          className={`px-4 py-2 rounded-lg text-base text-white ${
            isJoined ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-400 hover:bg-blue-600'
          }`}
        >
          {joinStatus}
        </button>
      </div>
    </div>
  );
};

export default Workspace;
