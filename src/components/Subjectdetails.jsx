import React from 'react';

const Subjectdetails = ({ subject }) => {
  if (!subject) {
    return <section className="details-panel">Select a subject to view details.</section>;
  }

  return (
    <section className="details-panel subject-details-creative">
      <div className="details-hero">
        <div>
          <p className="details-kicker">Subject Insight</p>
          <h2>
            {subject.code} - {subject.title}
          </h2>
          <p>{subject.description || 'No description provided.'}</p>
        </div>
        <div className="details-badge-stack">
          <span className="details-badge">{subject.semesterTerm}</span>
          <span className="details-badge soft">{subject.offeredAs}</span>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <strong>Units:</strong> {subject.units}
        </div>
        <div>
          <strong>Program:</strong> {subject.programCode}
        </div>
        <div>
          <strong>Offering:</strong> {subject.offeredAs}
        </div>
        <div>
          <strong>Semester/Term:</strong> {subject.semesterTerm}
        </div>
      </div>

      <div className="requirements-grid">
        <article className="requirements-card">
          <h4>Pre-requisites</h4>
          {subject.prerequisites.length ? (
            <div className="requirements-chips">
              {subject.prerequisites.map((item) => (
                <span className="mini-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p>None</p>
          )}
        </article>

        <article className="requirements-card">
          <h4>Co-requisites</h4>
          {subject.corequisites.length ? (
            <div className="requirements-chips">
              {subject.corequisites.map((item) => (
                <span className="mini-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p>None</p>
          )}
        </article>
      </div>
    </section>
  );
};

export default Subjectdetails;
