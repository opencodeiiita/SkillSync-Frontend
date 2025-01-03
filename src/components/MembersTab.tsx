import React from 'react'
import * as Avatar from "@radix-ui/react-avatar"
import { UserMinus, LogOut } from 'lucide-react'

interface MembersTabProps {
  members: Array<{
    id: string
    name: string
    role: 'mentor' | 'participant'
    profileImage?: string
  }>
  onRemoveParticipant: (id: string) => void
  onLeaveWorkspace: () => void
  currentUserId: string
}

export default function MembersTab({ members, onRemoveParticipant, onLeaveWorkspace, currentUserId }: MembersTabProps) {
  const currentUserRole = members.find(member => member.id === currentUserId)?.role

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <div key={member.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar.Root className="h-10 w-10 rounded-full overflow-hidden">
              <Avatar.Image src={member.profileImage} alt={member.name} />
              <Avatar.Fallback className="bg-gray-200 text-gray-600 flex items-center justify-center text-lg font-semibold">
                {member.name.charAt(0)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-gray-600 capitalize">{member.role}</p>
            </div>
          </div>
          {currentUserRole === 'mentor' && member.role !== 'mentor' && (
            <button 
              onClick={() => onRemoveParticipant(member.id)} 
              className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 p-2 rounded"
              aria-label={`Remove ${member.name} from workspace`}
            >
              <UserMinus className="w-5 h-5" />
            </button>
           )}  
        </div>
      ))}
      {currentUserRole !== 'mentor' && (
        <button 
          onClick={onLeaveWorkspace} 
          className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Leave Workspace
        </button>
      )}
    </div>
  )
}

