import React, { useEffect, useMemo, useState } from 'react';
import Programdetails from './Programdetails';
import Filterbar from './Filterbar';

const Programlist = ({ programs, subjects }) => {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [creditsFilter, setCreditsFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('name-asc');
  const [selectedProgramId, setSelectedProgramId] = useState(programs[0]?.id || null);

  useEffect(() => {
    if (!selectedProgramId && programs.length) {
      setSelectedProgramId(programs[0].id);
    }
  }, [programs, selectedProgramId]);

  const visiblePrograms = useMemo(() => {
    const filtered = programs.filter((program) => {
      const query = search.toLowerCase();
      const matchesSearch =
        program.course_code.toLowerCase().includes(query) ||
        program.course_name.toLowerCase().includes(query) ||
        program.department.toLowerCase().includes(query);
      const matchesDepartment = departmentFilter === 'all' || program.department === departmentFilter;
      const matchesCredits = creditsFilter === 'all' || String(program.credits) === creditsFilter;
      return matchesSearch && matchesDepartment && matchesCredits;
    });

    const sorted = [...filtered];
    if (sortFilter === 'enrollment-desc') {
      sorted.sort((a, b) => b.current_enrollment - a.current_enrollment);
    } else if (sortFilter === 'credits-desc') {
      sorted.sort((a, b) => b.credits - a.credits);
    } else if (sortFilter === 'code-asc') {
      sorted.sort((a, b) => a.course_code.localeCompare(b.course_code));
    } else if (sortFilter === 'date-desc') {
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else {
      sorted.sort((a, b) => a.course_name.localeCompare(b.course_name));
    }
    return sorted;
  }, [programs, search, departmentFilter, creditsFilter, sortFilter]);

  const selectedProgram =
    visiblePrograms.find((program) => program.id === selectedProgramId) || visiblePrograms[0] || null;

  const departmentOptions = Array.from(new Set(programs.map((program) => program.department))).sort();
  const creditsOptions = Array.from(new Set(programs.map((program) => String(program.credits)))).sort();

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Course Listing</h2>
          <p>Browse, filter, and inspect all available courses from the Laravel backend.</p>
        </div>

        <div className="section-insights">
          <span className="insight-pill">Showing {visiblePrograms.length} of {programs.length} courses</span>
          <span className="insight-pill">Department: {departmentFilter === 'all' ? 'Any' : departmentFilter}</span>
          <span className="insight-pill">Credits: {creditsFilter === 'all' ? 'Any' : creditsFilter}</span>
          <span className="insight-pill">Sort: {sortFilter}</span>
        </div>

        <Filterbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search course code, name, or department"
          filters={[
            {
              key: 'department',
              value: departmentFilter,
              onChange: setDepartmentFilter,
              options: [
                { value: 'all', label: 'All departments' },
                ...departmentOptions.map((value) => ({ value, label: value })),
              ],
            },
            {
              key: 'credits',
              value: creditsFilter,
              onChange: setCreditsFilter,
              options: [
                { value: 'all', label: 'All credits' },
                ...creditsOptions.map((value) => ({ value, label: `${value} credits` })),
              ],
            },
            {
              key: 'sort',
              value: sortFilter,
              onChange: setSortFilter,
              options: [
                { value: 'name-asc', label: 'Sort: Name (A-Z)' },
                { value: 'code-asc', label: 'Sort: Code (A-Z)' },
                { value: 'credits-desc', label: 'Sort: Credits (High-Low)' },
                { value: 'enrollment-desc', label: 'Sort: Enrollment (High-Low)' },
                { value: 'date-desc', label: 'Sort: Newest' },
              ],
            },
          ]}
        />

        {visiblePrograms.length ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course</th>
                  <th>Department</th>
                  <th>Credits</th>
                  <th>Instructor</th>
                  <th>Enrollment</th>
                </tr>
              </thead>
              <tbody>
                {visiblePrograms.map((program) => (
                  <tr
                    key={program.id}
                    className={selectedProgram?.id === program.id ? 'selected' : ''}
                    onClick={() => setSelectedProgramId(program.id)}
                  >
                    <td>
                      <strong>{program.course_code}</strong>
                    </td>
                    <td>{program.course_name}</td>
                    <td>{program.department}</td>
                    <td>{program.credits}</td>
                    <td>{program.instructor_name}</td>
                    <td>{program.current_enrollment} / {program.max_capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No courses match your filters. Try broadening your search.</div>
        )}
      </div>

      <Programdetails program={selectedProgram} subjects={subjects} />
    </div>
  );
};

export default Programlist;
