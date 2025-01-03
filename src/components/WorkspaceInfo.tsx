import React, { useState } from 'react'
import * as Tabs from "@radix-ui/react-tabs"
import { Users, FileText, Calendar, ChevronRight, X } from 'lucide-react'
import MembersTab from './MembersTab'
import SharedResourcesTab from './SharedResourcesTab'
import ScheduledMeetingsTab from './ScheduledMeetingsTab'
import placeholderImage from '../assets/placeholder.jpg'

interface WorkspaceInfoProps {
  workspaceName: string
  mentorName: string
  description: string
  workspaceType: 'Public' | 'Private'
  ongoingMeeting: {
    title: string
    startTime: string
  } | null
  members: Array<{
    id: string
    name: string
    role: 'mentor' | 'participant'
    profileImage?: string
  }>
  sharedResources: Array<{
    id: string
    name: string
    type: string
    uploadDate: string
  }>
  scheduledMeetings: Array<{
    id: string
    title: string
    scheduledDateTime: string
  }>
  onJoinMeeting: () => void
  onRemoveParticipant: (id: string) => void
  onLeaveWorkspace: () => void
  currentUserId: string
}

export default function WorkspaceInfo({
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
  currentUserId
}: WorkspaceInfoProps) {
  const [activeTab, setActiveTab] = useState('members')
  const [isExpanded, setIsExpanded] = useState(true)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      className={`transition-all duration-300 ease-in-out bg-white border-l border-gray-200 shadow-lg overflow-hidden`}
      style={{ height: '600px' }} // Setting the height to 600px
    >
      <div className="h-full flex flex-col">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4 w-full justify-center">
            <img
              src={placeholderImage}
              alt={`${workspaceName} logo`}
              className="w-12 h-12 rounded-full object-cover shadow-sm"
            />
            <div className="text-center">
              <h1 className="text-xl font-bold">{workspaceName}</h1>
              <p className="text-sm text-gray-600">
                Mentor: <span className="font-semibold">{mentorName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={toggleExpand}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label={isExpanded ? "Collapse workspace info" : "Expand workspace info"}
          >
            <ChevronRight
              className={`w-6 h-6 transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="flex-grow overflow-y-auto">
            <div className="p-4">
              <div className="mb-6">
                <p className="text-sm mb-2 text-gray-700">{description}</p>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    workspaceType === 'Public'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {workspaceType}
                </span>
              </div>

              {ongoingMeeting ? (
                <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200 shadow-sm">
                  <h2 className="text-lg font-semibold mb-2 text-blue-800">Ongoing Meeting</h2>
                  <p className="text-sm mb-1 text-blue-700">{ongoingMeeting.title}</p>
                  <p className="text-xs mb-3 text-blue-600">Started at: {ongoingMeeting.startTime}</p>
                  <button
                    onClick={onJoinMeeting}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm"
                  >
                    Join Meeting
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 shadow-sm">
                  <p className="text-sm text-gray-600 text-center">No Ongoing Meetings</p>
                </div>
              )}

              <Tabs.Root defaultValue="members" onValueChange={setActiveTab}>
                <Tabs.List className="flex border-b mb-4" aria-label="Workspace information tabs">
                  <TabTrigger value="members" icon={<Users className="w-4 h-4" />} label="Members" activeTab={activeTab} />
                  <TabTrigger value="resources" icon={<FileText className="w-4 h-4" />} label="Resources" activeTab={activeTab} />
                  <TabTrigger value="meetings" icon={<Calendar className="w-4 h-4" />} label="Meetings" activeTab={activeTab} />
                </Tabs.List>
                <Tabs.Content value="members">
                  <MembersTab
                    members={members}
                    onRemoveParticipant={onRemoveParticipant}
                    onLeaveWorkspace={onLeaveWorkspace}
                    currentUserId={currentUserId}
                  />
                </Tabs.Content>
                <Tabs.Content value="resources">
                  <SharedResourcesTab resources={sharedResources} />
                </Tabs.Content>
                <Tabs.Content value="meetings">
                  <ScheduledMeetingsTab meetings={scheduledMeetings} />
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface TabTriggerProps {
  value: string
  icon: React.ReactNode
  label: string
  activeTab: string
}

function TabTrigger({ value, icon, label, activeTab }: TabTriggerProps) {
  return (
    <Tabs.Trigger 
      value={value} 
      className={`flex-1 px-4 py-2 text-sm font-medium ${
        activeTab === value 
          ? 'border-b-2 border-blue-500 text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      } transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
    >
      <div className="flex items-center justify-center">
        {icon}
        <span className="ml-2">{label}</span>
      </div>
    </Tabs.Trigger>
  )
}
