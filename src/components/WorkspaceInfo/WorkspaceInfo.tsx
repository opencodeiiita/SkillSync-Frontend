import React from 'react';
import OngoingMeeting from './OngoingMeeting';
import MembersTab from './MembersTab';
import SharedResourcesTab from './SharedResourcesTab';
import ScheduledMeetingsTab from './ScheduledMeetingsTab';

interface WorkspaceInfoProps {
  workspaceName: string;
  mentorName: string;
  description: string;
  workspaceType: string;
  ongoingMeeting: any;
  members: any[];
  sharedResources: any[];
  scheduledMeetings: any[];
  onJoinMeeting: () => void;
  onRemoveParticipant: (id: string) => void;
  onLeaveWorkspace: () => void;
}

const WorkspaceInfo: React.FC<WorkspaceInfoProps> = ({
  workspaceName,
  mentorName,
  description,
  workspaceType,
  ongoingMeeting,
  members,
  sharedResources,
  scheduledMeetings,
  onJoinMeeting,
  onRemoveParticipant,
  onLeaveWorkspace,
}) => {
  return (
    <div className="workspace-info">
      <div className="workspace-overview">
        <h2>{workspaceName}</h2>
        <p>Mentor: {mentorName}</p>
        <p>{description}</p>
        <span>{workspaceType === 'Public' ? 'Public' : 'Private'}</span>
      </div>
      <OngoingMeeting ongoingMeeting={ongoingMeeting} onJoinMeeting={onJoinMeeting} />
      <div className="tabs">
        <MembersTab members={members} onRemoveParticipant={onRemoveParticipant} onLeaveWorkspace={onLeaveWorkspace} />
        <SharedResourcesTab sharedResources={sharedResources} />
        <ScheduledMeetingsTab scheduledMeetings={scheduledMeetings} />
      </div>
    </div>
  );
};

export default WorkspaceInfo;