import React from 'react';

const Programdetails = ({ program, subjects }) => {
  if (!program) {
    return <section className="details-panel">Select a program to view details.</section>;
  }

  const subjectTitleByCode = subjects.reduce((acc, subject) => {
    acc[subject.code] = subject.title;
    return acc;
  }, {});

  return (
    <section className="details-panel">
      <h2>{program.code} - {program.name}</h2>
      <p>{program.description}</p>

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
          <strong>Status:</strong> {program.status}
        </div>
      </div>

      <h3>Year Levels and Subject Offerings</h3>
      <div className="year-levels">
        {program.yearLevels.map((level) => (
          <div key={level.year} className="year-card">
            <h4>{level.year}</h4>
            <ul>
              {level.subjectCodes.map((subjectCode) => (
                <li key={subjectCode}>
                  {subjectCode} - {subjectTitleByCode[subjectCode] || 'Subject not in master list'}
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
