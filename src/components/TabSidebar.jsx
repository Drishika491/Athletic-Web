// src/components/TabSidebar.js
import React, { useEffect, useState } from 'react';
import { Icon, InlineIcon } from '@iconify/react';

const TabSidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: 'Profile', icon: 'ic:account-circle' },
    { label: 'Payment', icon: 'ic:credit-card' },
    { label: 'Event', icon: 'ic:event' },
    { label: 'Events', icon: 'ic:event' },
  ];

  return (
    <>
      <div className="bg-gray-200 flex justify-center md:hidden lg:hidden w-full p-4">
        {/* <ul className="space-y-2 md:mb-4 list-none md:p-0"> */}
          {tabs.map((tab) => (
            <p
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`cursor-pointer p-2 flex items-center ${
                activeTab === tab.label ? 'text-secondary' : ''
              }`}
            >
              <Icon
                icon={tab.icon}
                className={`h-[1.5rem] w-auto mr-2 text-primary ${
                  activeTab === tab.label ? 'text-secondary' : 'text-gray-600'
                }`}
              />
              {tab.label}
            </p>
          ))}
        {/* </ul> */}
      </div>
      
      <div className="bg-gray-200 w-1/6 p-4 hidden md:flex lg:flex-col md:justify-between">
        <ul className="space-y-2 md:mb-4 list-none md:p-0">
          {tabs.map((tab) => (
              <li
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`cursor-pointer p-2 flex items-center ${
                  activeTab === tab.label ? 'text-secondary' : ''
                }`}
              >
                <Icon
                  icon={tab.icon}
                  className={`h-[1.5rem] w-auto mr-2 text-primary ${
                    activeTab === tab.label ? 'text-secondary' : 'text-gray-600'
                  }`}
                />
                {tab.label}
              </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TabSidebar;
