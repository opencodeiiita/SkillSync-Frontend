import React from 'react';

interface Member {
  id: string;
  name: string;
  role: string;
  profileImage: string;
}

interface MembersTabProps {
  members: Member[];
  onRemoveParticipant: (id: string) => void;
  onLeaveWorkspace: () => void;
}

const MembersTab: React.FC<MembersTabProps> = ({ members, onRemoveParticipant, onLeaveWorkspace }) => {
  return (
    <div className="members-tab">
      <h3>Members</h3>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            <img src={member.profileImage} alt={member.name} />
            <span>{member.name}</span>
            <span>{member.role}</span>
            {member.role !== 'mentor' && (
              <button onClick={() => onRemoveParticipant(member.id)}>Remove</button>
            )}
          </li>
        ))}
      </ul>
      <button onClick={onLeaveWorkspace}>Leave Workspace</button>
    </div>
  );
};

export default MembersTab;