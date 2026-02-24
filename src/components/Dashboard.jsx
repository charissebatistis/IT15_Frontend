import React, { useMemo } from 'react';

const Dashboard = ({ programs, subjects }) => {
  const stats = useMemo(() => {
    const totalPrograms = programs.length;
    const totalSubjects = subjects.length;
    const activePrograms = programs.filter((program) => program.status === 'active').length;
    const inactivePrograms = totalPrograms - activePrograms;
    const subjectsWithPrereq = subjects.filter((subject) => subject.prerequisites.length > 0).length;

    const bySemesterTerm = subjects.reduce((acc, subject) => {
      acc[subject.semesterTerm] = (acc[subject.semesterTerm] || 0) + 1;
      return acc;
    }, {});

    const recentPrograms = [...programs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
    const recentSubjects = [...subjects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);

    return {
      totalPrograms,
      totalSubjects,
      activePrograms,
      inactivePrograms,
      subjectsWithPrereq,
      bySemesterTerm,
      recentPrograms,
      recentSubjects,
    };
  }, [programs, subjects]);

  return (
    <div className="dashboard-module">
      <div className="stats-grid">
        <article className="stat-card">
          <h3>Total Programs</h3>
          <p>{stats.totalPrograms}</p>
        </article>
        <article className="stat-card">
          <h3>Total Subjects</h3>
          <p>{stats.totalSubjects}</p>
        </article>
        <article className="stat-card">
          <h3>Active Programs</h3>
          <p>{stats.activePrograms}</p>
        </article>
        <article className="stat-card">
          <h3>Inactive Programs</h3>
          <p>{stats.inactivePrograms}</p>
        </article>
        <article className="stat-card">
          <h3>Subjects with Pre-requisites</h3>
          <p>{stats.subjectsWithPrereq}</p>
        </article>
      </div>

      <div className="dashboard-columns">
        <section className="panel">
          <h3>Subjects per Semester/Term</h3>
          <ul>
            {Object.entries(stats.bySemesterTerm).map(([term, count]) => (
              <li key={term}>
                <span>{term}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h3>Recently Added Programs</h3>
          <ul>
            {stats.recentPrograms.map((program) => (
              <li key={program.id}>
                <span>{program.code}</span>
                <strong>{program.createdAt}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h3>Recently Added Subjects</h3>
          <ul>
            {stats.recentSubjects.map((subject) => (
              <li key={subject.id}>
                <span>{subject.code}</span>
                <strong>{subject.createdAt}</strong>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
