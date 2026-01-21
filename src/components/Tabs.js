import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabs = [], defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveTab(index - 1);
    } else if (e.key === 'ArrowRight' && index < tabs.length - 1) {
      setActiveTab(index + 1);
    } else if (e.key === 'Home') {
      setActiveTab(0);
    } else if (e.key === 'End') {
      setActiveTab(tabs.length - 1);
    }
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-panel-${index}`}
            id={`tab-${index}`}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="tabs-content">
        {tabs.map((tab, index) => (
          <div
            key={index}
            id={`tab-panel-${index}`}
            className={`tab-panel ${activeTab === index ? 'active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
