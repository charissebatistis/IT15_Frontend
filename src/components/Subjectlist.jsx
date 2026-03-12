import React, { useEffect, useMemo, useState } from 'react';
import Subjectdetails from './Subjectdetails';
import Filterbar from './Filterbar';

const Subjectlist = ({ subjects, programs }) => {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [programFilter, setProgramFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('name-asc');
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || null);

  useEffect(() => {
    if (!selectedSubjectId && subjects.length) {
      setSelectedSubjectId(subjects[0].id);
    }
  }, [selectedSubjectId, subjects]);

  const visibleSubjects = useMemo(() => {
    const filtered = subjects.filter((subject) => {
      const query = search.toLowerCase();
      const matchesSearch =
        subject.fullName.toLowerCase().includes(query) ||
        subject.studentId.toLowerCase().includes(query) ||
        subject.courseCode.toLowerCase().includes(query) ||
        subject.courseName.toLowerCase().includes(query);
      const matchesYear = yearFilter === 'all' || String(subject.yearLevel) === yearFilter;
      const matchesGender = genderFilter === 'all' || subject.gender === genderFilter;
      const matchesProgram = programFilter === 'all' || subject.courseCode === programFilter;

      return matchesSearch && matchesYear && matchesGender && matchesProgram;
    });

    const sorted = [...filtered];
    if (sortFilter === 'year-desc') {
      sorted.sort((a, b) => b.yearLevel - a.yearLevel);
    } else if (sortFilter === 'course-asc') {
      sorted.sort((a, b) => a.courseCode.localeCompare(b.courseCode));
    } else if (sortFilter === 'date-desc') {
      sorted.sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt));
    } else {
      sorted.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    return sorted;
  }, [subjects, search, yearFilter, genderFilter, programFilter, sortFilter]);

  const selectedSubject =
    visibleSubjects.find((subject) => subject.id === selectedSubjectId) || visibleSubjects[0] || null;

  const yearOptions = Array.from(new Set(subjects.map((subject) => String(subject.yearLevel)))).sort();
  const genderOptions = Array.from(new Set(subjects.map((subject) => subject.gender))).sort();
  const courseOptions = Array.from(new Set(subjects.map((subject) => subject.courseCode))).sort();

  return (
    <div className="module-layout">
      <div>
        <div className="module-head">
          <h2>Student Listing</h2>
          <p>Browse enrolled students with demographic information and course assignments.</p>
        </div>

        <div className="section-insights">
          <span className="insight-pill">Showing {visibleSubjects.length} of {subjects.length} students</span>
          <span className="insight-pill">Course: {programFilter === 'all' ? 'Any' : programFilter}</span>
          <span className="insight-pill">Year: {yearFilter === 'all' ? 'Any' : yearFilter}</span>
          <span className="insight-pill">Sort: {sortFilter}</span>
        </div>

        <Filterbar
          search={search}
          onSearch={setSearch}
          searchPlaceholder="Search by student name, ID, or course"
          filters={[
            {
              key: 'year',
              value: yearFilter,
              onChange: setYearFilter,
              options: [
                { value: 'all', label: 'All year levels' },
                ...yearOptions.map((value) => ({ value, label: `Year ${value}` })),
              ],
            },
            {
              key: 'gender',
              value: genderFilter,
              onChange: setGenderFilter,
              options: [
                { value: 'all', label: 'All genders' },
                ...genderOptions.map((value) => ({ value, label: value })),
              ],
            },
            {
              key: 'program',
              value: programFilter,
              onChange: setProgramFilter,
              options: [
                { value: 'all', label: 'All courses' },
                ...courseOptions.map((value) => ({ value, label: value })),
              ],
            },
            {
              key: 'sort',
              value: sortFilter,
              onChange: setSortFilter,
              options: [
                { value: 'name-asc', label: 'Sort: Name (A-Z)' },
                { value: 'course-asc', label: 'Sort: Course (A-Z)' },
                { value: 'year-desc', label: 'Sort: Year Level (High-Low)' },
                { value: 'date-desc', label: 'Sort: Latest Enrollment' },
              ],
            },
          ]}
        />

        {visibleSubjects.length ? (
          <div className="table-shell">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Year Level</th>
                  <th>Gender</th>
                  <th>Email</th>
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
                      <strong>{subject.studentId}</strong>
                    </td>
                    <td>{subject.fullName}</td>
                    <td>{subject.courseCode}</td>
                    <td>{subject.yearLevel}</td>
                    <td>{subject.gender}</td>
                    <td>{subject.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">No students match your filters. Try different filter values.</div>
        )}
      </div>

      <Subjectdetails subject={selectedSubject} />
    </div>
  );
};

export default Subjectlist;
