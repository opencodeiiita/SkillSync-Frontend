import React from 'react';

interface OngoingMeetingProps {
  ongoingMeeting: {
    title: string;
    startTime: string;
  };
  onJoinMeeting: () => void;
}

const OngoingMeeting: React.FC<OngoingMeetingProps> = ({ ongoingMeeting, onJoinMeeting }) => {
  return (
    <div className="ongoing-meeting">
      {ongoingMeeting ? (
        <>
          <h3>{ongoingMeeting.title}</h3>
          <p>Started at: {ongoingMeeting.startTime}</p>
          <button onClick={onJoinMeeting}>Join Meeting</button>
        </>
      ) : (
        <p>No Ongoing Meetings</p>
      )}
    </div>
  );
};

export default OngoingMeeting;