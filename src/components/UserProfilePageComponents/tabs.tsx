import React, { useState } from 'react'

interface TabsProps {
  children: React.ReactNode
  className?: string
}

interface TabProps {
  children: React.ReactNode;
  label: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className = '' }) => {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[]

  return (
    <div className={className}>
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-semibold ${
              activeTab === index
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
            onClick={() => setActiveTab(index)}
            aria-label={`Navigate to ${tab.props.label}`}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab]}</div>
    </div>
  )
}

export const Tab: React.FC<TabProps> = ({ children }) => children

