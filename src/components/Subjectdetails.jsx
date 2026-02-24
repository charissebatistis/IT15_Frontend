import React from 'react';

const Subjectdetails = ({ subject }) => {
  if (!subject) {
    return <section className="details-panel">Select a subject to view details.</section>;
  }

  return (
    <section className="details-panel">
      <h2>{subject.code} - {subject.title}</h2>
      <p>{subject.description || 'No description provided.'}</p>

      <div className="detail-grid">
        <div>
          <strong>Units:</strong> {subject.units}
        </div>
        <div>
          <strong>Semester/Term:</strong> {subject.semesterTerm}
        </div>
        <div>
          <strong>Program:</strong> {subject.programCode}
        </div>
        <div>
          <strong>Offering:</strong> {subject.offeredAs}
        </div>
        <div>
          <strong>Pre-requisites:</strong>{' '}
          {subject.prerequisites.length ? subject.prerequisites.join(', ') : 'none'}
        </div>
        <div>
          <strong>Co-requisites:</strong>{' '}
          {subject.corequisites.length ? subject.corequisites.join(', ') : 'none'}
        </div>
      </div>
    </section>
  );
};

export default Subjectdetails;
