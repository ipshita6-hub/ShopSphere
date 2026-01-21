import React, { useState } from 'react';
import './Accordion.css';

const Accordion = ({ items = [], allowMultiple = false }) => {
  const [expandedItems, setExpandedItems] = useState([0]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setExpandedItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setExpandedItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className={`accordion-header ${expandedItems.includes(index) ? 'expanded' : ''}`}
            onClick={() => toggleItem(index)}
            aria-expanded={expandedItems.includes(index)}
            aria-controls={`accordion-panel-${index}`}
          >
            <span className="accordion-title">{item.title}</span>
            <span className="accordion-icon">›</span>
          </button>
          <div
            id={`accordion-panel-${index}`}
            className={`accordion-content ${expandedItems.includes(index) ? 'expanded' : ''}`}
            hidden={!expandedItems.includes(index)}
          >
            <div className="accordion-body">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
