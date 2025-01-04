import React from 'react'
import { Calendar } from 'lucide-react'

interface ScheduledMeetingsTabProps {
  meetings: Array<{
    id: string
    title: string
    scheduledDateTime: string
  }>
}

export default function ScheduledMeetingsTab({ meetings }: ScheduledMeetingsTabProps) {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
          <div>
            <p className="font-medium">{meeting.title}</p>
            <p className="text-sm text-gray-600">
              Scheduled for: {meeting.scheduledDateTime}
            </p>
          </div>
          <button 
            className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded flex items-center"
            aria-label={`View details for ${meeting.title}`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            View Details
          </button>
        </div>
      ))}
    </div>
  )
}

