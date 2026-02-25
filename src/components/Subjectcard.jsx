import React from 'react';

const offeredLabel = {
  semester: 'Per Semester',
  term: 'Per Term',
  both: 'Both',
};

const Subjectcard = ({ subject, onSelect, isActive }) => {
  const prereqCount = subject.prerequisites.length;
  const coreqCount = subject.corequisites.length;

  return (
    <button
      type="button"
      className={`item-card ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(subject)}
    >
      <div className="item-card-header">
        <span className="item-code">{subject.code}</span>
        <span className={`offer-badge ${subject.offeredAs}`}>{offeredLabel[subject.offeredAs]}</span>
      </div>
      <h3>{subject.title}</h3>
      <p>{subject.programCode}</p>
      <div className="item-chips">
        <span className="mini-chip">{prereqCount} pre-req</span>
        <span className="mini-chip">{coreqCount} co-req</span>
      </div>
      <div className="meta-row">
        <span>{subject.units} units</span>
        <span>{subject.semesterTerm}</span>
      </div>
    </button>
  );
};

export default Subjectcard;
