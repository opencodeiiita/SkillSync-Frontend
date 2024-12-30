import React from 'react';

interface Resource {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface SharedResourcesTabProps {
  sharedResources: Resource[];
}

const SharedResourcesTab: React.FC<SharedResourcesTabProps> = ({ sharedResources }) => {
  return (
    <div className="shared-resources-tab">
      <h3>Shared Resources</h3>
      <ul>
        {sharedResources.map(resource => (
          <li key={resource.id}>
            <span>{resource.name}</span>
            <span>{resource.type}</span>
            <span>{resource.uploadDate}</span>
            <button>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SharedResourcesTab;