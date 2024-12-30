import React from 'react';

interface Meeting {
  id: string;
  title: string;
  scheduledDate: string;
}

interface ScheduledMeetingsTabProps {
  scheduledMeetings: Meeting[];
}

const ScheduledMeetingsTab: React.FC<ScheduledMeetingsTabProps> = ({ scheduledMeetings }) => {
  return (
    <div className="scheduled-meetings-tab">
      <h3>Scheduled Meetings</h3>
      <ul>
        {scheduledMeetings.map(meeting => (
          <li key={meeting.id}>
            <span>{meeting.title}</span>
            <span>{meeting.scheduledDate}</span>
            <button>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduledMeetingsTab;