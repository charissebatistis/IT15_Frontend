import React from 'react';

const Subjectdetails = ({ subject }) => {
  if (!subject) {
    return <section className="details-panel">Select a student to view details.</section>;
  }

  return (
    <section className="details-panel subject-details-creative">
      <div className="details-hero">
        <div>
          <p className="details-kicker">Student Insight</p>
          <h2>
            {subject.studentId} - {subject.fullName}
          </h2>
          <p>{subject.courseName} ({subject.courseCode})</p>
        </div>
        <div className="details-badge-stack">
          <span className="details-badge">Year {subject.yearLevel}</span>
          <span className="details-badge soft">{subject.gender}</span>
        </div>
      </div>

      <div className="detail-grid">
        <div>
          <strong>Email:</strong> {subject.email}
        </div>
        <div>
          <strong>Phone:</strong> {subject.phone}
        </div>
        <div>
          <strong>Department:</strong> {subject.department}
        </div>
        <div>
          <strong>Enrolled:</strong> {new Date(subject.enrolledAt).toLocaleDateString()}
        </div>
      </div>

      <div className="requirements-grid">
        <article className="requirements-card">
          <h4>Address</h4>
          <p>{subject.address}</p>
        </article>

        <article className="requirements-card">
          <h4>Date of Birth</h4>
          <p>{new Date(subject.dateOfBirth).toLocaleDateString()}</p>
        </article>
      </div>
    </section>
  );
};

export default Subjectdetails;
