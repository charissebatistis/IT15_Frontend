import React from 'react';

const Programcard = ({ program, onSelect, isActive }) => {
  const yearCount = program.yearLevels.length;

  return (
    <button
      type="button"
      className={`item-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(program)}
    >
      <div className="item-card-header">
        <span className="item-code">{program.code}</span>
        <span className={`status-badge ${program.status.replace(' ', '-')}`}>{program.status}</span>
      </div>
      <h3>{program.name}</h3>
      <p>{program.type}</p>
      <div className="item-chips">
        <span className="mini-chip">{yearCount} year levels</span>
        <span className="mini-chip">{program.totalUnits} total units</span>
      </div>
      <div className="meta-row">
        <span>{program.duration}</span>
        <span>{program.totalUnits} units</span>
      </div>
    </button>
  );
};

export default Programcard;
