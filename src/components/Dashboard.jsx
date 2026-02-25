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

    const byType = programs.reduce((acc, program) => {
      acc[program.type] = (acc[program.type] || 0) + 1;
      return acc;
    }, {});

    const byStatus = programs.reduce((acc, program) => {
      acc[program.status] = (acc[program.status] || 0) + 1;
      return acc;
    }, {});

    const recentActivities = [
      ...programs.map((program) => ({
        id: `program-${program.id}`,
        label: `${program.code} program added`,
        createdAt: program.createdAt,
        kind: 'Program',
      })),
      ...subjects.map((subject) => ({
        id: `subject-${subject.id}`,
        label: `${subject.code} subject added`,
        createdAt: subject.createdAt,
        kind: 'Subject',
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    const programHealth = totalPrograms ? Math.round((activePrograms / totalPrograms) * 100) : 0;
    const prereqDensity = totalSubjects ? Math.round((subjectsWithPrereq / totalSubjects) * 100) : 0;
    const totalAttention =
      (byStatus['under review'] || 0) + (byStatus['phased out'] || 0);

    return {
      totalPrograms,
      totalSubjects,
      activePrograms,
      inactivePrograms,
      subjectsWithPrereq,
      bySemesterTerm,
      byType,
      byStatus,
      recentActivities,
      programHealth,
      prereqDensity,
      totalAttention,
    };
  }, [programs, subjects]);

  return (
    <div className="dashboard-module creative-dashboard">
      <section className="dashboard-hero">
        <div>
          <p className="hero-eyebrow">Snapshot</p>
          <h2>Academic Pulse Overview</h2>
          <p className="hero-copy">
            Track growth, balance offerings, and monitor updates in one creative workspace.
          </p>
        </div>

        <div className="hero-badges">
          <article className="hero-badge">
            <span>Program Health</span>
            <strong>{stats.programHealth}%</strong>
          </article>
          <article className="hero-badge">
            <span>Pre-req Density</span>
            <strong>{stats.prereqDensity}%</strong>
          </article>
        </div>
      </section>

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
          <h3>Subjects With Pre-requisites</h3>
          <p>{stats.subjectsWithPrereq}</p>
        </article>
      </div>

      <section className="kpi-ribbon">
        <article className="kpi-card">
          <p>Active Ratio</p>
          <strong>{stats.programHealth}%</strong>
          <div className="kpi-track">
            <span style={{ width: `${stats.programHealth}%` }}></span>
          </div>
        </article>
        <article className="kpi-card">
          <p>Curriculum Complexity</p>
          <strong>{stats.prereqDensity}%</strong>
          <div className="kpi-track">
            <span style={{ width: `${stats.prereqDensity}%` }}></span>
          </div>
        </article>
        <article className="kpi-card alert">
          <p>Programs Needing Attention</p>
          <strong>{stats.totalAttention}</strong>
          <small>Under review + phased out</small>
        </article>
      </section>

      <div className="dashboard-story-grid">
        <section className="panel">
          <h3>Program Mix</h3>
          <div className="table-shell compact">
            <table className="data-table compact">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Count</th>
                  <th>Share</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.byType).map(([type, count]) => {
                  const width = stats.totalPrograms ? Math.round((count / stats.totalPrograms) * 100) : 0;
                  return (
                    <tr key={type}>
                      <td>{type}</td>
                      <td>{count}</td>
                      <td>{width}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel">
          <h3>Semester Pulse</h3>
          <div className="table-shell compact">
            <table className="data-table compact">
              <thead>
                <tr>
                  <th>Semester/Term</th>
                  <th>Subjects</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.bySemesterTerm).map(([term, count]) => (
                  <tr key={term}>
                    <td>{term}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel activity-panel">
          <h3>Fresh Updates</h3>
          <div className="table-shell compact">
            <table className="data-table compact">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Activity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentActivities.map((item) => (
                  <tr key={item.id}>
                    <td>{item.kind}</td>
                    <td>{item.label}</td>
                    <td>{item.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="panel activity-panel">
          <h3>Status Watch</h3>
          <div className="table-shell compact">
            <table className="data-table compact">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Programs</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.byStatus).map(([status, count]) => (
                  <tr key={status}>
                    <td>{status}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
