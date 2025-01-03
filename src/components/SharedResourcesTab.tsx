import React from 'react'
import { Download, ExternalLink } from 'lucide-react'

interface SharedResourcesTabProps {
  resources: Array<{
    id: string
    name: string
    type: string
    uploadDate: string
  }>
}

export default function SharedResourcesTab({ resources }: SharedResourcesTabProps) {
  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <div key={resource.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg">
          <div>
            <p className="font-medium">{resource.name}</p>
            <p className="text-sm text-gray-600">
              {resource.type} • Uploaded on {resource.uploadDate}
            </p>
          </div>
          <button 
            className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-2 rounded flex items-center"
            aria-label={resource.type === 'file' ? `Download ${resource.name}` : `Open ${resource.name}`}
          >
            {resource.type === 'file' ? (
              <Download className="w-5 h-5 mr-2" />
            ) : (
              <ExternalLink className="w-5 h-5 mr-2" />
            )}
            {resource.type === 'file' ? 'Download' : 'Open'}
          </button>
        </div>
      ))}
    </div>
  )
}

