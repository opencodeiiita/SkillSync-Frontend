import React, { useState } from 'react'
import WorkspaceInfo from '../components/WorkspaceInfo'
import ChatComponent from '../components/ChatComponent/ChatComponent'

interface Message {
  sender: string
  content: string
  timestamp: string
  avatar: string
}

export default function WorkspaceDetailsPage() {
  const [messages, setMessages] = useState<Message[]>([])

  // Mock data for demonstration purposes
  const workspaceData = {
    workspaceName: "Web Development 101",
    mentorName: "Jane Doe",
    description: "A workspace for learning web development basics",
    workspaceType: "Public" as const,
    ongoingMeeting: null,
    members: [
      { id: '1', name: 'Bruce Lee', role: 'participant' as const },
      { id: '2', name: 'John Smith', role: 'participant' as const },
      { id: '3', name: 'Alice Johnson', role: 'participant' as const },
      { id: '4', name: 'King John', role: 'participant' as const },
    ],
    sharedResources: [
      { id: '1', name: 'HTML Basics.pdf', type: 'file', uploadDate: '2023-07-01' },
      { id: '2', name: 'CSS Tutorial', type: 'link', uploadDate: '2023-07-02' },
      { id: '3', name: 'JavaScript Cheatsheet.pdf', type: 'file', uploadDate: '2023-07-03' },
    ],
    scheduledMeetings: [
      { id: '1', title: 'JavaScript Fundamentals', scheduledDateTime: '2023-07-10 14:00' },
      { id: '2', title: 'React Basics', scheduledDateTime: '2023-07-15 15:00' },
      { id: '3', title: 'Web Performance Optimization', scheduledDateTime: '2023-07-20 16:00' },
    ],
  }

  const handleJoinMeeting = () => {
    console.log('Joining meeting...')
  }

  const handleRemoveParticipant = (id: string) => {
    console.log(`Removing participant with id: ${id}`)
  }

  const handleLeaveWorkspace = () => {
    console.log('Leaving workspace...')
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Workspace Info */}
      <div className="w-full lg:w-1/2 p-2">
        <WorkspaceInfo
          {...workspaceData}
          onJoinMeeting={handleJoinMeeting}
          onRemoveParticipant={handleRemoveParticipant}
          onLeaveWorkspace={handleLeaveWorkspace}
          currentUserId="2" // Assuming the current user is John Smith for this example
        />
      </div>

      {/* Chat Component */}
      <div className="w-full lg:w-1/2 p-2">
        <ChatComponent
          chatTitle={workspaceData.workspaceName}
          chatAvatar="https://example.com/workspace-avatar.jpg"
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  )
}
