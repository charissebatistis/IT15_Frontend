import React, { useMemo, useState } from 'react';
import Subjectdetails from './Subjectdetails';
import Filterbar from './Filterbar';

const Subjectlist = ({ subjects, programs }) => {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [unitsFilter, setUnitsFilter] = useState('all');
  const [prereqFilter, setPrereqFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('code-asc');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || null);

  const visibleSubjects = useMemo(() => {
    const filtered = subjects.filter((subject) => {
      const query = search.toLowerCase();
      const matchesSearch =
        subject.code.toLowerCase().includes(query) || subject.title.toLowerCase().includes(query);
      const matchesSemester = semesterFilter === 'all' || subject.semesterTerm === semesterFilter;
      const matchesUnits = unitsFilter === 'all' || String(subject.units) === unitsFilter;
      const hasPrereq = subject.prerequisites.length > 0;
      const matchesPrereq =
        prereqFilter === 'all' ||
        (prereqFilter === 'with' && hasPrereq) ||
        (prereqFilter === 'without' && !hasPrereq);
      const matchesProgram = programFilter === 'all' || subject.programCode === programFilter;

      return matchesSearch && matchesSemester && matchesUnits && matchesPrereq && matchesProgram;
    });

    const sorted = [...filtered];
    if (sortFilter === 'units-desc') {
      sorted.sort((a, b) => b.units - a.units);
    } else if (sortFilter === 'title-asc') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortFilter === 'date-desc') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      sorted.sort((a, b) => a.code.localeCompare(b.code));
    }
    return sorted;
  }, [subjects, search, semesterFilter, unitsFilter, prereqFilter, programFilter, sortFilter]);

  const selectedSubject =
    visibleSubjects.find((subject) => subject.id === selectedSubjectId) || visibleSubjects[0] || null;

  const semesterOptions = Array.from(new Set(subjects.map((subject) => subject.semesterTerm)));
  const unitOptions = Array.from(new Set(subjects.map((subject) => String(subject.units)))).sort();

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Subject Listing</h2>
          <p>Track subject offerings, semester availability, and requirements.</p>
        </div>

        <div className="section-insights">
          <span className="insight-pill">Showing {visibleSubjects.length} of {subjects.length} subjects</span>
          <span className="insight-pill">Program: {programFilter === 'all' ? 'Any' : programFilter}</span>
          <span className="insight-pill">Pre-req: {prereqFilter === 'all' ? 'Any' : prereqFilter}</span>
          <span className="insight-pill">Sort: {sortFilter}</span>
        </div>

        <Filterbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search by subject code or title"
          filters={[
            {
              key: 'semester',
              value: semesterFilter,
              onChange: setSemesterFilter,
              options: [
                { value: 'all', label: 'All semesters/terms' },
                ...semesterOptions.map((value) => ({ value, label: value })),
              ],
            },
            {
              key: 'units',
              value: unitsFilter,
              onChange: setUnitsFilter,
              options: [
                { value: 'all', label: 'All units' },
                ...unitOptions.map((value) => ({ value, label: `${value} units` })),
              ],
            },
            {
              key: 'prereq',
              value: prereqFilter,
              onChange: setPrereqFilter,
              options: [
                { value: 'all', label: 'All subjects' },
                { value: 'with', label: 'With pre-requisites' },
                { value: 'without', label: 'Without pre-requisites' },
              ],
            },
            {
              key: 'program',
              value: programFilter,
              onChange: setProgramFilter,
              options: [
                { value: 'all', label: 'All programs' },
                ...programs.map((program) => ({ value: program.code, label: program.code })),
              ],
            },
            {
              key: 'sort',
              value: sortFilter,
              onChange: setSortFilter,
              options: [
                { value: 'code-asc', label: 'Sort: Code (A-Z)' },
                { value: 'title-asc', label: 'Sort: Title (A-Z)' },
                { value: 'units-desc', label: 'Sort: Units (High-Low)' },
                { value: 'date-desc', label: 'Sort: Newest' },
              ],
            },
          ]}
        />

        {visibleSubjects.length ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Program</th>
                  <th>Units</th>
                  <th>Semester/Term</th>
                  <th>Offering</th>
                  <th>Pre-req</th>
                </tr>
              </thead>
              <tbody>
                {visibleSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className={selectedSubject?.id === subject.id ? 'selected' : ''}
                    onClick={() => setSelectedSubjectId(subject.id)}
                  >
                    <td>
                      <strong>{subject.code}</strong>
                    </td>
                    <td>{subject.title}</td>
                    <td>{subject.programCode}</td>
                    <td>{subject.units}</td>
                    <td>{subject.semesterTerm}</td>
                    <td>
                      <span className={`offer-badge ${subject.offeredAs}`}>{subject.offeredAs}</span>
                    </td>
                    <td>{subject.prerequisites.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No subjects match your filters. Try different filter values.</div>
        )}
      </div>

      <Subjectdetails subject={selectedSubject} />
    </div>
  );
};

export default Subjectlist;
