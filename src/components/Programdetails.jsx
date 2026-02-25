import React from 'react';

const Programdetails = ({ program, subjects }) => {
  if (!program) {
    return <section className="details-panel">Select a program to view details.</section>;
  }

  const subjectTitleByCode = subjects.reduce((acc, subject) => {
    acc[subject.code] = subject.title;
    return acc;
  }, {});

  const totalMappedSubjects = program.yearLevels.reduce((acc, level) => acc + level.subjectCodes.length, 0);

  return (
    <section className="details-panel program-details-creative">
      <div className="details-hero">
        <div>
          <p className="details-kicker">Program Focus</p>
          <h2>
            {program.code} - {program.name}
          </h2>
          <p>{program.description}</p>
        </div>
        <div className="details-badge-stack">
          <span className="details-badge">{program.status}</span>
          <span className="details-badge soft">{program.type}</span>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <strong>Program code:</strong> {program.code}
        </div>
        <div>
          <strong>Duration:</strong> {program.duration}
        </div>
        <div>
          <strong>Total units:</strong> {program.totalUnits}
        </div>
        <div>
          <strong>Mapped subjects:</strong> {totalMappedSubjects}
        </div>
      </div>

      <h3>Learning Journey by Year</h3>
      <div className="year-levels journey-grid">
        {program.yearLevels.map((level) => (
          <div key={level.year} className="year-card journey-card">
            <h4>{level.year}</h4>
            <p>{level.subjectCodes.length} curated subjects</p>
            <ul>
              {level.subjectCodes.map((subjectCode) => (
                <li key={subjectCode}>
                  <span>{subjectCode}</span>
                  <small>{subjectTitleByCode[subjectCode] || 'Subject not in master list'}</small>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Programdetails;
