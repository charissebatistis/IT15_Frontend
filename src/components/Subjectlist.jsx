import React, { useMemo, useState } from 'react';
import Subjectcard from './Subjectcard';
import Subjectdetails from './Subjectdetails';
import Filterbar from './Filterbar';

const Subjectlist = ({ subjects, programs }) => {
  const [search, setSearch] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('all');
  const [unitsFilter, setUnitsFilter] = useState('all');
  const [prereqFilter, setPrereqFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || null);

  const visibleSubjects = useMemo(() => {
    return subjects.filter((subject) => {
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
  }, [subjects, search, semesterFilter, unitsFilter, prereqFilter, programFilter]);

  const semesterOptions = Array.from(new Set(subjects.map((subject) => subject.semesterTerm)));
  const unitOptions = Array.from(new Set(subjects.map((subject) => String(subject.units)))).sort();

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Subject Listing</h2>
          <p>Track subject offerings, semester availability, and requirements.</p>
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
          ]}
        />

        <div className="cards-grid">
          {visibleSubjects.map((subject) => (
            <Subjectcard
              key={subject.id}
              subject={subject}
              isActive={selectedSubject?.id === subject.id}
              onSelect={setSelectedSubject}
            />
          ))}
        </div>
      </div>

      <Subjectdetails subject={selectedSubject} />
    </div>
  );
};

export default Subjectlist;
