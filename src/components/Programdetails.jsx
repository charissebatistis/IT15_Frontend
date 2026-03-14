import React from 'react';

const Programdetails = ({ program, subjects }) => {
  if (!program) {
    return <section className="details-panel">Select a course to view details.</section>;
  }

  const relatedStudents = subjects
    .filter((subject) => subject.courseCode === program.course_code)
    .slice(0, 8);

  return (
    <section className="details-panel program-details-creative">
      <div className="details-hero">
        <div>
          <p className="details-kicker">Course Focus</p>
          <h2>
            {program.course_code} - {program.course_name}
          </h2>
          <p>{program.description || 'No course description provided.'}</p>
        </div>
        <div className="details-badge-stack">
          <span className="details-badge">{program.department}</span>
          <span className="details-badge soft">{program.credits} credits</span>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <strong>Course code:</strong> {program.course_code}
        </div>
        <div>
          <strong>Instructor:</strong> {program.instructor_name}
        </div>
        <div>
          <strong>Credits:</strong> {program.credits}
        </div>
        <div>
          <strong>Enrollment:</strong> {program.current_enrollment} / {program.max_capacity}
        </div>
      </div>

      <h3>Enrolled Students Snapshot</h3>
      <div className="year-levels journey-grid">
        {relatedStudents.length ? relatedStudents.map((student) => (
          <div key={student.id} className="year-card journey-card">
            <h4>{student.fullName}</h4>
            <p>{student.studentId}</p>
            <ul>
              <li>
                <span>Email</span>
                <small>{student.email}</small>
              </li>
              <li>
                <span>Year Level</span>
                <small>{student.yearLevel}</small>
              </li>
              <li>
                <span>Gender</span>
                <small>{student.gender}</small>
              </li>
            </ul>
          </div>
        )) : (
          <div className="year-card journey-card">
            <h4>No students loaded yet</h4>
            <p>Open the Students tab once to populate the student snapshot for this course.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Programdetails;
